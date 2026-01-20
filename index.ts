import 'dotenv/config'
import * as express from "express";
import productRoutes from "./src/endpoints/products";

const app = express();
const port = Number(process.env.PORT) || 8080;

app.use(express.json());

app.use('/products', productRoutes);

app.get('/', (_req, res) => {
  res.send('API funcionando');
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
