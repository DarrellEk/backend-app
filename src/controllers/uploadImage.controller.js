import express from 'express'
import prisma from "../utils/prisma.js"
import { filter } from "../utils/common.js"
import auth from '../middlewares/auth.js'
import { Prisma } from '@prisma/client'
import cors from "cors";
const uploadImageRouter = express.Router()
uploadImageRouter.use(cors());

uploadImageRouter.post('/', auth, (req,res)=>{
    /*
    {
        url: "https://abcdefg@example.com"     
        description: "description"   
        memoryId: "5"    
    }
    */
    const data = req.body

    prisma.images.create({
        data
    }).then(image=>{
        return res.json(filter(image, 'id', 'url','memoryId'))
    }).catch(err => {
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
          const formattedError = {}
          formattedError[`${err.meta.target[0]}`] = 'url already exists'
    
          return res.status(500).send({
            error: formattedError
          })
        }
        throw err
      })
    
})

export default uploadImageRouter