import { Router } from "express";
import axios from "axios";
import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from "../interfaces/product";

const router = Router();

const FAKESTORE_URL = "https://fakestoreapi.com/products";

// GET 
router.get("/", async (_req, res) => {
  try {
    const response = await axios.get<Product[]>(FAKESTORE_URL);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching products", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET 
router.get("/:id", async (req, res) => {
  try {
    const response = await axios.get<Product>(
      `${FAKESTORE_URL}/${req.params.id}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
});

// POST 
router.post("/", async (req, res) => {
  const product: CreateProductDTO = req.body;

  try {
    const response = await axios.post<Product>(
      FAKESTORE_URL,
      product
    );

    res.status(201).json(response.data);
  } catch (error) {
    console.error("Error creating product", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT
router.put("/:id", async (req, res) => {
  const product: UpdateProductDTO = req.body;

  try {
    const response = await axios.put<Product>(
      `${FAKESTORE_URL}/${req.params.id}`,
      product
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error updating product", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await axios.delete(`${FAKESTORE_URL}/${req.params.id}`);
    res.json({ message: "Product deleted" });
  } catch (error) {
    console.error("Error deleting product", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
