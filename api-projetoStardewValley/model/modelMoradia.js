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
            allowNull:false
        },
        descricao:{
            type:Sequelize.STRING(255),
            allowNull:false
        },
        img:{
            type:Sequelize.STRING(20),
            allowNull:false
        }
    }
);

module.exports = modelMoradia;