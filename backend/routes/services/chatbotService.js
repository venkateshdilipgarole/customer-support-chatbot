import fs from "fs";
import path from "path";

const datasetPath = path.resolve("./backend/dataset/data.json"); // Assuming dataset file is data.json
const dataset = JSON.parse(fs.readFileSync(datasetPath, "utf8"));

export const getTopProducts = () => {
  const sortedProducts = dataset.products.sort((a, b) => b.sold - a.sold);
  return sortedProducts.slice(0, 5);
};

export const getOrderStatus = (orderId) => {
  const order = dataset.orders.find((o) => o.id === orderId);
  return order ? order.status : "Order not found";
};

export const getStockCount = (productName) => {
  const product = dataset.products.find(
    (p) => p.name.toLowerCase() === productName.toLowerCase()
  );
  return product ? product.stock : "Product not found";
};
