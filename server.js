const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Sanity Check')
})

server.get('/accounts', (req, res) => {
    db('accounts')
        .then(accounts => {
            res.status(200).json(accounts)
        })
        .catch(error => {
            res.json({ error: 'Could not load accounts'})
        })
})

module.exports = server;