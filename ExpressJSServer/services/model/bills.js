const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const billsSchema = new Schema({

    shirts: [{
        shirt_id: ObjectId,
        size: String,
        cart_id: ObjectId,
        own_id: ObjectId,
        price: Number,
        count: Number,
        shirtPrice:Number,
    }],
    user_id: ObjectId,
    payments:{type:Object,default:null},


},
    {
        collection: 'bills',
        versionKey: false
    },

);

const BillsModel = mongoose.model('bills', billsSchema);

module.exports = BillsModel;