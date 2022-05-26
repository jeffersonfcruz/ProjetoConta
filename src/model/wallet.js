const mongoose = require("mongoose");

const schema_wallet =new mongoose.Schema({
    cartname:{type:String ,require:true},
    calance:{type:Number, require:true},
    usebalance:{type:Number, require:true},
    idusuario:{type:Number, require:true}
})
module.exports = mongoose.model("Wallet",schema_wallet);