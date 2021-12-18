import mongoose from 'mongoose';
import env from 'dotenv';
env.config();

mongoose.connect(process.env.MONGO_URI).then((res) => {
    console.log('mongoose connect')
})

const schema = new mongoose.Schema({
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User'
        },
        name: String,
        date: String,
        keyId: String
    });


export const LicenseKey = mongoose.model('License-key', schema);
export const ManagementKey = mongoose.model('Management-key', schema);
export const SolverKey = mongoose.model('Solver-key', schema);