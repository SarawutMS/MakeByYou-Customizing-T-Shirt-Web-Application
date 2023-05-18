const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const date = new Date();


const dateTime = date.toLocaleString("en-GB").split(",");



const creditSchema = new Schema({
    credit_card: String,
    newwallet:Number,
    hiswallet:Number,
    user_id: String,
    date: { type: String, default: dateTime[0] },
    time: { type: String, default: dateTime[1] },
},
    {
        collection: 'credits',
        versionKey: false
    },

);

const CreditsModel = mongoose.model('credits', creditSchema);

module.exports = CreditsModel;