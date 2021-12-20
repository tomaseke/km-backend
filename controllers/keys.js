import User from "../models/user.js";
import {LicenseKey, ManagementKey, SolverKey} from "../models/keys.js";

const models = {
    "solver-keys": SolverKey,
    "management-keys": ManagementKey,
    "license-keys": LicenseKey
}

export async function getKeys(req, res, next){
    try {
        const user = await User.findOne({id: req.params.fbUserId});
        // find all keys where userId is matching
        const resp = await models[req.params.collection].find({userId: user._id.toString()});
        res.status(200).json(resp);
    }
    catch (error) {
        res.json(error)
    }
}

export async function addKey(req, res, next) {
    const user = await User.findOne({id: req.body.userId});
    const mongooseId = user._id.toString();
    const resp = await models[req.params.collection].create({name: req.body.name, date: req.body.date, keyId: req.body.keyId, userId: mongooseId});
    res.json(resp);
}

export async function updateKey(req, res, next) {
    const resp = await models[req.params.collection].find({keyId: req.body.keyId}).updateOne({name: req.body.name, date: req.body.date})
    res.json(resp);
}

export async function deleteKey (req, res){
    const resp = await models[req.params.collection].find({keyId: req.params.keyId}).deleteOne();
    res.json(resp);
}