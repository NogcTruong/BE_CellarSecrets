import express from "express";
import { dbPool, testConnection } from "./config/database.config";

const app = express();
const port = process.env.PORT || 3000;

testConnection();

app.get("/users", async (req, res) => {
  try {
    const [rows] = await dbPool.execute("SELECT * FROM Customers");
    res.json(rows);
  } catch (error) {
    console.error('Query error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
