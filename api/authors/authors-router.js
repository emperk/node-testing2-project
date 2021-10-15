const express = require('express');
const router = express.Router();
const Author = require('../authors/authors-model');

router.delete('/:id', async (req, res) => {
  const id = req.params.id
  const delAuthor = await Author.deleteAuthor(id)
  res.status(200).json(delAuthor)
})

module.exports = router;