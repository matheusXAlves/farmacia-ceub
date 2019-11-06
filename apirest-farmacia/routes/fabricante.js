module.exports = {
    getFabricantes: (req, res) => {
        let query = "SELECT * FROM fabricantes"

        db.query(query, (err, result) => {
            if(err){
                return res.status(500).send(err)
            }else{
                res.json(result)
            }
        })
    },
    getFabricanteID: (req, res) => {
        let fabricanteId = req.params.id

        let query = "SELECT * FROM fabricantes WHERE idFabricantes = ?"

        db.query(query, [fabricanteId], (err, result) => {
            if(err){
                return res.status(500).send(err)
            }else{
                res.json(result)
            }
        })
    },
    addFabricante: (req, res) => {
        let nomeFabricante = req.body.nome_fabricante
                       
        let query = "INSERT INTO fabricantes (nome_fabricante) VALUES (?)"

        db.query(query, [nomeFabricante], (err, result) => {
            if(err){
                return res.status(500).send(err)
            }else{
                res.json({ message : "Fabricante adicionado" })
            }
        })
    },
    editFabricante: (req, res) => {
        let fabricanteId = req.params.id
        let nomeFabricante = req.body.nome_fabricante

        let query = "UPDATE fabricantes SET nome_fabricante = ? WHERE idFabricantes = ?"

        db.query(query, [nomeFabricante, fabricanteId], (err, result) => {
            if(err){
                return res.status(500).send(err)
            }else{
                res.json({ message : "Fabricante editado" })
            }
        })
    },
    deleteFabricante: (req, res) => {
        let fabricanteId = req.params.id
        let query = "DELETE FROM fabricantes WHERE idFabricantes = ?"

        db.query(query, [fabricanteId], (err, result) => {
            if(err){
                return res.status(500).send(err)
            }else{
                res.json({ message : "Fabricante deletado" })
            }
        })
    }
}