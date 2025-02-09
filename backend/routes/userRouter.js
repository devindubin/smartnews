import {Router} from 'express'
import { getAllUsers, createUser, deleteUser } from '../controllers/userControllers'

const router = Router()

router.get(getAllUsers).post(createUser).delete(deleteUser)



