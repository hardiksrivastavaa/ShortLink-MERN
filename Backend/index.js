import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectToDB from "./config/dbConnnect.js";
import urlRoutes from "./routes/url.js";
import userRoutes from "./routes/user.js";

connectToDB(process.env.DB_URL);

const app = express();
app.use(express.json());
app.use(cors());

app.use("/url/", urlRoutes);
app.use("/user/", userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port : ${process.env.PORT} `);
});
 