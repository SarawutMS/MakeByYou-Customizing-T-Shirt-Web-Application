const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const addressSchema = new Schema({

    line1: String,
    line2: String,
    zip: String,
    phonenumber: Number,
    user_id: ObjectId,
    youraddress: { type: Boolean, default: false }


},
    {
        collection: 'address',
        versionKey: false 
    },

);

const AddressModel = mongoose.model('address', addressSchema);
module.exports = AddressModel;