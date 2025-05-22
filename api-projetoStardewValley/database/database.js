const Sequelize = require('sequelize');

const connection = new Sequelize(
    'db_projetoStardewValley',
    'root',
    'Nick145@',
    {
        host: 'localhost',
        port: '3306',
        dialect: 'mysql',
        timezone: '-03:00'
    }
);

module.exports = connection