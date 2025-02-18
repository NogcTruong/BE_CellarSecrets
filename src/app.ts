import express from "express";
import productRoutes from './routes/product.routes';

const app = express();
app.use(express.json());

// Routers
app.use('/api/products', productRoutes)

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
