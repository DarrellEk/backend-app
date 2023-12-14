import express from "express"

import userRouter from "./src/controllers/users.controllers.js";
import authRouter from "./src/controllers/auth.controllers.js";
import uploadImageRouter from "./src/controllers/uploadImage.controller.js"
import cors from "cors";
import morgan from "morgan";

const app = express()
app.use(express.json());
app.use(morgan('combined'));
app.use(cors());
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/upload-Image', uploadImageRouter);

export default app;





