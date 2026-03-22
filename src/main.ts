import './style.scss'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import HomePageContainer from './views/HomePageContainer.vue'
import InsideBeer from './views/InsideBeer.vue'
import LogBeer from "./views/LogBeer.vue"
import BrewedBeers from "./views/BrewedBeers.vue"
import TastedBeers from "./views/TastedBeers.vue"
import FavBrewed from "./views/FavBrewed.vue"
import FavTasted from "./views/FavTasted.vue"
import UserLogin from "./views/UserLogin.vue"
import ResetPassword from "./views/ResetPassword.vue"
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Accept'] = 'application/json'

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token && token !== 'undefined') {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

const routes = [
  { path: '/', component: HomePageContainer },
  { path: '/brewed', component: BrewedBeers },
  { path: '/tasted', component: TastedBeers },
  { path: '/beer/:id', component: InsideBeer },
  { path: '/log-brew', component: LogBeer, props: { beerVariant: 'log-brew' }},
  { path: '/log-tasting', component: LogBeer, props: { beerVariant: 'log-tasting' }},
  { path: '/fav-brewed', component: FavBrewed},
  { path: '/fav-tasted', component: FavTasted},
  { path: '/login', component: UserLogin, meta: { public: true }},
  { path: '/users/password/edit', component: ResetPassword, meta: { public: true }}

]

const path = window.location.pathname;
const search = window.location.search;

if (
  !window.location.hash &&
  path.startsWith("/users/password/edit")
) {
  window.location.replace(`/#${path}${search}`);
}

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const isLoggedIn = !!token && token !== 'undefined'
  
  if (!to.meta.public && !isLoggedIn) {
    next('/login')
  } else {
    next()
  }

})

createApp(App).use(router).mount('#app')