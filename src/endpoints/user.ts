import { Router } from "express";
import bcrypt from "bcrypt";
import { pool } from "../database/db";
import { CreateUserDTO } from "../interfaces/user";

const router = Router();

// CREATE user
router.post("/", async (req, res) => {
  const { email, password }: CreateUserDTO = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, created_at",
    [email, hashedPassword]
  );

  res.status(201).json(result.rows[0]);
});

// READ all users
router.get("/", async (_req, res) => {
  const result = await pool.query(
    "SELECT id, email, created_at FROM users"
  );
  res.json(result.rows);
});

// READ user by id
router.get("/:id", async (req, res) => {
  const result = await pool.query(
    "SELECT id, email, created_at FROM users WHERE id = $1",
    [req.params.id]
  );

  if (!result.rows.length) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(result.rows[0]);
});

// UPDATE user
router.put("/:id", async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = password
    ? await bcrypt.hash(password, 10)
    : undefined;

  const result = await pool.query(
    `
    UPDATE users
    SET email = COALESCE($1, email),
        password = COALESCE($2, password)
    WHERE id = $3
    RETURNING id, email, created_at
    `,
    [email, hashedPassword, req.params.id]
  );

  res.json(result.rows[0]);
});

// DELETE user
router.delete("/:id", async (req, res) => {
  await pool.query("DELETE FROM users WHERE id = $1", [
    req.params.id,
  ]);
  res.json({ message: "User deleted" });
});

export default router;
