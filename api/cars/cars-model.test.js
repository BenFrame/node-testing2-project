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

test('gets cars by id', async () => {
    const carId = 1
    const car = await Car.getById(carId)
    expect(car).toBeDefined()
    expect(car.id).toBe(carId)
})

describe('insert', () => {
    const porsche = {make: 'porsche'}
    test('resolves the newly created car', async () => {
        const result = await Car.insert(porsche)
        expect(result).toMatchObject(porsche)
    })
    test('adds new car to the car table', async () => {
        await Car.insert(porsche)
        const records = await db('cars')
        expect(records).toHaveLength(5)
    })
})
describe('delete', () => {
    test('succesfully deletes a car', async () => {
        await Car.remove(4);
        const remainingCars = await db('cars');
        expect(remainingCars).toHaveLength(3);
       }) 
})


