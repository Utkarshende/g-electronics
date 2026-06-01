import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Address from "../models/Address.js";

//place order
export const placeOrder = async (
  req,
  res
) => {
  try {
    const { addressId, paymentMethod } =
      req.body;

    const cart = await Cart.findOne({
      user: req.user._id,
    }).populate("items.product");

    if (
      !cart ||
      cart.items.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const address =
      await Address.findById(
        addressId
      );

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    const orderNumber =
      "ORD-" + Date.now();

    const order =
      await Order.create({
        orderNumber,
        user: req.user._id,
        address: address._id,

        items: cart.items.map(
          (item) => ({
            product:
              item.product._id,
            quantity:
              item.quantity,
            price: item.price,
          })
        ),

        totalAmount:
          cart.totalAmount,

        paymentMethod:
          paymentMethod || "COD",
      });

    cart.items = [];
    cart.totalAmount = 0;

    await cart.save();

    res.status(201).json({
      success: true,
      message:
        "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get my order

export const getMyOrders =
  async (req, res) => {
    try {
      const orders =
        await Order.find({
          user: req.user._id,
        })
          .populate("address")
          .populate(
            "items.product"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

  //single order

  export const getSingleOrder =
  async (req, res) => {
    try {
      const order =
        await Order.findById(
          req.params.id
        )
          .populate("address")
          .populate(
            "items.product"
          );

      if (!order) {
        return res.status(404).json({
          success: false,
          message:
            "Order not found",
        });
      }

      res.status(200).json({
        success: true,
        order,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

  //admin order status update

  export const updateOrderStatus =
  async (req, res) => {
    try {
      const { status } =
        req.body;

      const order =
        await Order.findById(
          req.params.id
        );

      if (!order) {
        return res.status(404).json({
          success: false,
          message:
            "Order not found",
        });
      }

      order.orderStatus =
        status;

      await order.save();

      res.status(200).json({
        success: true,
        order,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };