const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const initialUsers = [
    {
        username: "user1",
        name: "Pekka",
        passwordHash: "123"

    }]

beforeEach(async () => {
    await User.deleteMany({})

    let userObj = new User(initialUsers[0])
    await userObj.save()
})

test('users are returned as json', async () => {
    await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there is 1 user', async () => {
    const response = await api.get('/api/users')

    expect(response.body).toHaveLength(initialUsers.length)
})

test('username or password invalid', async () => {
    
    const user = new User({
        username: "1",
        name: "Pekka",
        passwordHash: "123"
    })
    await api
        .post('/api/users')
        .send(user)
        .expect(400)

    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(initialNotes.length)

})

test('user id is defined', async () => {
    const response = await api.get('/api/users')
    expect(response.body[0].id).toBeDefined()
})

afterAll(() => {
    mongoose.connection.close()
})
