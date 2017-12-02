var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs290_mcguckis',
    password: '3710',
    database: 'cs290_mcguckis',
});

module.exports = pool;