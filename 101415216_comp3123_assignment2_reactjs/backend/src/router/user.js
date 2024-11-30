const express = require('express');
const router = express.Router();
const userSchema = require('../model/userSchema.js')
const bcrypt = require("bcryptjs")

router.get('/', async (req, res)=>{
    const users = await userSchema.find({})
    res.status(200).send(users);
})

router.post('/signup', async (req, res)=>{
    if(!req.body.username){
        res.status(400).send({message: 'Request cannot be empty'});
    }

    try{
        const userData = req.body;
        const user = new userSchema(userData);
        const newuser = await user.save();
        console.log(`User: ${user.username} has been added`);
        console.log(newuser.password);
        res.status(201).send({
            message: "User created successfully",
            user_id: newuser.id
        });
    }catch(err){
        res.status(500).send({message: err.message})
    }
})

router.post('/login', async (req, res)=>{
    if(!req.body.loginCredential){
        res.status(400).send({message: 'Request cannot be empty'});
    }
    try{
        let user = null;
        if(req.body.loginCredential.includes("@")){
            user = await userSchema.findOne({email: req.body.loginCredential});
        }else{
            user = await userSchema.findOne({username: req.body.loginCredential});
        }
        if(user){
            const matchpw = bcrypt.compare(req.body.password, user.password)
            if(matchpw){            
                res.status(201).send({message: "Login Successfully"});
            }else{
                res.status(400).send({message:"Password doesn't match your email. Please try again"})
            }
        }else{
            res.status(404).send({message: "Your account cannot be found. Please sign up"})
        }
    }catch(err){
        res.status(500).send({message: err.message})
    }
})

module.exports = router;