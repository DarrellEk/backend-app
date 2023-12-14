import express from "express"
import uploadImageRouter from "./src/controllers/uploadImage.controller.js"


const app = express()
app.use(express.json())
app.use('/upload-Image', uploadImageRouter)


export default app