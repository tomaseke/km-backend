import mongoose from 'mongoose';
import env from 'dotenv';
env.config();

mongoose.connect(process.env.MONGO_URI).then((res) => {
    console.log('mongoose connect')
})

    const schema = new mongoose.Schema({
        email: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        profilePic: String
    });

export default mongoose.model('User', schema);