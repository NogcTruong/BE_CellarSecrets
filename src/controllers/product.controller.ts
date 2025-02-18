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

  static async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const product = await ProductModel.findById(id);
      if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
      }
      res.json(product);
    } catch (error) {
      console.error("Get product error: ", error);
      res.status(500).json({ error: "Failed to get product" });
    }
  }

  static async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const updateData: Partial<IProduct> = req.body;
      console.log("updateDat", updateData);
      const success = await ProductModel.update(id, updateData);
      console.log("success:", success);
      if (!success) {
        res.status(404).json({ error: "Product not found!" });
        return;
      }
      res.json({ message: "Product updated successfully" });
    } catch (error) {
      console.error("Update product error: ", error);
      res.status(500).json({ error: "Failed to update product" });
    }
  }

  static async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await ProductModel.delete(id);
      if (!success) {
        res.status(404).json({ error: "Product not found!" });
        return;
      }
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Delete product error: ", error);
      res.status(500).json({ error: "Failed to delete product" });
    }
  }
}
