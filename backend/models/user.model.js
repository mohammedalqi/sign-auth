const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
    namaLengkap:{
        type: String
    },
    nimNidn:{
        type: Number
    },
    email:{
        type: String
    },
    kataSandi:{
        type: String
    },
    resetPasswordLink: {
        data: String,
    }
})

module.exports = mongoose.model('User', userSchema);


