// import Saldo from "../models/saldo.model.js"
// import Transaksi from "../models/transaksi.model.js"
// import createError from "../utils/CreateError.js"

const Saldo = require('../models/saldo.model.js');
const Transaksi = require('../models/transaksi.model.js');
const createError = require('../utils/CreateError.js');

const newTransaksi = async (req, res, next) => {
    try {
        const saldo = await Saldo.findOne({id_rekening: req.body.saldo[0].id_rekening})

        console.log(saldo)

        const bodyTransaksi = req.body.jenis_transaksi
        const bodyTransaksiLowerCase = bodyTransaksi.toLowerCase()
        console.log(bodyTransaksiLowerCase)

        const saldoIds = await Promise.all(req.body.saldo.map(async (e) => {
            if (saldo) {
                let updatedSaldo
                if (bodyTransaksiLowerCase === 'debit') {
                    updatedSaldo = await Saldo.findByIdAndUpdate(saldo._id, {
                        current_saldo: saldo.current_saldo + Number(req.body.nominal)
                    }, {
                        new: true,
                    });
                } else if (bodyTransaksiLowerCase === 'kredit') {
                    updatedSaldo = await Saldo.findByIdAndUpdate(saldo._id, {
                        current_saldo: saldo.current_saldo - Number(req.body.nominal)
                    }, {
                        new: true,
                    });
                }
                console.log(updatedSaldo)
        
                if (!updatedSaldo) return next(createError(403, "Saldo cannot be updated"));

                return saldo._id
            }
            else {
                console.log(req.body.nama)
                const newSaldo = new Saldo({
                    id_rekening: e.id_rekening,
                    nama: req.body.saldo[0].nama,
                    current_saldo: req.body.nominal
                });

                console.log(newSaldo)
    
                await newSaldo.save();
    
                return newSaldo._id;
            }
        }));

        const newTransaksi = new Transaksi({
            saldo: saldoIds,
            jenis_transaksi: bodyTransaksiLowerCase,
            nominal: req.body.nominal,
        });
        const savedTransaksi = await newTransaksi.save();

        res.status(201).json(savedTransaksi);
    } catch (error) {
        next(error)
    }
}

const getAllTransaksi = async (req, res, next) => {
    try {
        const getTraksaksi = await Transaksi.find().populate('saldo').sort('-tanggal_transaksi');

        if(!getTraksaksi) return next(createError(404, "Transaksi not found!"));

        res.status(200).json(getTraksaksi);
    } catch (error) {
        next(error)
    }
}

const getOneTransaksi = async (req, res, next) => {
    try {
        const getTraksaksi = await Transaksi.findById(req.params.id).populate('saldo');

        if(!getTraksaksi) next(createError(404, "Transaksi not found!"));

        res.status(200).json(getTraksaksi);
    } catch (error) {
        next(error)
    }
}

const updateTransaksi = async (req, res, next) => {
    try {
        const bodyTransaksi = req.body.jenis_transaksi
        const bodyTransaksiLowerCase = bodyTransaksi.toLowerCase()
        console.log(bodyTransaksiLowerCase)
        const getTransaksi = await Transaksi.findById(req.params.id);
        if (!getTransaksi) return res.status(404).json("Transaksi not found!")

        const ids = getTransaksi.saldo[0]

        console.log(bodyTransaksiLowerCase)

        if (bodyTransaksiLowerCase !== 'kredit' && bodyTransaksiLowerCase !== 'debit') {
            return res.status(403).send("Jenis Transaksi should be kredit or debit")
        }

        const updatedTransaksi = await Transaksi.findByIdAndUpdate(req.params.id, {
            saldo: ids._id,
            jenis_transaksi: bodyTransaksiLowerCase,
            nominal: ids.current_saldo,
        }, {
            new: true
        })

        if (!updatedTransaksi) return res.status(403).json("Transaksi can not be updated!")

        res.status(200).json(updatedTransaksi)
    } catch (error) {
        next(error)
    }
}

const deleteTransaksi = async (req, res, next) => {
    try {
        const deletedTransaksi = await Transaksi.findByIdAndDelete(req.params.id)

        if(!deletedTransaksi) return next(createError(403, "Con not delete transaksi!"))

        res.status(200).send("Transaksis successfully deleted!")
    } catch (error) {
        next(error)
    }
}

module.exports = {
    newTransaksi,
    getAllTransaksi,
    getOneTransaksi,
    updateTransaksi,
    deleteTransaksi
}