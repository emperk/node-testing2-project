exports.up = async function(knex) {
  await knex.schema
    .createTable('authors', table => {
      table.increments('author_id')
      table.text('author').notNullable()
      table.text('novel').notNullable()
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('authors')
};
