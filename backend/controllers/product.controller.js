import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProduct = async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.log("error fetching", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const addProduct = async (req, res) => {
  const product = req.body; //data sent by user in data
  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({
      success: false,
      message: "Please provide all the fields",
    });
  }
  //if all data fields entered,
  //Product is the model in "product.model.js"
  //product is the data received from req.body given by user
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.error("Error in create product: ", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid product ID",
    });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid product ID",
    });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
