import { http } from './config'

export default {
    GetProdutoID: (idProduto) => {
        return http.get('produto/'+idProduto)
    },
    GetProdutos: () => {
        return http.get('produtos')
    },
    GetCategoria: () => {
        return http.get('categorias')
    },
    GetFabricante: () => {
        return http.get('fabricantes')
    },
    AddProduto: (produto) => {
        return http.post('addproduto', produto)
    },
    EditProduto: (produto) => {
        return http.put('editproduto/'+produto.idProdutos, produto)
    }
}