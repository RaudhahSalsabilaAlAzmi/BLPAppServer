// import app from "./app.js";
const app = require('./app.js');
// import dotenv from "dotenv";
const dotenv = require('dotenv');
// import {mongoConnect} from './middleware/dbCoonect.js';
const {mongoConnect} = require('./middleware/dbCoonect.js');
dotenv.config()

const PORT = process.env.PORT || 3000;

app.listen(PORT, async ()=> {
    await mongoConnect();
    console.log(`Server running on port ${PORT}`);
});