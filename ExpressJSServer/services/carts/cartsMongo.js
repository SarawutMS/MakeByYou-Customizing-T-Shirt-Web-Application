var express = require('express');
var carts = express.Router();

const Carts = require('.././model/carts');
const Bills = require('.././model/bills');
const Orders = require('.././model/orders');
const ShirtsM = require('.././model/shirts');

var ObjectId = require('mongoose').Types.ObjectId;
carts.get('/storecarts/:_id', async (req, res) => {

    let id = ObjectId(req.params._id)

    let cartsR = await Carts.aggregate([
        {
            $lookup:
            {
                from: 'shirts',
                localField: 'shirt.shirt_id',
                foreignField: '_id',
                as: 'shirt_'
            }
        },

        { $match: { user_id: id } }
    ])

    res.status(200).json(cartsR)
});

carts.post('/storecarts', async (req, res) => {
    console.log(req.body.cartSide.size)
    let price = { XS: 289, S: 289, M: 289, L: 309, XL: 359 };

    if (req.body.cartSide.color == 'rgb(28, 28, 28)') {
        price = { XS: 489, S: 489, M: 489, L: 509, XL: 589 }
    }
    try {


    }
    catch (err) {
        console.log(err)
    } finally {
      
        let query = {
            //  _id:local
            user_id: new ObjectId(req.body.own_user._id),
            shirt: { shirt_id: new ObjectId(req.body.cartSide.shirt_id), size: req.body.cartSide.size },
            price: price[req.body.cartSide.size],
            shirtPrice: req.body.cartSide.priceShirt

        }
        console.log(query)
        await Carts.findOne(query).then((cart) => {

            //add
            if (!cart) {
                query[`count`] = req.body.cartSide.count;
                let result = Carts.insertMany([query])
                return res.json(result)
            }
            //update


            else {
                Carts.updateOne(query, { count: req.body.cartSide.count }, function (err, data) {
                    if (err) throw err;
                    console.log("1 document updated");
                    return res.send(`updatec`)
                });
            }
        });

    }





});

carts.put('/update/:_id?', async (req, res) => {
    Carts.updateOne({ _id: ObjectId(req.params._id) }, { count: req.body.count }, function (err, data) {
        if (err) throw err;

        return res.send(`update`)
    });



});

carts.delete('/drop/:_id?', async (req, res, next) => {
    let _id = new ObjectId(req.params._id);
    Carts.deleteOne({ _id: _id }, function (err, data) {
        if (err) throw err;
        console.log("1 document updated");
        return res.send(data)
    });

});



carts.post('/createOrders', async (req, res) => {
    const date = new Date();



    const dateTime = date.toLocaleString("en-GB").split(",");
    let query = {
        user_id: ObjectId(req.body.user_id)
    }
    try {
        await Carts.find(query).then(async (carts) => {

            let Shirts = [];

            for (let i in carts) {

                let owe_id = await ShirtsM.findOne({ _id: carts[i].shirt.shirt_id });
                Shirts[i] = {
                    shirt_id: carts[i].shirt.shirt_id,
                    size: carts[i].shirt.size,
                    cart_id: carts[i]._id,
                    count: carts[i].count,
                    price: carts[i].price,
                    shirtPrice: carts[i].shirtPrice,
                    own_id: owe_id.user_id,
                }
            }

            if (carts.length != 0) {
                let bill = await Bills.insertMany({ user_id: carts[0].user_id, shirts: Shirts })
                Orders.insertMany({
                    user_id: bill[0].user_id,
                    bill_id: bill[0]._id,
                    address_id: ObjectId(req.body.address_id),
                    date: dateTime[0],
                    time: dateTime[1]
                })
            } else {
                res.json({ msg: "Carts is empty" })
            }
        });
    } catch (err) {
        console.log(err)
    } finally {


        await Carts.deleteMany(query).then((carts) => {
            res.json({ msg: "Order created." })
        });
    }




});
module.exports = carts;
