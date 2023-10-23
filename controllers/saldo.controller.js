// import Saldo from "../models/saldo.model.js"
// import Transaksi from "../models/transaksi.model.js"
// import createError from "../utils/CreateError.js"

const Saldo = require('../models/saldo.model.js');
const Transaksi = require('../models/transaksi.model.js');
const createError = require('../utils/CreateError.js');

const addSaldo = async (req, res, next) => {
    try {
        if (!req.body.id_rekening || !req.body.current_saldo) return next(createError(403, "All inputs must be filled"))
        const newSaldo = new Saldo({
            ...req.body
        })

        if (!newSaldo) return next(createError(403, "Saldo can not be created!"));

        const savedSaldo = await newSaldo.save();

        res.status(201).json(savedSaldo);
    } catch (error) {
        next(error)
    }
}

const getAllSaldo = async (req, res, next) => {
    try {
        const getSaldo = await Saldo.find();

        if(!getSaldo) return next(createError(403, "Can not get saldo!"))

        res.status(200).json(getSaldo)
    } catch (error) {
        next(error)
    }
}


const deleteSaldoWithTransactions = async (req, res, next) => {
    try {
        // Find the saldo by its ID
        const saldo = await Saldo.findById(req.params.id);
    
        // Check if saldo exists
        if (!saldo) {
          return next(createError(404, "Saldo not found!"))
        }
    
        // Get the nomor_rekening of the saldo to find related transactions
        const nomorRekening = saldo.id_rekening;

        // console.log(nomorRekening)

        // console.log(await Transaksi.findOne({ nomor_rekening: nomorRekening }))

        await Saldo.findByIdAndDelete(req.params.id);
        // // Find and delete all transactions with matching nomor_rekening
        await Transaksi.findOneAndDelete({ id_rekening: nomorRekening });
    
        // Return a success message or any other information if needed
        res.status(200).send("Saldo and related transactions deleted successfully")
      } catch (error) {
        // Handle any errors that may occur during the deletion process
        console.error("Error deleting saldo and related transactions:", error.message);
        throw error;
      }
  }

module.exports = {
    addSaldo,
    getAllSaldo,
    deleteSaldoWithTransactions
}