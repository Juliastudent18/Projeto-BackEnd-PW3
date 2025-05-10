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
            allowNull:false
        },
        moradia:{
            type:Sequelize.INTEGER,
            autoIncrement: false
        },
        data_nasc:{
            type:Sequelize.DATEONLY,
            allowNull:false
        },
        fvrt_perso:{
            type:Sequelize.INTEGER,
            autoIncrement: false
        }
    }
);

modelFavorite.hasMany(modelCharacter, {
    foreignKey: 'fvrt_perso'
});

modelCharacter.belongsTo(modelFavorite, {
    foreignKey: 'fvrt_perso',
    targetKey: 'id'
});

modelMoradia.hasMany(modelCharacter, {
    foreignKey: 'moradia'
});

modelCharacter.belongsTo(modelMoradia, {
    foreignKey: 'moradia',
    targetKey: 'id'
});


// modeLivro.sync({force:true});

module.exports = modelCharacter;