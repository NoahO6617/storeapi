import { prototype } from "events";
import { hostname } from "os";
import {Pool} from "pg";

export const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD
});


/*src/
 ├── config/
 │    └── database.ts
 ├── controllers/
 │    ├── product.controller.ts
 │    └── user.controller.ts
 ├── interfaces/
 │    ├── product.interface.ts
 │    └── user.interface.ts
 ├── models/
 │    ├── Product.ts
 │    └── User.ts
 ├── routes/
 │    ├── product.routes.ts
 │    └── user.routes.ts
 ├── services/
 │    ├── product.service.ts
 │    └── user.service.ts
 ├── utils/
 │    └── hashPassword.ts
 ├── app.ts
 └── server.ts*/ 