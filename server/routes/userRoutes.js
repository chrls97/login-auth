import express from 'express'
import { getUsersData } from '../controllers/userControllers.js'
import userAuth from '../middleware/userAuth.js'


const userRouter = express.Router();

userRouter.get('/get-users', userAuth, getUsersData)

export default userRouter;