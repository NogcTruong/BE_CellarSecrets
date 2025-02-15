import { ResultSetHeader, RowDataPacket } from "mysql2";
import { dbPool } from "../config/database.config";
import { IProduct } from "../types/product.interface";

export class ProductModel {
  static async create(product: IProduct): Promise<number> {
    const query = `INSERT INTO Products (title, description, price, discount, quantity, image_url, vendor, product_type) VALUES (?, ?, ?, ?,?, ?, ?, ?)`;

    const [result] = await dbPool.execute<ResultSetHeader>(query, [
      product.title,
      product.description || null,
      product.price,
      product.discount || 0,
      product.quantity,
      product.image_url,
      product.vendor || null,
      product.product_type || null,
    ]);

    return result.insertId;
  }

  static async findAll(): Promise<IProduct[]> {
    const [rows] = await dbPool.query<RowDataPacket[]>('SELECT * FROM Products')
    return rows as IProduct[];
  }
}
