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
    likes: 1,
    id: 1

  },
  {
    name: "name2",
    author: "author2",
    url: "url2",
    likes: 2,
    id: 2

  }
]
beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObj = new Blog(initialBlogs[0])
  await blogObj.save()

  blogObj = new Blog(initialBlogs[1])
  await blogObj.save()
})

test('blogs are returned as json', async () => {
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
  // Breaks because token support is not implemented for test. 

  const blog = {
    name: 'name',
    author: "author",
    url: "url",
    likes: 1,
    user: user._id
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length + 1)
})

test('default likes value is 0', async () => {
  const blog = {
    name: 'name',
    author: "author",
    url: "url",
    user: user._id
  }
  await api
    .post('/api/blogs')
    .send(blog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  console.log('LIKES = 0,', response.body[0].likes)

  expect(response.body[initialBlogs + 2].likes).toBe(0)

})

test('id is defined', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})