import { ResultSetHeader, RowDataPacket } from "mysql2";
import { dbPool } from "../config/database.config";
import { IProduct } from "../types/product.interface";
import { console } from "node:inspector/promises";
import { promises } from "node:readline";

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
    const [rows] = await dbPool.query<RowDataPacket[]>(
      "SELECT * FROM Products"
    );
    return rows as IProduct[];
  }

  static async findById(id: number): Promise<IProduct | null> {
    const [rows] = await dbPool.query<RowDataPacket[]>(
      "SELECT * FROM Products WHERE id = ?",
      [id]
    );
    return (rows[0] as IProduct) || null;
  }

  static async update(
    id: number,
    product: Partial<IProduct>
  ): Promise<boolean> {
    const entries = Object.entries(product);
    if (entries.length === 0) return false;

    const setClause = entries.map(([key]) => `${key} = ?`).join(", ");

    const values = entries.map(([, value]) => value);
    values.push(id);

    const query = `UPDATE Products
    SET ${setClause}
    WHERE id = ?`;

    const [result] = await dbPool.execute<ResultSetHeader>(query, values);
    return result.affectedRows > 0;
  }

  static async delete(id: number): Promise<boolean> {
    const [result] = await dbPool.execute<ResultSetHeader>('DELETE FROM Products WHERE id = ?', [id])

    return result.affectedRows > 0;
  }
}
