const express = require('express');
const cors = require('cors');

const routesCharacter = require('./route/routesCharacter');
const routesFavorites = require('./route/routesFavorites');
const routesMoradia = require('./route/routesMoradias');


const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/', routesMoradia);
app.use('/', routesFavorites);
app.use('/', routesCharacter);


app.listen(5000, ()=>{
    console.log('SERVIDOR RODANDO EM - http://localhost:5000');
});