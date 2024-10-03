import express from "express";
import { deleteProduct, getProductDetails, getProducts, newProduct, updateProduct } from "../controllers/productController.js";
const router = express.Router();

router.route("/products").get(getProducts);
router.route("/products/:id").get(getProductDetails);
router.route("/products/:id").put(updateProduct);
router.route("/products/:id").delete(deleteProduct);
router.route("/admin/products").post(newProduct);

export default router;