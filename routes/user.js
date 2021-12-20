import express from "express";
import {createUser, getUser, updateUser} from "../controllers/user.js";
const router = express.Router();



router.get('/:userId', getUser)

router.post('/', createUser)

router.patch('/', updateUser)

router.delete('/:userId', )



export default router;