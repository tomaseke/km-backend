import express from "express";
import User from '../models/user.js';
import {LicenseKey, ManagementKey, SolverKey} from '../models/keys.js';
const router = express.Router();

const models = {
    "solver-keys": SolverKey,
    "management-keys": ManagementKey,
    "license-keys": LicenseKey
}


router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findOne({id: req.params.userId});
        res.status(200).json({name: user.name, email: user.email, profilePic: user.profilePic });
    }
    catch(err) {
        res.json(err.message);
    }
})

router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user)
    }
    catch(err) {
        res.json(err.message);
    }
})

router.patch('/', async (req, res) => {
    const user = await User.findOne({id: req.body.userId});
    user.profilePic = req.body.profilePic;
    user.name = req.body.name;
    await user.save();
    res.json(user);
})

router.delete('/:userId', async (req, res) => {
    // delete all users keys and then delete user itself
    const user = await User.findOne({id: req.params.userId});
    await models["license-keys"].find({userId: user._id}).deleteMany();
    await models["solver-keys"].find({userId: user._id}).deleteMany();
    await models["management-keys"].find({userId: user._id}).deleteMany();
    user.deleteOne();
    res.json({deleted: true});
})



export default router;