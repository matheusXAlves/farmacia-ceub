const bcrypt = require('bcrypt');

module.exports = {
    getCompras: (req, res) => {
        let query = "SELECT * FROM compra"

        db.query(query, (err, result) => {
            if(err){
                return res.status(500).send(err)
            }else{
                res.json(result)
            }
        })
    },
    getCompraID: (req, res) => {
        let camprasId = req.params.id

        let query = "SELECT * FROM compra WHERE idCompras = ?"

        db.query(query, [camprasId], (err, result) => {
            if(err){
                return res.status(500).send(err)
            }else{
                res.json(result)
            }
        })
    },
    addCompra: (req, res) => {
        let totalCompra = req.body.total
        let dtaCompra = new Date()
        let idCliente = req.params.idcliente

        console.log(dtaCompra.toString())

        bcrypt.hash(dtaCompra.toString(), 10, function(err, codigoCompra) {                    
            let query = "INSERT INTO compra (codigo, total, Cliente_idCliente, dta_compra) VALUES (?, ?, ?, ?)"
            console.log(codigoCompra)
            db.query(query, [codigoCompra, totalCompra, idCliente, dtaCompra], (err, result) => {
                if(err){
                    return res.status(500).send(err)
                }else{
                    res.json({ message : "Compra adicionado", idCompra: result.insertId })
                }
            })
        })
    },
    GetComprasCliente: (req, res) => {
        let nomeCliente = req.params.nomecliente

        let query = "SELECT * FROM view1 WHERE nome_cliente = ?"

        db.query(query, [nomeCliente], (err, result) => {
            if(err){
                return res.status(500).send(err)
            }else{
                res.json(result)
            }
        })
    }
}