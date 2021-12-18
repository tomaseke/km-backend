import express from "express";
import {LicenseKey, ManagementKey, SolverKey} from '../models/keys.js';
import User from '../models/user.js';
const router = express.Router();

const models = {
    "solver-keys": SolverKey,
    "management-keys": ManagementKey,
    "license-keys": LicenseKey
}

router.patch('/license-keys', async (req, res) => {
    const resp = await LicenseKey.find({keyId: req.body.keyId}).updateOne({date: req.body.date})
    res.json(resp);
})


router.get('/:collection/:fbUserId', async (req, res) => {
        // get user by firebase ID
        const user = await User.findOne({id: req.params.fbUserId});
        // find all keys where userId is matching
        const resp = await models[req.params.collection].find({userId: user._id.toString()});
        res.status(200).json(resp);
})

router.post('/:collection', async (req, res) => {
    const user = await User.findOne({id: req.body.userId});
    const mongooseId = user._id.toString();
    const resp = await models[req.params.collection].create({name: req.body.name, date: req.body.date, keyId: req.body.keyId, userId: mongooseId});
    res.json(resp);
})

router.patch('/:collection', async (req, res) => {
    const resp = await models[req.params.collection].find({keyId: req.body.keyId}).updateOne({name: req.body.name})
    res.json(resp);
})

router.delete('/:collection/:keyId', async (req, res) => {
    const resp = await models[req.params.collection].find({keyId: req.params.keyId}).deleteOne();
    res.json(resp);
})

export default router;