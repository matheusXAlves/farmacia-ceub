//import Produto from '../../services/produtos'
// initial state
// shape: [{ idProdutos, nome_produtos, descricao, preco, quantidade }]
const state = {
  itensCarrinho: [],
  checkoutStatus: null
}

// getters
const getters = {
  produtosCarrinho: state => {
    return state.itensCarrinho
  },

  precoTotalCarrinho: state => {
    return state.itensCarrinho.reduce((total, produto) => {
      return total + produto.preco * produto.quantidade
    }, 0)
  }
}

// actions
const actions = {

  addProdutoCarrinho ({ state, commit }, produto) {
    commit('setCheckoutStatus', null)

    if (produto.estoque > 0) {
      const itemCarrinho = state.itensCarrinho.find(item => item.idProdutos === produto.idProdutos)
      
      if (!itemCarrinho) {
        commit('pushProdutoCarrinho', produto)
      } else {
        commit('addItemQuantidade', itemCarrinho)
      }
      // remove 1 item from stock
      // commit('produtos/decrementprodutoInventory', { id: produto.id }, { root: true })
    }
  },

  delProdutoCarrinho ({ state, commit }, indexCarrinho) {
    const itemCarrinho = state.itensCarrinho[indexCarrinho]
    console.log(indexCarrinho)
    if (itemCarrinho.quantidade == 1) {
      commit('popProdutoCarrinho', indexCarrinho)
    } else {
      if(itemCarrinho){
        commit('delItemQuantidade', itemCarrinho)
      }
    }
  },

  delAllProdutoCarrinho ( {commit} ) {
    commit('setCheckoutStatus', null)
    commit('setCartItems', { items: [] })
  }
}

// mutations
const mutations = {
  pushProdutoCarrinho (state, produto) {
    state.itensCarrinho.push({
      idProdutos: produto.idProdutos,
      nome_produtos: produto.nome_produtos,
      descricao: produto.descricao,
      preco: produto.preco,
      quantidade: 1
    })
  },

  popProdutoCarrinho (state, indexCarrinho) {
    state.itensCarrinho.splice(indexCarrinho, 1)
  },

  addItemQuantidade(state, { idProdutos }) {
    const itemCarrinho = state.itensCarrinho.find(item => item.idProdutos === idProdutos)
    itemCarrinho.quantidade++
  },

  delItemQuantidade(state, {idProdutos} ) {
    const itemCarrinho = state.itensCarrinho.find(item => item.idProdutos === idProdutos)
    itemCarrinho.quantidade--
  },

  // decrementProductInventory (state, { idProdutos }) {
  //   const produto = state.all.find(produto => product.idProdutos === idProdutos)
  //   produto.estoque--
  // },

  setCartItems (state, { items }) {
    state.items = items
  },

  setCheckoutStatus (state, status) {
    state.checkoutStatus = status
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}