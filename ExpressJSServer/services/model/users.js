const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UsersSchema = new Schema({
    email: String,
    name: String,
    last_name: String,
    password: String
},
    {
        collection: 'users',
        versionKey: false
    },

);




const UsersModel = mongoose.model("users", UsersSchema);

module.exports = UsersModel ;


