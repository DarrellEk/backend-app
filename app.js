import express from "express"
import userRouter from "./src/controllers/users.controllers.js";
import cors from "cors";
import morgan from "morgan";

const app = express()
app.use(morgan('combined'));
app.use(cors());
app.use('/users', userRouter);

export default app;