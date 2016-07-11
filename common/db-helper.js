/**
 * Created by yangxun on 16/7/6.
 */
var Sequelize = require('Sequelize'),
    DB = require('../config/config').mysql;

var sequelize = new Sequelize(DB.database, DB.username, DB.password, DB.config
    // SQLite only
    //storage: 'path/to/database.sqlite'
);

sequelize
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });


module.exports = sequelize;