const db = require('../../data/db-config');

async function createAuthor(author) {
  const [id] = await db('authors').insert(author)
  return db('authors').where('author_id', id).first()
}

async function deleteAuthor(id) {
  const author = await db('authors').where('author_id', id).first()
  await db('authors').where('author_id', id).del()
  return author
}

module.exports = {
  createAuthor,
  deleteAuthor
}