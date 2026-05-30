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
  uploadProductImage
} from "../controllers/productController.js";

import upload from "../middleware/uploadMiddleware.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

import {
  adminOnly,
} from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/search", searchProducts);

router.get("/filter", filterProducts);

router.get("/featured", getFeaturedProducts);

router.get("/:id", getSingleProduct);

router.post(
  "/",
  protect,
  adminOnly,
  createProduct
);

router.put(
  "/:id",
  protect,
  adminOnly,
  updateProduct
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteProduct
);

router.post(
  "/upload-image",
  protect,
  adminOnly,
  upload.single("image"),
  uploadProductImage
);

export default router;