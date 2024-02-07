const db = require('../../data/dbConfig')
const Car = require('./cars-model')

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db.seed.run()
})

test('environment is testing', () => {
    expect(process.env.NODE_ENV).toBe('testing')
})

test('gets all cars', async () => {
    const cars = await Car.getAll()
    expect(cars).toBeDefined()
})

test('gets cars by id')


