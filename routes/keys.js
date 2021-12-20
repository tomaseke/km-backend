import express from "express";
import {getKeys, addKey, updateKey, deleteKey} from "../controllers/keys.js";
const router = express.Router();


router.get('/:collection/:fbUserId', getKeys)

router.post('/:collection', addKey)

router.patch('/:collection', updateKey)

router.delete('/:collection/:keyId', deleteKey)

export default router;