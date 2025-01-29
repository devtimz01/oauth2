const mongoose = require('mongoose');
const { type } = require('os');
const connect = mongoose.connect('mongodb+srv://moses1model:knHAaE7cwIluJA7t@cluster0.jhxjl.mongodb.net/user');

connect.then(()=>{
    console.log('database connected');
})
.catch(()=>{
    console.log('database not connected')
})
//schema

const collectionSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required: true,
        },
        googleId:{
            type:String,
            required: true
            
        }
    }
);

const data = new mongoose.model('user',collectionSchema);
module.exports = data;