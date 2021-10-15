const knex = require('knex');
const configuratons = require('../knexfile');
const environment = process.env.DB_ENV || 'development';

module.exports = knex(configuratons[environment]);