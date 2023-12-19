import express from 'express'
import prisma from "../utils/prisma.js"
import { filter } from "../utils/common.js"
import auth from '../middlewares/auth.js'
import cors from "cors";
import { validateMemory } from '../validators/memories.js'
const memoriesRouter = express.Router()
memoriesRouter.use(cors());

// model Memories {
//     id            Int        @id @default(autoincrement())
//     location      String   
//     time          DateTime   
//     description   String?
//     title         String     
//     created_at    DateTime @default(now())
//     updated_at    DateTime @updatedAt
//     images        Images[]
//     videos        Videos[]
//     user          Users    @relation(fields: [userId], references:[id])
//     userId        Int
//   }

memoriesRouter.post('/', auth, async (req,res)=>{
    const data = req.body

    const validationErrors = validateMemory(data);
    console.log('Validation errors:', validationErrors);
    if (Object.keys(validationErrors).length != 0) return res.status(400).send({
        error: validationErrors
      })

    try{
        const memory = await prisma.memories.create({
            data
        })
        res.json(filter(memory, 'id', 'title','userId'))
    }catch(error){
        console.log("error:", error.message);
        res.status(500).send({error: "Error entering memory"})
    }
    
})

memoriesRouter.put('/:id', auth, async (req, res) => {
  const memoryId = parseInt(req.params.id, 10);
  const updatedData = req.body;

  const validationErrors = validateMemory(updatedData);
    console.log('Validation errors:', validationErrors);
    if (Object.keys(validationErrors).length != 0) return res.status(400).send({
        error: validationErrors
      })

  try {
    const updatedMemory = await prisma.memories.update({
      where: { id: memoryId },
      data: updatedData,
    });
    res.json(filter(updatedMemory, 'id', 'title', 'userId'));
  } catch (error) {
    console.log("error:", error.message);
    res.status(500).send({ error: 'Error updating the memory' });
  }

})

memoriesRouter.delete('/:id', auth, async (req, res) => {
  const memoryId = parseInt(req.params.id, 10);

  try{
    //delete all images and videos belonging to the memory first. 
    //User should be warned that all images and videos associated with the memory will be deleted as well
    await prisma.images.deleteMany({
      where:{
        memoryId: memoryId
      }
    })
    await prisma.videos.deleteMany({
      where:{
        memoryId: memoryId
      }
    })

    //then only can the memory be deleted
    const deletedMemory = await prisma.memories.delete({
      where:{
        id: memoryId
      }
    })

    res.json(filter(deletedMemory, 'id', 'title', 'userId'));
  }catch(error){
    console.log("error:", error.message);
    res.status(500).send({error: 'Error deleting the memory'});
  }
});

export default memoriesRouter