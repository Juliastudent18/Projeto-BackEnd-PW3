const Sequelize = require('sequelize');

const connection = require('../database/database');

const modelMoradia = require('./modelMoradia');
const modelFavorite = require('./modelFavorite');

const modelCharacter = connection.define(
    'tbl_pessoa',
    {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        nome:{
            type: Sequelize.STRING(40),
            allowNull: false
        },
        descricao:{
            type:Sequelize.STRING(255),
            allowNull:true
        },
        moradia:{
            type:Sequelize.INTEGER,
            autoIncrement: false
        },
        data_nasc:{
            type:Sequelize.DATE,
            allowNull:true
        },
        fvrt_perso:{
            type:Sequelize.INTEGER,
            autoIncrement: false
        }
    }
);

modelFavorite.hasMany(modelCharacter, {
    foreignKey: 'fvrt_perso',
    sourceKey: 'id'
});

modelCharacter.belongsTo(modelFavorite, {
    foreignKey: 'id',
    sourceKey: 'fvrt_perso'
});

modelMoradia.hasMany(modelCharacter, {
    foreignKey: 'moradia',
    sourceKey: 'id'
});

modelCharacter.belongsTo(modelMoradia, {
    foreignKey: 'id',
    sourceKey: 'moradia'
});

// modeLivro.sync({force:true});

module.exports = modelCharacter;