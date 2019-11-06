const config = require('../config');
const jwt = require('jsonwebtoken');

module.exports = {
    getClientes: (req, res) => {
        let query = "SELECT * FROM cliente"

        db.query(query, (err, result) => {
            if(err){
                return res.status(500).send(err)
            }else{
                res.json(result)
            }
        })
    },
    getClienteID: (req, res) => {
        let clienteId = req.params.id;

        let query = "SELECT * FROM cliente WHERE idCliente = ?"

        db.query(query, [clienteId], (err, result) => {
            if(err){
                return res.status(500).send(err)
            }else{
                res.json(result)
            }
        })
    },
    login: (req, res) => {
        let emailCliente = req.body.email;
        let senhaCliente = req.body.senha;

        
        let query = "SELECT * FROM cliente WHERE email = ?"

        db.query(query, [emailCliente], (err, result) => {
            if(err){
                return res.status(500).send(err)
            }else{
                if (!result) return res.status(404).send('No user found.')
                let passwordIsValid = senhaCliente === result[0].senha ? true : false
                if (!passwordIsValid) return res.status(401).send({ auth: false, token: null })
                let token = jwt.sign({ id: result.idCliente }, config.secret, { expiresIn: 86400 })
                res.status(200).send({ auth: true, token: token, user: result })
            }
        })
        
    },
    addCliente: (req, res) => {
        let nomeCliente = req.body.nome_cliente
        let emailCliente = req.body.email
        let telefoneCliente = req.body.telefone
        let dtaCadastroCliente = new Date()
        let dtaNascimentoCliente = req.body.dta_nascimento
        let senhaCliente = req.body.senha

        let emailQuery = "SELECT * FROM cliente WHERE email = ?"

        db.query(emailQuery, [emailCliente], (err, result) => {
            if(err){
                return res.status(500).send(err)
            }

            if(result.length > 0){
                res.json({ message : "Email already exists" })
            } else {                                   
                let query = "INSERT INTO cliente (nome_cliente, email, telefone, cadastro_cliente, dta_nascimento, senha) VALUES (?, ?, ?, ?, ?, ?)"

                db.query(query, [nomeCliente, emailCliente, telefoneCliente, dtaCadastroCliente, dtaNascimentoCliente, senhaCliente], (err, result) => {
                    if(err){
                        return res.status(500).send(err)
                    }else{
                        res.json({ message : "Cliente adicionado" })
                    }
                })
            }
        })
    },
    editCliente: (req, res) => {
        let clienteId = req.params.id
        let nomeCliente = req.body.nome_cliente
        let emailCliente = req.body.email
        let telefoneCliente = req.body.telefone
        let dtaNascimentoCliente = req.body.dta_nascimento
        let senhaCliente = req.body.senha

        let query = "UPDATE cliente SET nome_cliente = ?, email = ?, telefone = ?, dta_nascimento = ?, senha = ? WHERE idCliente = ?"

        db.query(query, [nomeCliente, emailCliente, telefoneCliente, dtaNascimentoCliente, senhaCliente, clienteId], (err, result) => {
            if(err){
                return res.status(500).send(err)
            }else{
                res.json({ message : "Cliente editado" })
            }
        })
    },
    deleteCliente: (req, res) => {
        let clienteId = req.params.id
        let query = "DELETE FROM cliente WHERE idCliente = ?"

        db.query(query, [clienteId], (err, result) => {
            if(err){
                return res.status(500).send(err)
            }else{
                res.json({ message : "Cliente deletado" })
            }
        })
    }
}