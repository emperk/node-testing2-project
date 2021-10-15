const request = require('supertest')
const db = require('../../data/db-config')
const server = require('../server')
const Author = require('../authors/authors-model')

const authorOne = {author: 'Charles Dickens', novel: 'A Tale of Two Cities'}
const authorTwo = {author: 'Agatha Christie', novel: 'Murder on the Orient Express'}

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => {
  await db('authors').truncate()
})

afterAll(async () => {
  await db.destroy()
})

it('correct env var', () => {
  expect(process.env.DB_ENV).toBe('testing')
})

describe('Authors model functions', () => {
  describe('create author', () => {
    it('adds author to the db', async () => {
      let authors
      await Author.createAuthor(authorOne)
      authors = await db('authors')
      expect(authors).toHaveLength(1)

      await Author.createAuthor(authorTwo)
      authors = await db('authors')
      expect(authors).toHaveLength(2)
    })
    it('inserted author and novel', async () => {
      const author = await Author.createAuthor(authorOne)
      expect(author).toMatchObject({author_id: 1, ...author})
    })
  })
  describe('[DELETE] - deletes author', () => {
    it('removes author from db', async () => {
      const [author_id] = await db('authors').insert(authorOne)
      let author = await db('authors').where({author_id}).first()
      expect(author).toBeTruthy()
      await request(server).delete('/authors/'+ author_id)
      author = await db('authors').where({author_id}).first()
      expect(author).toBeTruthy()
    })
    it('respond with the deleted author', async () => {
      await db('authors').insert(authorOne)
      let author = await request(server).delete('/authors/1')
      expect(author.body).toMatchObject(authorOne)
    })
  })
})