

<template>
  <v-container fluid>
    <v-flex xs12 class="text-center" mt-5>
      <h1>Cadastrar Produto</h1>
    </v-flex>
    <v-flex xs12 sm6 offset-sm3 mt-3 mb-10>
      <form @submit.prevent="cadastrar_produto">
        <v-layout column>
          <v-flex>
            <v-text-field
              name="nome"
              label="Nome do Produto"
              v-model="produto_cadastro.nome_produtos"
              type="text"
              required
            ></v-text-field>
          </v-flex>

          <v-flex>
            <v-text-field
              name="descricao"
              label="Descrição do Produto"
              v-model="produto_cadastro.descricao"
              type="text"
              required
            ></v-text-field>
          </v-flex>

          <v-flex>
            <v-text-field
              name="estoque"
              label="Estoque do Produto"
              v-model="produto_cadastro.estoque"
              type="number"
              required
            ></v-text-field>
          </v-flex>

          <v-flex>
            <v-text-field
              name="preco"
              label="Preço do Produto"
              v-model="produto_cadastro.preco"
              type="text"
              required
            ></v-text-field>
          </v-flex>

          <v-flex>
            <v-select
              :items="categorias"
              item-text="nome_categoria"
              item-value="idcategoria"
              label="Categoria do Produto"
              v-model="produto_cadastro.idcategoria"
            ></v-select>
          </v-flex>

          <v-flex>
            <v-select
              :items="fabricantes"
              item-text="nome_fabricante"
              item-value="idFabricantes"
              label="Fabricante do Produto"
              v-model="produto_cadastro.idfabricante"
            ></v-select>
          </v-flex>

          <v-flex class="text-center" mt-5>
            <v-btn color="primary" type="submit">Salvar</v-btn>
          </v-flex>
        </v-layout>
      </form>
    </v-flex>

    <v-divider class="mx-12" inset color="#BDBDBD"></v-divider>

    <v-flex xs12 class="text-center" mt-5>
      <h1>Produtos Cadastrados</h1>
    </v-flex>

    <v-flex xs12 sm8 offset-sm2 mt-5>
      <v-simple-table>
        <thead>
          <tr>
            <th>NOME</th>
            <th>DESCRIÇÃO</th>
            <th>ESTOQUE</th>
            <th>PREÇO</th>
            <th>CATEGORIA</th>
            <th>FABRICANTE</th>
            <th>OPÇÕES</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="produto of produtos" :key="produto.idProdutos">
            <td>{{ produto.nome_produtos }}</td>
            <td>{{ produto.descricao }}</td>
            <td>{{ produto.estoque }}</td>
            <td>{{ produto.preco }}</td>
            <td>{{ produto.categoria }}</td>
            <td>{{ produto.Fabricantes_idFabricantes }}</td>
            <td>
              <v-btn @click="editar_produto(produto)" color="primary" fab small dark>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn color="error" fab small dark>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-flex>
  </v-container>
</template>

<script>
import Produto from "../services/produtos";

export default {
  data() {
    return {
      produtos: [],
      categorias: [],
      fabricantes: [],
      produto_cadastro: {
        nome_produtos: "",
        preco: "",
        descricao: "",
        estoque: "",
        idcategoria: "",
        idfabricante: ""
      }
    };
  },
  mounted() {
    this.listar_produtos(), this.listar_categorias(), this.listar_fabricantes();
  },
  methods: {
    listar_produtos() {
      Produto.GetProdutos().then(response => {
        this.produtos = response.data;
      });
    },
    listar_categorias() {
      Produto.GetCategoria().then(response => {
        this.categorias = response.data;
      });
    },
    listar_fabricantes() {
      Produto.GetFabricante().then(response => {
        this.fabricantes = response.data;
      });
    },
    cadastrar_produto() {
      if (!this.produto_cadastro.idProdutos) {
        Produto.AddProduto(this.produto_cadastro).then(response => {
          this.produto_cadastro = {};
          alert(response.data.message);
          this.listar_produtos();
        });
      } else {
        Produto.EditProduto(this.produto_cadastro).then(response => {
          this.produto_cadastro = {};
          alert(response.data.message);
          this.listar_produtos();
        });
      }
    },
    editar_produto(produto) {
      this.produto_cadastro = produto;
    }
  }
};
</script>

<style>
</style>