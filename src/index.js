const express = require ("express");
const cors = require ("cors");
const bcrypt = require ("bcrypt");
const mongoose = require ("mongoose");
const helmet = require ("helmet");
const morgan = require ("morgan");

const cfg = require ("./config/cfg");
const create_token = require ("./utils/createtoken");
const verify_token = require ("./middleware/verifytoken");
const user = require ("./model/users");
const wallet = require ("./model/wallet");

const route = "/api/project";

const app =  express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));



app.get("/",(req,res)=>
{
    res.send("Olá, eu venho do servidor");
});
app.listen(5001,()=>console.log(`Server on-line`));
