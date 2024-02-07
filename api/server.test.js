const db = require('../data/dbConfig')
const request = require('supertest')
const server = require('./server')

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db.seed.run()
})

describe('[GET] /cars', () => {
    test('responds with 200 ok', async () => {
        const res = await request(server).get('/cars')
        expect(res.status).toBe(200)
    })
    test('responds with all the cars', async () => {
        const res = await request(server).get('/cars')
        expect(res.body).toHaveLength(4)
    })
})

describe('[POST] /cars', () => {
    const ferrari = {make: 'ferrari'}
    test('adds a car to the database', async () => {
        await request(server).post('/cars').send(ferrari)
        expect(await db('cars')).toHaveLength(5)
    })
    test('responds with the new car', async () =>{
        const res = await request(server).post('/cars').send(ferrari)
        expect(res.body).toMatchObject(ferrari)
    })
})