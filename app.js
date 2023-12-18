import express from "express"

import userRouter from "./src/controllers/users.controllers.js";
import authRouter from "./src/controllers/auth.controllers.js";
import imagesRouter from "./src/controllers/images.controller.js"
import paymentRouter from "./src/controllers/payment.controller.js";
import memoriesRouter from "./src/controllers/memories.controller.js";
import cors from "cors";
import morgan from "morgan";

const app = express()
app.use(express.json());
app.use(morgan('combined'));
app.use(cors());
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/images', imagesRouter);
app.use('/payment', paymentRouter);
app.use('/memories', memoriesRouter);

export default app;





