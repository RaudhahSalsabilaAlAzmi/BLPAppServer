const request = require('supertest'); 
const app = require('../app'); //import app.js buat manggil endpoint
const {mongoConnect, mongoDisconnect} = require('../middleware/dbCoonect')

beforeAll(async () => {
    await mongoConnect();
});
  
  afterAll(async () => {
    await mongoDisconnect();
});

//testing endpoint register
describe('Test POST /api/auth/register', () => {
    test('should respond with 201 Created for a valid registration', async () => {
        const userData = {
            username: 'rondhell',
            email: "rondhell@gmail.com",
            password: 'lalalala',
        };

        const response = await request(app)
            .post('/api/auth/register')
            .send(userData)
            .expect(201)
            .expect('Content-Type', /json/);

    });

    test('should respond with 500 Internal Server Error for a duplicate data registration', async () => {
        const userData = {
            username: 'rondhell',
            email: "rondhell@gmail.com",
            password: 'lalalala',
        };

        const response = await request(app)
            .post('/api/auth/register')
            .send(userData)
            .expect(500)

    });

    test('should respond with 403 Forbidden for an invalid registration', async () => {
        const userData = {
            username: 'rondhell',
            email: "rondhell@gmail.com"
        };

        const response = await request(app)
            .post('/api/auth/register')
            .send(userData)
            .expect(403)

    });
});

//testing endpoint login
describe('Test POST /api/auth/login', () => {
    test('should respond with 200 OK for valid login', async () => { 
        const loginData = {
            username: "rondhell",
            password: "lalalala",
        };

        const response = await request(app)
            .post('/api/auth/login')
            .send(loginData)
            .expect('Content-Type', /json/)
            .expect(200);
    });

    test('should respond with 400 Bad Request for invalid password', async () => { 
        const loginData = {
            username: "rondhell",
            password: "12313",
        };

        const response = await request(app)
            .post('/api/auth/login')
            .send(loginData)
            .expect(400);
    });

    test('should respond with 404 Not Found for invalid username', async () => { 
        const loginData = {
            username: "12313",
            password: "lalalala",
        };

        const response = await request(app)
            .post('/api/auth/login')
            .send(loginData)
            .expect(404);
    });
});

//test case endpoint transaksi
describe('Test GET /api/transaksi', () => {
    test('should respond with 200 success OK', async () => { 
        const response = await request(app)
        .get('/api/transaksi')
        .expect('Content-Type', /json/)
        .expect(200);
    });
});

describe('Test POST /api/transaksi/new', () => {
    test('should respond with 201 Created for a valid transaksi', async () => {
        const userData = {
            saldo: [
                { 
                    id_rekening: 4,
                    nama: "rondhell"
                }
            ],
            jenis_transaksi: "Debit",
            nominal: 100
        };

        const response = await request(app)
            .post('/api/transaksi/new')
            .send(userData)
            .expect(201)
            .expect('Content-Type', /json/);

    });

    test('should respond with 500 Internal Server Error for an invalid transaksi', async () => {
        const userData = {
            saldo: [
                { 
                    id_rekening: 4,
                    nama: "rondhell"
                }
            ],
            jenis_transaksi: "Debit",
            nominal: null
        };

        const response = await request(app)
            .post('/api/transaksi/new')
            .send(userData)
            .expect(500)

    });

});

describe('Test DELETE /api/transaksi/delete/:id', () => {
    test('should respond with 200 success OK', async () => { 
        const transactionId = '653525bafbd7d85c9c642033'; // Replace with the actual ID of the transaction to delete

        const response = await request(app)
            .delete(`/api/transaksi/delete/${transactionId}`)
            .expect(200)
    });

    test('should respond with 403 Forbidden for gatau mau beli truk', async () => { 
        const transactionId = '653525bafbd7d85c9c642033'; // Replace with the actual ID of the transaction to delete

        const response = await request(app)
            .delete(`/api/transaksi/delete/${transactionId}`)
            .expect(403)
    });
});

describe('Test PUT /api/transaksi/update/:id', () => {
    test('should respond with 200 success', async () => { 
        const transactionId = '6536634ca856119e695c28b8'; // Replace with the actual ID of the transaction to update
        const updatedData = {
            jenis_transaksi: "kredit",
            nama: "rondhell"
        };

        const response = await request(app)
            .put(`/api/transaksi/update/${transactionId}`)
            .send(updatedData)
            .expect('Content-Type', /json/)
            .expect(200);
    });

    test('should respond with 403 forbiden', async () => { 
        const transactionId = '6536634ca856119e695c28b8'; // Replace with the actual ID of the transaction to update
        const updatedData = {
            jenis_transaksi: "wew",
            nama: "rondhell"
        };

        const response = await request(app)
            .put(`/api/transaksi/update/${transactionId}`)
            .send(updatedData)
            .expect(403);
    });
});

//test case search (by id)
describe('Test GET /api/transaksi/:id', () => {
    test('should respond with 200 success', async () => { 
        const transactionId = '6522a838f9653f71260cdbbe';
        const response = await request(app)
        .get(`/api/transaksi/${transactionId}`)
        .expect('Content-Type', /json/)
        .expect(200);
    });

    test('should respond with 500 Internal Server Error', async () => { 
        const transactionId = '6522a838f9653f71260cdbbe';
        const response = await request(app)
        .get(`/api/transaksi/${transactionId}`)
        .expect(500);
    });
});

//test case endpoint saldo
describe('Test POST /api/saldo/add', () => {
    test('should respond with 201 Created for a valid new saldo', async () => {
        const userData = {
            id_rekening: 2,
            nama: "rondhell",
            current_saldo: 10000
        };

        const response = await request(app)
            .post('/api/saldo/add')
            .send(userData)
            .expect(201)
            .expect('Content-Type', /json/);
        
    });
});

describe('Test GET /api/saldo', () => {
    test('should respond with 200 success', async () => { 
        const response = await request(app)
        .get('/api/saldo')
        .expect('Content-Type', /json/)
        .expect(200);
    });
});