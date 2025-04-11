import express from 'express';
import {createServer} from 'node:http';

import {Server} from 'socket.io';

import mongoose from 'mongoose';
import cors from 'cors';


import connectToSocket from './controllers/socketManager.js';

import userRoutes from './routes/users.routes.js';


const app = express();
app.use(express.json());
const server = createServer(app);
const io=connectToSocket(server);

app.use("/api/v1/users",userRoutes);

app.set("port",(process.env.PORT || 8000));


app.use(cors());
app.use(express.json(express.json({limit:"40kb"})));

app.use(express.urlencoded({limit:"40kb",extended:true}));



const start=async()=>{
    app.set("mongo_user")

    const connectionDb=await mongoose.connect("mongodb+srv://prajwalghurde320:gci0QPwScofk0uwX@cluster0.myhrzxk.mongodb.net/");

    console.log(`Connected to MongoDB: ${connectionDb.connection.host}`);


    server.listen(app.get("port"),()=>{
        console.log("Server started on port 8000");
    });
}

start();