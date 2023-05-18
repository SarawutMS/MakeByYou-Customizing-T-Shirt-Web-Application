const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const shirtsSchema = new Schema({
    nameshirt_: String,
    shirt_path: { front: String, back: String, edit_front: String },
    detail: String,
    user_id: ObjectId,
    property: { _type: { type: String, default: "crew_" }, color: String },
    permission: { type: Boolean, default: false },
    shirtPrice: { type: Number, default: 0 }
},
    {
        collection: 'shirts',
        versionKey: false
    },

);

const ShirtsModel = mongoose.model('shirts', shirtsSchema);

module.exports = ShirtsModel;