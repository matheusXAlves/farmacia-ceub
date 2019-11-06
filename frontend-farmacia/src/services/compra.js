import { http } from './config'

export default {
    AddCompra: (compraData, clienteId) => {
        return http.post('addcompra/'+clienteId, compraData)
    },
    AddItem: (itemData) => {
        return http.post('additem', itemData)
    },
    GetComprasCliente: (nomeCliente) => {
        return http.get('comprascliente/'+nomeCliente)
    }
}