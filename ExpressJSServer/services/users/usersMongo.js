var express = require('express');
var users = express.Router();

const Users = require('.././model/users');
const Address = require('.././model/address');

var ObjectId = require('mongoose').Types.ObjectId;

const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
}

users.get('/homeshirts', async (req, res) => {
  let usersR = await Users.aggregate([
    {
      $lookup: {
        from: "shirts",
        localField: "_id",
        foreignField: "user_id",
        as: "Shirts",
        pipeline: [
          {
            $match: {
              permission:true
            }
          },
          { $sort: { _id: -1 } }, { $limit: 5 }
        ],
      }
    },
    { $sort: { _id: -1 } },

  ])
  console.log(usersR)
  // CLear null beta
  let data = []
  for (let i in usersR) {
    if (usersR[i].Shirts.length != 0 ) {
      data.push(usersR[i])
    }
  }

  res.status(200).json(shuffle(data))
});


users.get('/profile', async (req, res) => {

  let id = ObjectId(req.query._id)
  let usersProfile = await Users.aggregate([
    {
      $lookup: {
        from: "shirts",
        localField: "_id",
        foreignField: "user_id",
        as: "shirts",
        pipeline: [

          { $sort: { _id: - 1 } }
        ],
      }
    },
    { $match: { _id: id } },
  ])
  // CLear null beta


  res.status(200).json(shuffle(usersProfile))
});

users.get('/office', async (req, res) => {

  let id = ObjectId(req.query._id)
  let usersProfile = await Users.aggregate([
    {
      $lookup: {
        from: "shirts",
        localField: "_id",
        foreignField: "user_id",
        as: "shirts",
        pipeline: [
          { $match: { permission: true } },
          { $sort: { _id: - 1 } }
        ],
      }
    },
    { $match: { _id: id } },
  ])
  // CLear null beta

  console.log(usersProfile)
  res.status(200).json(shuffle(usersProfile))
});



users.get('/address', async (req, res) => {
  let id = ObjectId(req.query._id);

  let addressR = await Users.aggregate([
    {
      $lookup: {
        from: "address",
        localField: "_id",
        foreignField: "user_id",
        as: "Address",
        pipeline: [
          { $sort: { _id: - 1 } }
        ],
      }

    },
    { $sort: { _id: -1 } },
    { $match: { _id: id } }

  ])
  // CLear null beta

  console.log(addressR)
  res.status(200).json(addressR)
});


users.post('/address', async (req, res, next) => {
  let id = ObjectId(req.body._id);

  let query = req.body;
  await Address.findOne(query).then((address) => {

    if (address) {
      res.status(200).json({ msg: "Address can't multiple data." })
      next
    } else {


      Address.insertMany([query])

      res.status(200).json({ msg: "เพิ่มข้อมูลสำเร็จ", type: true })
    }




  })
});



users.get('/youraddress', async (req, res, next) => {
  let id = ObjectId(req.query._id);
  console.log(req.query._id)
  let addressR = await Address.findOne({ user_id: id, youraddress: true })

  res.status(200).json(addressR)
});

users.delete('/address', async (req, res, next) => {
  let id = ObjectId(req.query._id);

  await Address.deleteOne({ _id: id }).then((address) => {

    res.status(200).json(address)

  })
});

users.put('/address', async (req, res, next) => {
  let id = ObjectId(req.body._id);
  let user_id = ObjectId(req.body.user_id);

  await Address.updateMany({ user_id: user_id }, { youraddress: false })

  await Address.updateOne({ _id: id }, { youraddress: true }).then((address) => {
    res.status(200).json(address)
  })
});


users.put('/changaddress', async (req, res, next) => {
  let id = ObjectId(req.body._id);
  let user_id = ObjectId(req.body.user_id);
  let address_id = ObjectId(req.body.address_id);
  let NewData = req.body;
  delete NewData.user_id
  delete NewData.address_id
  await Address.updateOne({ _id: address_id }, NewData).then((address) => {
    res.status(200).json(address)
  })
});


users.post('/changaddress', async (req, res, next) => {
  let id = ObjectId(req.body._id);
  let user_id = ObjectId(req.body.user_id);
  let address_id = ObjectId(req.body.address_id);
  let NewData = req.body;
  delete NewData.user_id
  delete NewData.address_id
  await Address.updateOne({ _id: address_id }, NewData).then((address) => {
    res.status(200).json(address)
  })
});


users.get('/user/:_id?', async (req, res, next) => {
  let id = ObjectId(req.params._id);
  console.log(req.params._id)
  let user = await Users.findOne({ _id: id })

  res.status(200).json(user)
});


users.post('/backend', async (req, res, next) => {
  try {
    let username = req.body.username;
    let password = req.body.password;

    let user = await Users.findOne({ email: username, password: password })
    console.log(user)
    if (user.email == "root") {
      res.status(200).send("login")
    } else {
      res.status(400).send("nonlogin")
    }
  } catch (err) {
    res.send(err)
  }



});
module.exports = users;
