<template>
  <v-container v-if="loading">
    <div class="text-center">
      <v-progress-circular indeterminate :size="200" :width="8" color="green"> </v-progress-circular>
    </div>
  </v-container>

  <v-container v-else grid-list-xl>
    <v-layout wrap>
        <v-flex md3 mb-2 v-for="produto in produtos" :key="produto.idProdutos">
            <v-card class="mx-auto" max-width="400">
                <v-img class="white--text align-end" height="200px" src="http://protec.org.br/uploads/noticias/imagens/Generico_3.jpg"></v-img>

                <v-card-title>{{produto.nome_produtos}}</v-card-title>

                <v-card-text class="text--primary">
                    <div>
                        <div>{{produto.descricao}}</div>
                        <div v-money="'R$'">{{produto.preco}}</div>
                    </div>
                </v-card-text>

                <v-card-actions>
                    <v-btn @click="addProdutoCarrinho(produto)" color="orange">
                        Comprar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Produto from '../services/produtos'

import { mapActions } from 'vuex'

export default {
  data() {
    return {
      produtos: [],
      loading: true
    }
  },
  mounted() {
    Produto.GetProdutos()
    .then(resp => {
      this.produtos = resp.data
      this.loading = false
    })
  },
  methods: {
    ...mapActions('carrinho', [
        'addProdutoCarrinho'
    ])
  }
}
</script>

<style>

</style>