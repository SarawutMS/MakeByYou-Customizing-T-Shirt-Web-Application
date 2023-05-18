const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const date = new Date();



const dateTime = date.toLocaleString("en-GB").split(",");

const paymentsSchema = new Schema({
    user_id: ObjectId,
    AllMoney: Number,
    OwnMoney: { type: Number, default: 0 },
    storeMoney: Number,
    Bank: Object,
    date: { type: String, default: dateTime[0] },
    time: { type: String, default: dateTime[1] },
},
    {
        collection: 'payments',
        versionKey: false
    },

);

const PaymentsModel = mongoose.model('payments', paymentsSchema);

module.exports = PaymentsModel;