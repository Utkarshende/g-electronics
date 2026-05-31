import express from "express";

import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
} from "../controllers/cartController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/add",
  protect,
  addToCart
);

router.get(
  "/",
  protect,
  getCart
);

router.delete(
  "/remove/:productId",
  protect,
  removeFromCart
);

router.put(
  "/update/:productId",
  protect,
  updateCartQuantity
);

router.delete(
  "/clear",
  protect,
  clearCart
);

export default router;