var express = require('express');
var orders = express.Router();

const Bills = require('.././model/bills');
const Orders = require('.././model/orders');
const Payments = require('.././model/payments');

const Shirts = require('../model/shirts');
var ObjectId = require('mongoose').Types.ObjectId;
orders.get('/yourorders/:_id?', async (req, res) => {
    try {
        const user_id = ObjectId(req.params._id)
        const Order = await Orders.aggregate([
            {
                $lookup:
                {
                    from: 'bills',
                    localField: 'bill_id',
                    foreignField: '_id',
                    as: 'Bill',
                    pipeline: [
                        {
                            $lookup:

                            {
                                from: 'shirts',
                                localField: 'shirts.shirt_id',
                                foreignField: '_id',
                                as: 'Shirts',
                            }
                        }

                    ],

                }
            }, { $match: { user_id: user_id } }, { $sort: { _id: -1 } }
        ])
        console.log(Order)
        res.json(Order);


    } catch (err) {
    }
});

orders.get('/historybills/:_id?', async (req, res) => {
    try {
        const Order = await Orders.aggregate([
            {
                $lookup:
                {
                    from: 'bills',
                    localField: 'bill_id',
                    foreignField: '_id',
                    as: 'Bill'
                }
            },
        ])
        console.log(Order)
        res.json(Order);

    } catch (err) {
    }
});



orders.delete('/drop/:_id?', async (req, res, next) => {
    let _id = new ObjectId(req.params._id);

    Orders.findOneAndDelete({ _id: _id }, async function (err, order) {
        if (err) throw err;


        await Bills.deleteOne({ _id: order.bill_id }).then((bill) => {

            return res.send("Drop order and bill finished.")
        })

    });

});


orders.get('/yourhistorybills/:_id?', async (req, res) => {
    try {
        let id = ObjectId(req.params._id)
        const Order = await Orders.aggregate([
            {
                $lookup:
                {
                    from: 'bills',
                    localField: 'bill_id',
                    foreignField: '_id',
                    as: 'Bill',
                    pipeline: [
                        {
                            $lookup:
                            {
                                from: 'shirts',
                                localField: 'shirts.shirt_id',
                                foreignField: '_id',
                                as: 'Shirts',
                                pipeline: [
                                    {
                                        $project: {
                                            "shirt_path.edit_front": 0
                                        },
                                    }, {
                                        $lookup:
                                        {
                                            from: 'users',
                                            localField: "user_id",
                                            foreignField: '_id',
                                            as: 'User',
                                            pipeline: [
                                                {
                                                    $project: {
                                                        "shirt_path.edit_front": 0
                                                    }
                                                }
                                            ],
                                        },
                                    }
                                ],
                            },
                        }
                    ],
                },

            }, { $match: { user_id: id } }, {
                $sort: { _id: -1 }
            }

        ]);
        console.log(Order)
        res.json(Order);
    } catch (err) { }

});

orders.get('/yourcredits/:_id?', async (req, res) => {

    try {
        let id = ObjectId(req.params._id)
        const bill = await Bills.aggregate([
            {
                $lookup:
                {
                    from: 'orders',
                    localField: '_id',
                    foreignField: 'bill_id',
                    as: 'Orders',

                }
            }, {
                $match: {
                    "shirts.own_id": id
                }
            }, {
                $sort: { _id: - 1 }
            }

        ]);


        for (let i in bill) {

            for (let c in bill[i].shirts) {

                if (bill[i].shirts[c].own_id != req.params._id) {
                    delete bill[i].shirts[c]
                }


            }
            if (bill[i].Orders[0]) {
                if (bill[i].Orders[0].state != "ผ่าน") {
                    delete bill[i]
                }
            }
        }

        res.json(bill);

    } catch (err) {

        console.log(err)
    }


});


// เปลี่ยนสถานะการชำระเงิน
orders.post('/state', async (req, res) => {
    let id = ObjectId(req.body.order_id)

    const order = await Orders.findOneAndUpdate({ _id: id }, { state: req.body.state });

    const bill = await Bills.findOne({ _id: order.bill_id });
    let money = 0
    if (req.body.state == "ผ่าน") {
        for (let i in bill.shirts) {
            console.log(bill.shirts[i].price * bill.shirts[i].count);
            money = 30 * bill.shirts[i].count
            console.log(money);


            let myobj = {
                AllMoney: money,
                storeMoney: money,
                Bank: null,
            };
            await Shirts.findOne({ _id: bill.shirts[i].shirt_id }).then((shirt) => {
                Payments.findOne({ user_id: shirt.user_id }).then((payment) => {
                    if (payment) {
                        myobj["AllMoney"] = payment.AllMoney + myobj.AllMoney
                        myobj["storeMoney"] = payment.storeMoney + myobj.storeMoney
                        Payments.updateOne({ _id: payment._id }, myobj).then((slipt) => {

                        })
                    } else {
                        myobj["user_id"] = shirt.user_id;
                        Payments.create(myobj).then((slipt) => {

                        })

                    }

                });
            });
        }
    }



    res.send("Success")



    //* มีปัญหา
    let update = { state: req.body.state }



});


orders.get('/bills', async (req, res) => {

    const Order = await Orders.aggregate([
        {
            $lookup:
            {
                from: 'bills',
                localField: 'bill_id',
                foreignField: '_id',
                as: 'Bill',
                pipeline: [
                    {
                        $lookup:
                        {
                            from: 'shirts',
                            localField: 'shirts.shirt_id',
                            foreignField: '_id',
                            as: 'Shirts',
                            pipeline: [
                                {
                                    $project: {
                                        "shirt_path.edit_front": 0
                                    },
                                }, {
                                    $lookup:
                                    {
                                        from: 'users',
                                        localField: "user_id",
                                        foreignField: '_id',
                                        as: 'User',
                                        pipeline: [
                                            {
                                                $project: {
                                                    "shirt_path.edit_front": 0
                                                }
                                            }
                                        ],
                                    },
                                }
                            ],
                        },
                    }
                ],
            },

        }, {
            $sort: { _id: -1 }
        }, {
            $limit: 20
        }

    ]);
    console.log(Order)
    res.json(Order);
});

module.exports = orders;