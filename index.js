import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors'
import router from "./routes/admin/AuthRoutes.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";

dotenv.config();

const app = express();

const { Port, connection_Uri } = process.env;

const port = Port;

app.use(express.json());
app.use(cookieParser())
app.use(morgan("dev"))
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get('/', (req, res) =>{
    res.send('HMS')
})

app.use("/api/v1/Tes-HMS/auth", router);

app.listen(port, () => {
  console.log(`Server is running on port ${Port}`);
});

mongoose
  .connect(connection_Uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));
