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
        if (error)return res.status(500).send({output: `Internal error at generator password ${error}`});
        // insert hash password at body password request
        req.body.password = hash;
        
        const data = new users (req.body);
        data.save().then((result)=>{
            res.status(201).send({output: `inserted success`,payload:result})
        }).catch((err)=>console.error({output:`error at insert -> ${err}`}))
    })
})
module.exports = router;