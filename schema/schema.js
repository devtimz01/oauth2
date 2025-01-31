const mongoose = require('mongoose');
const { type } = require('os');
require('dotenv').config();
const connect = mongoose.connect(process.env.DATABASE);

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