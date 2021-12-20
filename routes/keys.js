import express from "express";
import {getKeys, addKey, updateKey, deleteKey} from "../controllers/keys.js";
import {body} from "express-validator";
import {validateReq} from "../validateReq.js";
const router = express.Router();


router.get('/:collection/:fbUserId', getKeys)

router.post('/:collection',
    body('name').isLength({min: 1, max:20}).withMessage('name must be more than 5 chars and less than 20'),
    body('keyId').isLength({min: 60, max:60}).withMessage('keyId must be 60 chars'),
    addKey)

router.patch('/:collection',
    body('name').isLength({min: 1, max:20}).withMessage('must be more than 5 chars and less than 20') ,
    validateReq,
    updateKey)

router.delete('/:collection/:keyId', deleteKey)

export default router;