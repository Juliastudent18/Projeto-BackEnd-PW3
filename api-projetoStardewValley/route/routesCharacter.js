const express = require('express');
const Sequelize = require('sequelize');

const modelCharacter = require('../model/modelCharacter');
const modelMoradia = require('../model/modelMoradia');
const modelFavorite = require('../model/modelFavorite');

const router = express.Router();

router.get('/', (req, res)=>{

    return res.status(200).json({status:'TESTE DE CONEXÃO COM A API!'});

});

router.post('/inserirPessoa', (req, res)=>{

    let {nome, descricao, moradia, data_nasc, fvrt_perso} = req.body;

    modelCharacter.create(
        {
            nome, 
            descricao, 
            moradia, 
            data_nasc, 
            fvrt_perso
        }
    )
    .then(
        ()=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'PESSOA INSERIDA COM SUCESSO'
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO INSERIR A PESSOA',
                errorObject:error
            }
        );
    });
});

router.get('/listagemPessoas', (req, res)=>{

    modelCharacter.findAll({
        attributes: [
            'id',
            ['nome', 'character_nome'],
            'descricao',
            ['moradia', 'moradia_id'], 
            'data_nasc',
            ['fvrt_perso', 'favorite_id']
        ],
        include: [
            {
                model: modelFavorite,
                attributes: [
                    ['id', 'favorite_id'], 
                    ['nome', 'favorite_nome'], 
                    ['descricao', 'favorite_descricao'],
                    ['img', 'favorite_img']
                ],
                required: true
            },
            {
                model: modelMoradia,
                attributes: [
                    ['id', 'moradia_id'], 
                    ['moradia', 'moradia_nome'], 
                    ['descricao', 'moradia_descricao'],
                    ['img', 'favorite_img']
                ],
                required: true
            }
        ]
    })
    .then(
        (response)=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'PESSOAS LISTADAS COM SUCESSO',
                    data:response
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO LISTAR AS PESSOAS',
                errorObject:error
            }
        );
    });
});

router.get('/listagemPessoas/:id', (req, res)=>{

    let {id} = req.params;

    modelCharacter.findByPk(id, {
        include: [
            {
                association: modelCharacter.associations.tbl_moradium
            },
            {
                association: modelCharacter.associations.tbl_personagen
            }
        ]
    }).then(
        (response)=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'PESSOA RECUPERADA COM SUCESSO',
                    data:response
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO RECUPERAR A PESSOA',
                errorObject:error
            }
        );
    });
});

router.delete('/excluirPessoa/:id', (req, res)=>{

    let {id} = req.params;

    modelCharacter.destroy(
        {where:{id}}
    ).then(
        ()=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'PESSOA EXCLUIDA COM SUCESSO'
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO EXCLUIR A PESSOA',
                errorObject:error
            }
        );
    });
});

/* ROTA DE ALTERAÇÃO DE LIVRO */
router.put('/alterarPessoa', (req, res)=>{

    let {id, nome, descricao, moradia, data_nasc, fvrt_perso} = req.body;

    modelCharacter.update(
        {
            nome, 
            descricao, 
            moradia, 
            data_nasc, 
            fvrt_perso
        },
        {where:{id}}
    ).then(
        ()=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'PESSOA ALTERADA COM SUCESSO'
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO ALTERAR A PESSOA',
                errorObject:error
            }
        );
    });
});

module.exports = router;