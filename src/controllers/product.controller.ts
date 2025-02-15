import { Request, Response } from "express";
import { IProduct } from "../types/product.interface";
import { ProductModel } from "../models/product.model";

export class ProductController {
  static async createProduct(req: Request, res: Response) {
    try {
      const product: IProduct = req.body;
      const newProductId = await ProductModel.create(product);
      res.status(201).json({
        message: "Product created successfully",
        productId: newProductId,
      });
    } catch (error) {
      console.error("Create product error:", error);
      res.status(500).json({ error: "Failed to create product" });
    }
  }

  static async getAllProducts(req: Request, res: Response) {
    try {
      const products = await ProductModel.findAll();
      res.json(products);
    } catch (error) {
      console.error("Get all products error: ", error);
      res.status(500).json({ error: "Failed to get all products" });
    }
  }
}
