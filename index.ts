import 'dotenv/config'
import * as express from "express";
import productRoutes from "./src/endpoints/products";
import userRoutes from "./src/endpoints/user";

const app = express();
const port = Number(process.env.PORT) || 8080;

app.use(express.json());

app.use('/products', productRoutes);
app.use('/users', userRoutes); 

app.get('/', (_req, res) => {
  res.send('API funcionando');
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});


