var express = require('express');
var payments = express.Router();

const Bills = require('.././model/bills');
const Orders = require('.././model/orders');

const Payments = require('.././model/payments');





var ObjectId = require('mongoose').Types.ObjectId;
payments.get('/payments/:_id?', async (req, res) => {

    try {
        const user_id = ObjectId(req.params._id)
        const payments = await Payments.findOne({ user_id: user_id })

        console.log(payments)
        res.json(payments);
    } catch (err) {

    }

});


payments.get('/paymentB', async (req, res) => {

    try {

        const payments = await Payments.aggregate([
            {
                $lookup:
                {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'User',

                }

            }, {
                $sort: { date: - 1, time: -1 }
            }, {
                $limit: 40
            }

        ]);


        console.log(payments)
        res.json(payments);
    } catch (err) {

    }

});


payments.post('/updatepayments', async (req, res) => {

    try {
        const date = new Date();



        const dateTime = date.toLocaleString("en-GB").split(",");


        const user_id = ObjectId(req.body.user_id)
        const payments = await Payments.findOne({ user_id: user_id })
        if (payments) {
            await Payments.updateOne({ user_id: user_id }, { Bank: req.body, data: dateTime[0], time: dateTime[1] })
        }
        res.json(payments);
    } catch (err) {

    }

});
payments.post('/UpdatePayment', async (req, res) => {

    try {
        const date = new Date();



        const dateTime = date.toLocaleString("en-GB").split(",");


        const payment_id = ObjectId(req.body.payment_id)
        const payments = await Payments.findOne({ _id: payment_id })
        console.log(req.body)
        if (payments) {

            if (req.body.state == "success") {
                payments.OwnMoney += payments.Bank.countmoney;
                payments.storeMoney -= payments.Bank.countmoney;
            }
           
            await Payments.updateOne({ _id: payment_id }, { Bank: null,time: dateTime[0], time: dateTime[1], OwnMoney: payments.OwnMoney, storeMoney: payments.storeMoney })
        }

        res.json(payments);
    } catch (err) {
        console.log(err)

    }

});


module.exports = payments;