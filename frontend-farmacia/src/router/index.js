import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

const routerOptions = [
  { path: "/", component: "Produtos" },
  { path: "/login", component: "Login", meta: { guest: true } },
  { path: "/cadastrarproduto", component: "CriarProduto", meta: { requiresAuth: true } },
  { path: "/carrinho", component: "Carrinho" },
  { path: "/meuspedidos", component: "MeusPedidos", meta: { requiresAuth: true } },
  { path: "*", component: "NotFound" }
]

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`../components/${route.component}.vue`)
  }
})

export const router = new Router({
  mode: "history",
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('jwt') == null) {
      next()
    }
    else {
      next({ path: '/', })
    }
  } else {
    next()
  }
})

export default router