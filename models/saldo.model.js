// import mongoose from "mongoose";
const mongoose = require('mongoose');
const { Schema } = mongoose;

const saldoSchema = new Schema({
    id_rekening: {
        type: Number,
        required: true,
        unique: false,
    },
    nama: {
        type: String,
        required: false,
        default: ""
    },
    current_saldo: {
        type: Number,
        required: false,
        default: 0
    },
})

// export default mongoose.model('Saldo', saldoSchema)
module.exports = mongoose.model('Saldo', saldoSchema)