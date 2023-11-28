import express from "express";
import cors from "cors";
import { user_route } from "./routes/user_route";
import { config as dotenvConfig } from "dotenv";
dotenvConfig();

import DB from "./config/db";
DB()

const app = express();
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", user_route);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`in ${process.env.SERVER_PORT}`);
})