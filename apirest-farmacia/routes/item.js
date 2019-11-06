module.exports = {
    getItens: (req, res) => {
        let query = "SELECT * FROM item"

        db.query(query, (err, result) => {
            if(err){
                return res.status(500).send(err)
            }else{
                res.json(result)
            }
        })
    },
    addItem: (req, res) => {
        let idCompra = req.body.idcompra
        let idProduto = req.body.idproduto
        let quantidade = req.body.quantidade
        let valorUnitario = req.body.valor_unitario
                       
        let query = "INSERT INTO item (idCompras, idProdutos, quantidade, valor_unitario) VALUES (?, ?, ?, ?)"

        db.query(query, [idCompra, idProduto, quantidade, valorUnitario], (err, result) => {
            if(err){
                return res.status(500).send(err)
            }else{
                res.json({ message : "Item adicionado" })
            }
        })
    }
}