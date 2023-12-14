import express from 'express'
import prisma from "../utils/prisma.js"
import { filter } from "../utils/common.js"
import auth from '../middlewares/auth.js'
import cors from "cors";
const uploadRouter = express.Router()
uploadRouter.use(cors());

uploadRouter.post('/', auth, (req,res)=>{
    const data = req.body

    prisma.images.create({
        data
    }).then(image=>{
        return res.json(filter(image, 'id', 'url','memoryId'))
    })
    //.catch error handling
})

export default uploadRouter