const Sequelize = require('sequelize');

module.exports = new Sequelize('heroku_a25aec331dd9283', 'ba4a3dec04d43d', '17b11576', {
    host: 'us-cdbr-iron-east-04.cleardb.net',
    dialect: 'mysql'
});

// module.exports = new Sequelize('capstone_test', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql'
// });
