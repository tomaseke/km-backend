import express from "express";
import {createUser, getUser, updateUser} from "../controllers/user.js";
import {body} from "express-validator";
import {validateReq} from "../validateReq.js";
const router = express.Router();



router.get('/:userId', getUser)

router.post('/',
    body('name').isLength({min: 1}).withMessage('name must be at least one char'),
    body('email').isEmail().withMessage('must be valid email'),
    body('id').exists({checkFalsy: true}),
    validateReq,
    createUser)

router.patch('/', updateUser)

router.delete('/:userId', )



export default router;