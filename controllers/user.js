import User from "../models/user.js";
import {LicenseKey, ManagementKey, SolverKey} from "../models/keys.js";

const models = {
    "solver-keys": SolverKey,
    "management-keys": ManagementKey,
    "license-keys": LicenseKey
}

export async function getUser (req, res){
    try {
        const user = await User.findOne({id: req.params.userId});
        res.status(200).json({name: user.name, email: user.email, profilePic: user.profilePic });
    }
    catch(err) {
        res.json(err.message);
    }
}

export async function createUser (req, res) {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user)
    }
    catch(err) {
        res.json(err.message);
    }
}

export async function updateUser(req, res)  {
    try{
        const user = await User.findOne({id: req.body.userId});
        user.profilePic = req.body.profilePic;
        user.name = req.body.name;
        await user.save();
        res.status(204).json(user);
    }
    catch (err){
        res.json(err);
    }
}

export async function deleteUser(req, res){
    try {
        // delete all users keys and then delete user itself
        const user = await User.findOne({id: req.params.userId});
        await models["license-keys"].find({userId: user._id}).deleteMany();
        await models["solver-keys"].find({userId: user._id}).deleteMany();
        await models["management-keys"].find({userId: user._id}).deleteMany();
        user.deleteOne();
        res.status(204).json({deleted: true});
    }
    catch (err){
        res.json(err);
    }
}