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
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_URL

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers['Authorization'] = token
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
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token')
  if (!to.meta.public && !isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

createApp(App).use(router).mount('#app')