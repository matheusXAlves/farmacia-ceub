<template>
  <v-app id="inspire">
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
      <v-toolbar-title style="width: 500px" class="ml-0 pl-6">
        <router-link to="/" tag="h1" style="cursor: pointer">
          <v-icon large right>mdi-pill</v-icon>
          {{ appTitle }}
        </router-link>
      </v-toolbar-title>

      <v-spacer />

      <!-- <v-btn
        class="mx-2"
        rounded
        color="pink"
        v-for="item in menuItems"
        :key="item.title"
        :to="item.path">
        <v-icon left>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>-->
      <v-btn class="mx-2" rounded color="pink" to="/carrinho">
        <v-badge color="grey darken-4">
          <template v-slot:badge>
            <span>5</span>
          </template>
          <v-icon left>mdi-cart-outline</v-icon>Carrinho
        </v-badge>
      </v-btn>

      <div v-if="!isLogged">
        <v-btn class="mx-2" rounded color="pink" to="/login">
          <v-icon left>mdi-account-circle-outline</v-icon>Login
        </v-btn>
      </div>
      
      <div v-else>
        <v-btn class="mx-2" rounded color="pink" to="/meuspedidos">
          <v-icon left>mdi-file-document-box-multiple-outline</v-icon>Meus Pedidos
        </v-btn>

        <v-btn class="mx-2" rounded color="pink" @click="logout">
          <v-icon left>mdi-account-circle-outline</v-icon>Sair
        </v-btn>
      </div>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  props: {
    source: String
  },
  data() {
    return {
      drawer: null,
      appTitle: "Farmacia",
      sidebar: false,
      menuItems: [
        { title: "Carrinho", path: "/carrinho", icon: "mdi-cart-outline" },
        { title: "Login", path: "/login", icon: "mdi-account-circle-outline" }
      ],
      isLogged: this.checkIfIsLogged()
    }
  },
  created () {
    this.$on('loggedIn', () => {
      this.isLogged = this.checkIfIsLogged()
    })
  },
  methods: {
    logout () {
      localStorage.removeItem('jwt')
      localStorage.removeItem('user')
      this.isLogged = this.checkIfIsLogged()
      this.$router.push('/')
    },
    checkIfIsLogged () {
      let token = localStorage.getItem('jwt')
      if (token) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>