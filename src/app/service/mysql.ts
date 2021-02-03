const dbConfig = require('../configuration/mysql-config');
const mysql = require('serverless-mysql')({
    config: dbConfig
});
module.exports = mysql;
