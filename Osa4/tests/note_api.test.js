const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

const user = new User({
    username: "user1",
    name: "Pekka",
    passwordHash: "123"
})

const initialBlogs = [
    {
        name: "name1",
        author: "author1",
        url: "url1",
        likes: 1

    },
    {
        name: "name2",
        author: "author2",
        url: "url2",
        likes: 2

    }
]
beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObj = new Blog(initialBlogs[0])
    await blogObj.save()

    blogObj = new Blog(initialBlogs[1])
    await blogObj.save()
})

test('notes are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
})

test('a valid blog can be added ', async () => {
    const blog = {
        name: 'name',
        author: "author",
        url: "url",
        likes: 1
    }

    await api
        .post('/api/blogs')
        .send(blog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length + 1)
})

afterAll(() => {
    mongoose.connection.close()
})