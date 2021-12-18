import express from 'express';
import bodyParser from "body-parser";
import keyRoutes from "./routes/keys.js";
import userRoutes from "./routes/user.js"
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})
app.use(bodyParser.json());
app.use('/keys', keyRoutes);
app.use('/user',userRoutes);


app.listen(3000, () => {
    console.log('listening')
})
