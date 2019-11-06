module.exports = {
    getCategorias: (req, res) => {
        let query = "SELECT * FROM categoria"

        db.query(query, (err, result) => {
            if(err){
                return res.status(500).send(err)
            }else{
                res.json(result)
            }
        })
    },
    getCategoriaID: (req, res) => {
        let categoriaId = req.params.id

        let query = "SELECT * FROM categoria WHERE idcategoria = ?"

        db.query(query, [categoriaId], (err, result) => {
            if(err){
                return res.status(500).send(err)
            }else{
                res.json(result)
            }
        })
    },
    addCategoria: (req, res) => {
        let nomeCategoria = req.body.nome_categoria
                       
        let query = "INSERT INTO categoria (nome_categoria) VALUES (?)"

        db.query(query, [nomeCategoria], (err, result) => {
            if(err){
                return res.status(500).send(err)
            }else{
                res.json({ message : "Categoria adicionado" })
            }
        })
    },
    editCategoria: (req, res) => {
        let categoriaId = req.params.id
        let nomeCategoria = req.body.nome_categoria

        let query = "UPDATE categoria SET nome_categoria = ? WHERE idcategoria = ?"

        db.query(query, [nomeCategoria, categoriaId], (err, result) => {
            if(err){
                return res.status(500).send(err)
            }else{
                res.json({ message : "Categoria editado" })
            }
        })
    },
    deleteCategoria: (req, res) => {
        let categoriaId = req.params.id
        let query = "DELETE FROM categoria WHERE idcategoria = ?"

        db.query(query, [categoriaId], (err, result) => {
            if(err){
                return res.status(500).send(err)
            }else{
                res.json({ message : "Categoria deletado" })
            }
        })
    }
}