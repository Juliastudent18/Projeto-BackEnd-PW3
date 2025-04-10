const express = require('express');

/* IMPORTA O MODEL DE LIVRO */
const modelCharacter = require('../model/modelCharacter');


/* GERECIADOR DE ROTAS */
const router = express.Router();

/* ROTA DE TESTE DE CONEXÃO COM A API */
router.get('/', (req, res)=>{

    return res.status(200).json({status:'TESTE DE CONEXÃO COM A API!'});

});

/* ROTA DE INSERÇÃO DE LIVRO */
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

    modelCharacter.findAll()
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

    modelCharacter.findByPk(id)
    .then(
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