<template>
  <v-container fluid>
    <v-row justify-space-around>
      <!-- Area Cadastro Cliente -->
      <v-col>
        <v-flex xs12 class="text-center" mt-5>
          <h1>Cadastro</h1>
        </v-flex>
        <v-flex xs12 sm6 offset-sm3 mt-3>
          <form @submit.prevent="cadastrar_cliente">
            <v-layout column>
              <v-flex>
                <v-text-field
                  name="nome"
                  label="Nome"
                  v-model="cliente_cadastro.nome_cliente"
                  type="text"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field
                  name="email"
                  label="Email"
                  v-model="cliente_cadastro.email"
                  type="email"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field
                  name="senha"
                  label="Senha"
                  v-model="cliente_cadastro.senha"
                  type="password"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field
                  name="dtanascimento"
                  label="Data de Nascimneto"
                  v-model="cliente_cadastro.dta_nascimento"
                  type="date"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field
                  name="telefone"
                  label="Telefone"
                  v-model="cliente_cadastro.telefone"
                  type="phone"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex class="text-center" mt-5>
                <v-btn color="primary" type="submit" @click="cadastrar_cliente">Sign Up</v-btn>
              </v-flex>
            </v-layout>
          </form>
        </v-flex>
      </v-col>
      <!-- Area Cadastro Cliente -->

      <v-divider vertical inset color="#BDBDBD"></v-divider>

      <!-- Area Login Cliente -->
      <v-col>
        <v-flex xs12 class="text-center" mt-5>
          <h1>Login</h1>
        </v-flex>
        <v-flex xs12 sm6 offset-sm3 mt-3>
          <form>
            <v-layout column>
              <v-flex>
                <v-text-field
                  name="email"
                  label="Email"
                  v-model="cliente_login.email"
                  type="email"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field
                  name="senha"
                  label="Senha"
                  v-model="cliente_login.senha"
                  type="password"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex class="text-center" mt-5>
                <v-btn color="primary" type="submit" @click="login_cliente">Login</v-btn>
              </v-flex>
            </v-layout>
          </form>
        </v-flex>
      </v-col>
      <!-- Area Login Cliente -->
    </v-row>
  </v-container>
</template>

<script>
import Cliente from "../services/cliente";

export default {
  data() {
    return {
      cliente_cadastro: {
        nome_cliente: "",
        email: "",
        senha: "",
        dta_nascimento: "",
        telefone: ""
      },
      cliente_login: {
        email: "",
        senha: ""
      }
    };
  },
  methods: {
    cadastrar_cliente() {
      Cliente.AddCliente(this.cliente_cadastro).then(response => {
        this.cliente_cadastro = {};
        alert(response.data.message);
      });
    },
    login_cliente(e) {
      e.preventDefault();
      if (this.cliente_login.senha.length > 0) {
        Cliente.Login(this.cliente_login)
          .then(response => {
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("jwt", response.data.token);

            if (localStorage.getItem("jwt") != null) {
              this.$emit("loggedIn");
              this.$router.push('/');
              this.$router.go()
            }
          })
          .catch(function(error) {
            console.error(error.response);
          });
      }
    }
  }
};
</script>