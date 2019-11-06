<template>
  <v-container fluid>
    <v-flex xs12 class="text-center" mt-5>
      <h1>Carrinho de Compras</h1>
    </v-flex>

    <v-flex xs12 sm6 offset-sm3 mt-5 mb-10>
      <v-simple-table>
        <thead>
          <tr>
            <th>NOME</th>
            <th>DESCRIÇÃO</th>
            <th>PREÇO</th>
            <th>QUANTIDADE</th>
            <th>OPÇÕES</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(produto, index) in produtos" :key="index">
            <td>{{ produto.nome_produtos }}</td>
            <td>{{ produto.descricao }}</td>
            <td>{{ produto.preco }}</td>
            <td>{{ produto.quantidade }}</td>
            <td>
              <v-btn color="error" fab small dark @click="delProdutoCarrinho(index)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-flex>

    <v-divider class="mx-12" inset color="#BDBDBD"></v-divider>

    <v-flex xs12 sm6 offset-sm8 mt-5>
      <p>Total:</p>
      <p v-money="'R$'">{{ precoTotalCarrinho }}</p>
    </v-flex>

    <v-flex xs12 sm6 offset-sm8 mt-5>
      <div class="my-2">
        <v-btn
          depressed
          color="primary"
          @click="comprar_produtos(produtos, precoTotalCarrinho)"
        >Comprar</v-btn>
      </div>
    </v-flex>
  </v-container>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";

import Compra from "../services/compra";

export default {
  computed: {
    ...mapState({
      checkoutStatus: state => state.carrinho.checkoutStatus
    }),
    ...mapGetters("carrinho", {
      produtos: "produtosCarrinho"
    }),
    precoTotalCarrinho: function() {
      return this.produtos.reduce((total, produto) => {
        return total + produto.preco * produto.quantidade;
      }, 0);
    }
  },
  methods: {
    ...mapActions("carrinho", ["delProdutoCarrinho"]),


    comprar_produtos(produtosCarrinho, totalCompra) {
      let user = JSON.parse(localStorage.getItem("user"));

      if (user != null) {
        Compra.AddCompra({total: totalCompra}, user[0].idCliente).then(response => {
          produtosCarrinho.forEach(element => {
            let dadosItem = {}

            dadosItem.idcompra = response.data.idCompra;
            dadosItem.idproduto = element.idProdutos;
            dadosItem.quantidade = element.quantidade;
            dadosItem.valor_unitario = element.preco;

            Compra.AddItem(dadosItem).then(response => {
              console.log('addItem: '+response)
            })

            dadosItem = {}
          })

          this.$store.dispatch('carrinho/delAllProdutoCarrinho')
          this.$router.push('/')
          this.$router.go()
        });
      }
    }
  }
};
</script>