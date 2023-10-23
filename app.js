const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const { fileURLToPath } = require('url');
const authRoute = require('./routes/auth.route.js');
const saldoRoute = require('./routes/saldo.route.js');
const transaksiRoute = require('./routes/transaksi.route.js');

const app = express();

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "https://todo-app-client-3q0ei4q6z-farkhan777.vercel.app", "http://192.168.127.182:5173"],
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(morgan('combined'));
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

// Routes
app.use('/api/auth', authRoute);
app.use('/api/saldo', saldoRoute);
app.use('/api/transaksi', transaksiRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong!';

  return res.status(errorStatus).send(errorMessage);
});

module.exports = app;
