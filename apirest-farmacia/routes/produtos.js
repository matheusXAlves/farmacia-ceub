module.exports = {
    getProdutos: (req, res) => {
        let query = "SELECT * FROM produtos"

        db.query(query, (err, result) => {
            if(err){
                return res.status(500).send(err)
            }else{
                res.json(result)
            }
        })
    },
    getProdutoID: (req, res) => {
        let produtoId = req.params.id

        let query = "SELECT * FROM produtos WHERE idProdutos = ?"

        db.query(query, [produtoId], (err, result) => {
            if(err){
                return res.status(500).send(err)
            }else{
                res.json(result)
            }
        })
    },
    addProduto: (req, res) => {
        let nomeProduto = req.body.nome_produtos
        let precoProduto = req.body.preco
        let descricao = req.body.descricao
        let estoqueProduto = req.body.estoque
        let dtaCadastroProduto = new Date()
        let idCategoria = req.body.idcategoria
        let idFabricante = req.body.idfabricante
        
        let query = "INSERT INTO produtos (nome_produtos, preco, descricao, estoque, cadastro_produto, categoria, Fabricantes_idFabricantes) "+
            "VALUES (?, ?, ?, ?, ?, ?, ?)"

        db.query(query, [nomeProduto, precoProduto, descricao, estoqueProduto, dtaCadastroProduto, idCategoria, idFabricante], (err, result) => {
            if(err){
                return res.status(500).send(err)
            }else{
                res.json({ message : "Produto adicionado" })
            }
        })
    },
    editProduto: (req, res) => {
        let produtosId = req.params.id
        let nomeProduto = req.body.nome_produtos
        let precoProduto = req.body.preco
        let descricao = req.body.descricao
        let estoqueProduto = req.body.estoque
        let idCategoria = req.body.idcategoria
        let idFabricante = req.body.idfabricante

        let query = "UPDATE produtos SET nome_produtos = ?, preco = ?, descricao = ?, estoque = ?, categoria = ?, Fabricantes_idFabricantes = ? "+
            "WHERE idProdutos = ?"

        db.query(query, [nomeProduto, precoProduto, descricao, estoqueProduto, idCategoria, idFabricante, produtosId], (err, result) => {
            if(err){
                return res.status(500).send(err)
            }else{
                res.json({ message : "Produto editado" })
            }
        })
    },
    deleteProduto: (req, res) => {
        let produtosId = req.params.id
        let query = "DELETE FROM produtos WHERE idProdutos = ?"

        db.query(query, [produtosId], (err, result) => {
            if(err){
                return res.status(500).send(err)
            }else{
                res.json({ message : "Produtos deletado" })
            }
        })
    }
}