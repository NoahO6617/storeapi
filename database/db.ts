import { prototype } from "events";
import { hostname } from "os";
import {Pool} from "pg";

const pool = new Pool({
    host: process.env.DB_HOST,
    prot: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE
});
