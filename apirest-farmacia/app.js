const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const app = express()

const {getClientes, getClienteID, login, addCliente, editCliente, deleteCliente} = require('./routes/clientes')
const {getProdutos, getProdutoID, addProduto, editProduto, deleteProduto} = require('./routes/produtos')
const {getCategorias, getCategoriaID, addCategoria, editCategoria, deleteCategoria} = require('./routes/categoria')
const {getFabricantes, getFabricanteID, addFabricante, editFabricante, deleteFabricante} = require('./routes/fabricante')
const {getItens, addItem} = require('./routes/item')
const {getCompras, getCompraID, addCompra, GetComprasCliente} = require('./routes/compra')

const db = mysql.createConnection({
    host: 'farmacia.c4rj8oe4wujx.sa-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'matheusx456',
    database: 'farmacia'
})

db.connect((err) => {
    if(err){
        throw err
    }
    console.log('Connected to database')
})

global.db = db

app.use(bodyParser.text())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.get('/', function(req, res) {
    res.json({ message: 'hello world' })
})

// Rotas Clientes
app.get('/clientes', getClientes)
app.get('/cliente/:id', getClienteID)
app.post('/login', login)
app.post('/addcliente', addCliente)
app.put('/editCliente/:id', editCliente)
app.delete('/deleteCliente/:id', deleteCliente)

// Rotas Produtos
app.get('/produtos', getProdutos)
app.get('/produto/:id', getProdutoID)
app.post('/addproduto', addProduto)
app.put('/editproduto/:id', editProduto)
app.delete('/deleteproduto/:id', deleteProduto)

// Rotas Categoria
app.get('/categorias', getCategorias)
app.get('/categoria/:id', getCategoriaID)
app.post('/addcategoria', addCategoria)
app.put('/editcategoria/:id', editCategoria)
app.delete('/deletecategoria/:id', deleteCategoria)

// Rotas Fabricante
app.get('/fabricantes', getFabricantes)
app.get('/fabricante/:id', getFabricanteID)
app.post('/addfabricante', addFabricante)
app.put('/editfabricante/:id', editFabricante)
app.delete('/deletefabricante/:id', deleteFabricante)

// Rotas Item
app.get('/itens', getItens)
app.post('/additem', addItem)

// Rotas Compra
app.get('/compras', getCompras)
app.get('/compra/:id', getCompraID)
app.post('/addcompra/:idcliente', addCompra)

app.get('/comprascliente/:nomecliente', GetComprasCliente)

app.listen(process.env.PORT || 5000, () => {
    console.log('Backend executando...')
})