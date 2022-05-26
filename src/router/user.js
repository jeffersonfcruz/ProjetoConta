const express = require ("express");
const users = require ("../model/users");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require ("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/bancodados",{
    useNewUrlParser:true,useUnifiedTopology:true
})
const create_token = require ("../utils/createtoken");
const verify_token = require ("../middleware/verifytoken");
const cfg = require ("../config/cfg")

//router defined to create user 
router.post("/add", (req,res) => {
    bcrypt.hash(req.body.password,cfg.salt_bc,(error, hash)=>{
        if (error)return res.status(500).send({output: `Internal error at generator password -> ${error}`});
        // insert hash password at body password request
        req.body.password = hash;
        
        const data = new users (req.body);
        data.save().then((result)=>{
            res.status(201).send({output: `inserted success`,payload:result})
        }).catch((err)=>console.error({output:`error at insert -> ${err}`}))
    })
})
// router login defined
router.post("/login",(req,res)=>{
    users.findOne({user:req.body.user},(error,result)=>{
        if (error) return res.status(500).send({output: `internal error -> ${error}`})
        if (!result) return res.status(404).send({output: `user not found -> ${error}`})
        
        bcrypt.compare(req.body.password,result.password,(err,same)=>{
            if(err) return res.status(500).send({output: `internal error -> ${err}`})
            if(!same) return res.status(400).send({output: `invalid password`})
            const token = create_token(result._id,result.user,result.email);
            res.status(200).send({output: `authenticated`, token:token})
        })
    })
})
router.get("/dados",verify_token,(req,res)=>{
    res.send("Eu estou bem")
})

module.exports = router;