/**
 * Created by yangxun on 16/7/6.
 */
var Sequelize = require('Sequelize');

var sequelize = new Sequelize('swallow', 'root', '88888888', {
    host: 'localhost',
    dialect: 'mysql',
    port: '3306',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    // SQLite only
    //storage: 'path/to/database.sqlite'
});

sequelize
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });


module.exports = sequelize;