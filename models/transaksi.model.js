// import mongoose from "mongoose";
const mongoose = require('mongoose');
const { Schema } = mongoose;

const transaksiSchema = new Schema({
    saldo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Saldo', // Reference to the 'Saldo' model
        required: true,
    }],
    tanggal_transaksi: {
        type: Date,
        default: Date.now
    },
    jenis_transaksi: {
        type: String,
        required: true,
    },
    nominal: {
        type: Number,
        required: true,
    },
})

transaksiSchema.virtual('id_transaksi').get(function () {
    return this._id.toHexString()
})

transaksiSchema.set('toJSON', {
    virtuals: true
})

// export default mongoose.model('Transaksi', transaksiSchema)
module.exports = mongoose.model('Transaksi', transaksiSchema)