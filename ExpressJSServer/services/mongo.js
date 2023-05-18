var express = require('express');
var mongo = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema
mongoose.set('strictQuery', false)
mongoose.set('bufferCommands', false);
// Define the database URL to connect to.

const multer = require('multer');
var fs = require('fs');
var ObjectId = require('mongoose').Types.ObjectId;
const mongoDB = "mongodb://127.0.0.1:27017/Database";
var url = "mongodb://localhost:27017/Database";

async function main() {
  await mongoose.connect(mongoDB)
}

main().catch(err => console.log(err));


// Model // 
const Users = require('./model/users');
const Shirts = require('./model/shirts');
const Address = require('./model/address');
const Bills = require('./model/bills');
const Carts = require('./model/carts');
const Orders = require('./model/orders');

//Get all data
mongo.get('/:data?', async (req, res) => {

  let Side = req.params.data;
  if (Side) {
    const result = await eval(`${Side}`).find({});
    res.json(result)
  } else {
    res.send(`Database/`)
  }


});


//Login
mongo.post('/Login', async (req, res) => {


  Users.findOne({ email: req.body.email, password: req.body.password }).then((user) => {
    if (user) {
      

      return res.status(200).json({ state: true, _id: user[0]._id, data: user[0] })
    }
    else {
      return res.status(400).json({ msg: "This id dousenot register" });
    }
  });

});


//Register


module.exports = mongo;