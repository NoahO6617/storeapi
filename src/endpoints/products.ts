import { Router } from "express";
import axios from "axios";
import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from "../interfaces/product";

const router = Router();

const FAKESTORE_URL = "https://fakestoreapi.com/products";

// GET all
router.get("/", async (_req, res) => {
  try {
    const response = await axios.get<Product[]>(FAKESTORE_URL);
    res.json(response.data);
  } catch {
    res.status(500).json({ error: "Error fetching products" });
  }
});

// GET by id
router.get("/:id", async (req, res) => {
  try {
    const response = await axios.get<Product>(
      `${FAKESTORE_URL}/${req.params.id}`
    );
    res.json(response.data);
  } catch {
    res.status(404).json({ message: "Product not found" });
  }
});

// POST
router.post("/", async (req, res) => {
  try {
    const response = await axios.post<Product>(
      FAKESTORE_URL,
      req.body
    );
    res.status(201).json(response.data);
  } catch {
    res.status(500).json({ error: "Error creating product" });
  }
});

// PUT
router.put("/:id", async (req, res) => {
  try {
    const response = await axios.put<Product>(
      `${FAKESTORE_URL}/${req.params.id}`,
      req.body
    );
    res.json(response.data);
  } catch {
    res.status(500).json({ error: "Error updating product" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await axios.delete(`${FAKESTORE_URL}/${req.params.id}`);
    res.json({ message: "Product deleted" });
  } catch {
    res.status(500).json({ error: "Error deleting product" });
  }
});

export default router;
