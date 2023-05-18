const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const date = new Date();



const dateTime = date.toLocaleString("en-GB").split(",");

const ordersSchema = new Schema({
    state: { type: String, default: "ยังไม่ผ่าน" },
    bill_id: ObjectId,
    date: { type: String, default: dateTime[0] },
    time: { type: String, default: dateTime[1] },
    user_id: ObjectId,
    address_id: ObjectId,

},
    {
        collection: 'orders',
        versionKey: false
    },

);

const OrdersModel = mongoose.model('orders', ordersSchema);

module.exports = OrdersModel;