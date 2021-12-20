import mongoose from 'mongoose';


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