const Sequelize = require('sequelize');

const connection = require('../database/database');

const modelMoradia = connection.define(
    'tbl_moradia',
    {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        moradia:{
            type:Sequelize.STRING(40),
            allowNull:true
        },
        descricao:{
            type:Sequelize.STRING(255),
            allowNull:true
        }
    }
);

// modelMoradia.sync({force:true});

module.exports = modelMoradia;