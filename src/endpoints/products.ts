import { Router } from "express";

const router = Router();
const FAKE_STORE_URL = "https://fakestoreapi.com";

router.get("/", async (_req, res) => {
  const response = await fetch(`${FAKE_STORE_URL}/products`);
  const products = await response.json();
  res.json(products);
});

/* GET producto por id */
router.get("/:id", async (req, res) => {
  const response = await fetch(
    `${FAKE_STORE_URL}/products/${req.params.id}`
  );

  if (!response.ok) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  const product = await response.json();
  res.json(product);
});

export default router;
