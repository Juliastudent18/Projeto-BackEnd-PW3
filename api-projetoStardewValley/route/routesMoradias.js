const express = require('express');

const modelMoradia = require('../model/modelMoradia');

const router = express.Router();

router.post('/inserirMoradia', (req, res)=>{

    let {moradia} = req.body;

    modelMoradia.create(
        {
            moradia,
        }
    )
    .then(
        ()=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'MORADIA INSERIDA COM SUCESSO'
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO INSERIR A MORADIA',
                errorObject:error
            }
        );
    });

});

router.get('/listagemMoradias', (req, res)=>{

    modelMoradia.findAll()
    .then(
        (response)=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'MORADIAS LISTADAS COM SUCESSO',
                    data:response
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO LISTAR AS MORADIAS',
                errorObject:error
            }
        );
    });
});

router.get('/listarMoradias/:id', (req, res)=>{

    let {id} = req.params;

    modelMoradia.findByPk(id)
    .then(
        (response)=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'MORADIA RECUPERADA COM SUCESSO',
                    data:response
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO RECUPERAR A MORADIA',
                errorObject:error
            }
        );
    });

});

router.delete('/excluirMoradia/:id', (req, res)=>{

    let {id} = req.params;

    modelMoradia.destroy(
        {where:{id}}
    ).then(
        ()=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'MORADIA EXCLUIDA COM SUCESSO'
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO EXCLUIR A MORADIA',
                errorObject:error
            }
        );
    });

});

router.put('/alterarMoradia', (req, res)=>{

    let {id, moradia } = req.body;

    modelMoradia.update(
        {
            moradia
        },
        {where:{id}}
    ).then(
        ()=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'MORADIA ALTERADA COM SUCESSO'
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO ALTERAR A MORADIA',
                errorObject:error
            }
        );
    });

});

module.exports = router;