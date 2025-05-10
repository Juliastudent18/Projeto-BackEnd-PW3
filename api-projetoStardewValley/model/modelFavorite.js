const Sequelize = require('sequelize');

const connection = require('../database/database');

const modelFavorite = connection.define(
    'tbl_personagens',
    {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        nome:{
            type:Sequelize.STRING(40),
            allowNull:false
        },
        descricao:{
            type:Sequelize.STRING(255),
            allowNull:false
        }
    }
);

// modelFavorite.sync({force:true});

module.exports = modelFavorite;