const express = require('express') ;

const Cars = require('./cars/cars-model') ;

const server = express() ; 

server.use(express.json()) ; 

server.get('/', (req, res ) => {
    res.status(200).json({api:'up'})
})

server.get("/cars", (req, res) => {
    Cars.getAll()
      .then(cars => {
        res.status(200).json(cars);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

  server.post('/cars', async (req, res) => {
    let thing = await Cars.insert(req.body);
    res.status(201).json(thing)
  })

  module.exports = server