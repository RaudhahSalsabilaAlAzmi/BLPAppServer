// import express from 'express';
// import { addSaldo, deleteSaldoWithTransactions, getAllSaldo } from '../controllers/saldo.controller.js';

const express = require('express');
const { addSaldo, deleteSaldoWithTransactions, getAllSaldo } = require('../controllers/saldo.controller.js');

const router = express.Router();

router.post('/add', addSaldo);
router.get('/', getAllSaldo);
router.delete('/delete/:id', deleteSaldoWithTransactions);

module.exports = router