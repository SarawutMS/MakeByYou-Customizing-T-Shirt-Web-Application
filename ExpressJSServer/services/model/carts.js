const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const cartsSchema = new Schema({

    user_id: ObjectId,
    shirt: { shirt_id: ObjectId, size: String },
    count: Number,
    price: Number, shirtPrice: Number
},
    {
        collection: 'carts',
        versionKey: false
    },

);

const CartsModel = mongoose.model('carts', cartsSchema);

module.exports = CartsModel;