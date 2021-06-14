const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const PORT = process.env.PORT;



mongoose.connect('mongodb://localhost:27017/DB_NAME',{ useNewUrlParser: true, useUnifiedTopology: true });



app.listen(PORT,()=>{
    console.log(`app is listening on PORT ::: ${PORT}`);
})


const MyDigimonSchema = new mongoose.Schema({
    name:String,
    img:String,
    level:String
})

const MyDigimonModel = mongoose.model('digimon',MyDigimonSchema);




app.post('/addToFavDatabase',addToFavDatabaseHandler);
// app.get('/favoritedFunc',favoritedFuncHandler);
app.get('/getFromBack',getFromBackHandler);
// app.get('/renderApi',renderApiHandler);
app.delete('/deleteFromDatabase:id',deleteFromDatabaseHandler);
app.put('/updateDataBase',updateDataBaseHandler);





function getFromBackHandler(req,res){
    const url = 'https://digimon-api.vercel.app/api/digimon';

    res.send(url);
}


function addToFavDatabaseHandler(req,res){

    const {name,img,level} = req.body;

    MyDigimonModel.find({},(error,data)=>{
        res.send(data);
    })
    data.save();

}

function deleteFromDatabaseHandler(req,res){
    const name = req.params.name;

    MyDigimonModel.remove({_id:name},(error,data)=>{
        MyDigimonModel.find({},(error,newData)=>{
            res.send(newData);
        })
    })
}

function updateDataBaseHandler(req,res){

    const {name,level,img} = req.body;

    MyDigimonModel.findOne({_id:name},(error,data)=>{
        res.send(data);
    })
    data.save();
}