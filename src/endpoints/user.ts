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

export default router;
