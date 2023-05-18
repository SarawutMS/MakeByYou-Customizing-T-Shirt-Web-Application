var express = require('express');
var service = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema
mongoose.set('strictQuery', false)
mongoose.set('bufferCommands', false);
// Define the database URL to connect to.
var os = require("os");
const multer = require('multer');
var fs = require('fs');
var ObjectId = require('mongoose').Types.ObjectId;
const mongoDB = "mongodb://127.0.0.1:27017/Database";
var url = "mongodb://localhost:27017/Database";
const ip = require('ip');
async function main() {
  await mongoose.connect(mongoDB)
}

main().catch(err => console.log(err));

let services = ['users', 'shirts', 'carts', 'bills'];


// Model // 
const Users = require('./model/users');
const Shirts = require('./model/shirts');
const Address = require('./model/address');
const Bills = require('./model/bills');
const Carts = require('./model/carts');
const Orders = require('./model/orders');
const Payments = require('./model/payments');
const date = new Date();

const fileFn = (fileuploads, prototype) => {

  try {
    var base64String = fileuploads;

    let base64Data = base64String.split(';base64,').pop();
    let type = base64String.split(';', 1);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    let result_type = type[0].slice(12);
    const folderName = `./public/images/cliptart`;
    const component_folder = `/component`;


    try {
      if (!fs.existsSync(folderName)) {
        const path_ = folderName + component_folder;

        fs.mkdirSync(folderName + component_folder, { recursive: true });
      }
    } catch (err) {
      console.error(err);
    }
    const name_ = `${uniqueSuffix}`;
    const path_ = `${folderName}/${name_}.png`;

    fs.writeFile(path_, base64Data, 'base64', function (err) {
      if (err) console.log(err);
      fs.readFile(path_, function (err, data) {
        if (err) throw err;
        console.log("Upload Done")
      });
    });

    return name_;

  }
  catch (e) {

    console.log("error")
  }
};
service.post('/mongo/upload/img', async (req, res, next) => {
  let base64String = JSON.stringify(req.body.data);


  fileFn(JSON.stringify(req.body.data))


  console.log(base64String)

  res.send(base64String);
});


service.delete('/mongo/drop/', async (req, res, next) => {

  let Side = req.query.db;

  try {
    const result = await eval(`${Side}`).deleteOne({ _id: ObjectId(req.query._id) });



  } catch (err) {
    console.log(err)
  } finally {
    res.send("Action")
  }


});





service.delete('/mongo/delete/img', async (req, res, next) => {

  console.log(req.query.name)


  try {
    let filePath = `./public/images/cliptart/${req.query.name}`;
    fs.unlinkSync(filePath);

  } catch (err) {
    console.log(err)
  } finally {
    res.send("Action")
  }


});





service.get('/mongo', (req, res) => {

  let rd = `${date.toLocaleString("en-GB")}`
  const da = rd.split(",");

  res.json(da)

});


service.put('/mongo/update/:tables', async (req, res, next) => {
  try {
    const table = req.params.tables;
    const _id = new ObjectId(req.body[1]._id);

    var myquery = { _id: _id };
    var newvalues = { $set: req.body[0] };
    const result = await eval(`${table}`).updateOne(myquery, newvalues);
    res.send(result);
  } catch (err) {
    console.log(err)
  }


});





//Get all data
service.get('/mongo/:data?', async (req, res, next) => {

  try {
    let Side = req.params.data;
    if (Side) {
      const result = await eval(`${Side}`).find({}).sort({ _id: -1 });

      res.json(result)
    } else {
      res.send(`Database/`)
    }
  } catch (err) {
    console.log(err)
    res.send(err)
    next
  }



});
const path = require('path');




//cliptart
service.get('/mongo/images/cliptart', async (req, res) => {
  files = fs.readdirSync('./public/images/cliptart', { withFileTypes: true });
  let Object = []

  try {

    for (let index in files) {

      Object[index] = { path: `http://${ip.address()}:3015/images/cliptart/${files[index].name}`, data: files[index] }

    }
    res.status(200).json(Object)
  } catch (err) {
    console.log(err)
  } finally {


  }

});


//Login
service.post('/mongo/login', async (req, res) => {
  console.log(req.body.password)
  try {
    Users.findOne({ email: req.body.email, password: req.body.password }).then((user) => {

      if (user) {

        return res.status(200).json({ state: true, _id: user._id, data: user })
      }
      else {
        return res.status(400).json(false);
      }
    });
  } catch (err) {
    console.log(err)
  };


});

//Register
service.post('/mongo/register', async (req, res) => {
  try {
    Users.findOne({ email: req.body.email }).then((user) => {
      console.log(user)
      if (user) {
        return res.status(400).json({ msg: "A user has already" });
      }
      else {
        const newUser = new Users({
          email: req.body.email,
          name: req.body.name,
          last_name: req.body.last_name,
          password: req.body.password
        })

        newUser.save()
        console.log(newUser);
        return res.status(200).json({ msg: newUser, success: "สำเร็จ" })
      }
    });
  } catch (err) {
    console.log(err)
  }


});

service.use('/mongo/shirts', require('./shirts/shirtsMongo'));
service.use('/mongo/users', require('./users/usersMongo'));
service.use('/mongo/carts', require('./carts/cartsMongo'));
service.use('/mongo/orders', require('./orders/ordersMongo'));
service.use('/mongo/bills', require('./bills/billsMongo'));
service.use('/mongo/payments', require('./payments/paymentsMongo'));
module.exports = service;



