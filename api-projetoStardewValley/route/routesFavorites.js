const express = require('express');

const modelFavorite = require('../model/modelFavorite');

const router = express.Router();

router.post('/inserirFavorito', (req, res)=>{

    let {nome} = req.body;

    modelFavorite.create(
        {
            nome,
        }
    )
    .then(
        ()=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'PERSONAGEM INSERIDO COM SUCESSO'
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO INSERIR O PERSONAGEM',
                errorObject:error
            }
        );
    });

});

router.get('/listagemPersonagens', (req, res)=>{

    modelFavorite.findAll()
    .then(
        (response)=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'PERSONAGENS LISTADOS COM SUCESSO',
                    data:response
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO LISTAR OS PERSONAGENS',
                errorObject:error
            }
        );
    });
});

router.get('/listagemPersonagens/:id', (req, res)=>{

    let {id} = req.params;

    modelFavorite.findByPk(id)
    .then(
        (response)=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'PERSONAGEM RECUPERADO COM SUCESSO',
                    data:response
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO RECUPERAR O PERSONAGEM',
                errorObject:error
            }
        );
    });

});

router.delete('/excluirPersonagem/:id', (req, res)=>{

    let {id} = req.params;

    modelFavorite.destroy(
        {where:{id}}
    ).then(
        ()=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'PERSONAGEM EXCLUIDO COM SUCESSO'
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO EXCLUIR O PERSONAGEM',
                errorObject:error
            }
        );
    });

});

router.put('/alterarPersonagem', (req, res)=>{

    let {id, nome } = req.body;

    modelFavorite.update(
        {
            nome
        },
        {where:{id}}
    ).then(
        ()=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'PERSONAGEM ALTERADO COM SUCESSO'
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO ALTERAR O PERSONAGEM',
                errorObject:error
            }
        );
    });

});

module.exports = router;