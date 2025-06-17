import express from 'express';
import dotenv from "dotenv";
import connectDB from './config/database.js';
import User from './models/user.js';
dotenv.config();

const app=express();
connectDB();

const PORT=3000;
app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/api/v1',(req,res)=>{
    res.send('Hello from API');
});


app.get("/user", async (req, res)=>{
    const user = await User.find();
    res.status(200).json({
        message: "User fetched successfully",
        user,
    }); 
})  

app.post("/signup", async (req, res)=>{
    
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailId: req.body.emailId,
        password: req.body.password,
        age: req.body.age,
    })

    try{
         await user.save();
        res.status(201).json({
        message: "User Created Successfully",
        user,
    }); 
    }catch(error){
        res.status(400).send("Error sending  the data:"+ error.message)
    }

})


app.listen(PORT,()=>{   
    console.log(`Server is running on port ${PORT}`);
});