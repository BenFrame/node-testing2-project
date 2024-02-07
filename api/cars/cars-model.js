const db = require('../../data/dbConfig')

module.exports = {
    
    getAll,
    getById,
    insert, 
    remove
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

function remove(id){
    return db('cars')
    .where({id})
    .del()
}
