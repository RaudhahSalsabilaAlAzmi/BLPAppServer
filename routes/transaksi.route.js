// import express from 'express';
// import { deleteTransaksi, getAllTransaksi, getOneTransaksi, newTransaksi, updateTransaksi } from '../controllers/transaksi.controller.js';

const express = require('express');
const { deleteTransaksi, getAllTransaksi, getOneTransaksi, newTransaksi, updateTransaksi } = require('../controllers/transaksi.controller.js');

const router = express.Router();

router.post('/new', newTransaksi);
router.get('/', getAllTransaksi);
router.get('/:id', getOneTransaksi);
router.put('/update/:id', updateTransaksi);
router.delete('/delete/:id', deleteTransaksi);

module.exports = router