import express from "express";

import {
  placeOrder,
  getMyOrders,
  getSingleOrder,
  updateOrderStatus,
} from "../controllers/orderController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

import {
  adminOnly,
} from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  placeOrder
);

router.get(
  "/my-orders",
  protect,
  getMyOrders
);

router.get(
  "/:id",
  protect,
  getSingleOrder
);

router.put(
  "/:id/status",
  protect,
  adminOnly,
  updateOrderStatus
);

export default router;