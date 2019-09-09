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

server.get('/accounts/:id', (req, res) => {
    const {id} = req.params
    
    db('accounts')
        .where({ id })
        .first()
        .then(accounts => {
            res.status(200).json(accounts)
        })
        .catch(error => {
            res.json({ error: 'Could not load accounts'})
        })
})

server.post('/accounts', (req, res) => {
    const accountBody = req.body;

    if(accountBody.name && accountBody.budget){
        db('accounts')
        .insert(accountBody, 'id')
        .then(([id]) => {
            db('accounts')
            .where({ id })
            .first()
            .then(accounts => {
                res.status(200).json(accounts)
            })
        })
        .catch(error => {
            res.json({ error: 'Could not load accounts'})
        })
    } else {
        return res.status(400).json({ message: "Name and budget are required" })
    }
    
})

server.put('/accounts/:id', (req, res) => {
    const accountBody = req.body
 

    db('accounts')
        .where('id', req.params.id)
        .update(accountBody)
        .then(count => {
            res.status(200).json({ message: `updated ${count} record` })
        })
        .catch(error => {
            res.json(error).json({ error: "Could not update account" })
        })
})

server.delete('/accounts/:id', (req, res) => {
    
    db('accounts')
        .where('id', req.params.id)
        .del()
        .then(count => {
            res.status(200).json({ message: `updated ${count} record` })
        })
        .catch(error => {
            res.json(error).json({ error: "Could not delete account" })
        })
})



module.exports = server;