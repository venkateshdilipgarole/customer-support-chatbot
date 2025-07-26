import express from "express";
import { getTopProducts, getOrderStatus, getStockCount } from "../services/chatbotService.js";

const router = express.Router();

// Route to get top 5 most sold products
router.get("/top-products", (req, res) => {
  const products = getTopProducts();
  res.json({ topProducts: products });
});

// Route to get order status by ID
router.get("/order/:id", (req, res) => {
  const orderId = req.params.id;
  const status = getOrderStatus(orderId);
  res.json({ orderId, status });
});

// Route to get stock count of a product
router.get("/stock/:productName", (req, res) => {
  const product = req.params.productName;
  const stock = getStockCount(product);
  res.json({ product, stock });
});

export default router;
