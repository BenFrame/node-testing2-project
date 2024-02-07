const db = require('../../data/dbConfig')

module.exports = {
    
    getAll,
    getById,
    insert
  }

function getAll() {
    return db('cars')
}

function getById(id) {
    return db('cars')
    .where('id', id)
    .first()
}

async function insert(car){
    return await db('cars').insert(car).then(([id]) => {
        return db('cars').where('id', id).first()
    })
}
