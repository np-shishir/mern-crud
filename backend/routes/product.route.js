import express from 'express'
import { addProduct, deleteProduct, getProduct, updateProduct } from '../controllers/product.controller.js';

const router = express.Router()


router.get("/", getProduct);
router.post("/", addProduct);
router.delete("/:id", deleteProduct);
router.put("/:id",updateProduct);


export default router