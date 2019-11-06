import { http } from './config'

export default {
    GetProdutoID: (idCliente) => {
        return http.get('cliente/'+idCliente)
    },
    AddCliente: (cliente) => {
        return http.post('addcliente', cliente)
    },
    Login: (cliente) => {
        return http.post('login', cliente)
    }
}