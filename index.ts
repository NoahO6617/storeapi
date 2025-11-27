import * as express from "express";
import productRoutes from "./endpoints/products";


const app = express();
const port = parseInt(process.env.PORT) || process.argv[3] || 8080;

app.use('/api/products', productRoutes);
app.get('/', (req, res) => {
  res.send('Hello World');
});


app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
