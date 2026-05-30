import express from "express";

import {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  filterProducts,
  getFeaturedProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/search", searchProducts);

router.get("/filter", filterProducts);

router.get("/featured", getFeaturedProducts);

router.get("/:id", getSingleProduct);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;