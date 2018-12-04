var pgp = require('pg-promise')();

const dbConfig = {
    host: 'localhost',
    port: 5432,
    database: 'cureview',
    user: 'Blythe',
    password: ''
};

var db = pgp(dbConfig);

module.exports = db;