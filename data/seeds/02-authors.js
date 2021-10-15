exports.seed = function(knex) {
  return knex('authors').truncate()
    .then(function () {
      return knex('authors').insert([
        {author: 'Homer', novel: 'The Odyssey'},
        {author: 'Sun Tzu', novel: 'The Art of War'},
        {author: 'Jane Austen', novel: 'Pride and Prejudice'},
        {author: 'Alexandre Dumas', novel: 'The Count of Monte Cristo'},
        {author: 'Fyodor Dostoevsky', novel: 'Crime and Punishment'},
        {author: 'Virginia Woolf', novel: 'Mrs Dalloway'},
      ]);
    });
}