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
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_URL

const routes = [
  { path: '/', component: HomePageContainer },
  { path: '/brewed', component: BrewedBeers },
  { path: '/tasted', component: TastedBeers },
  { path: '/beer/:id', component: InsideBeer },
  { path: '/log-brew', component: LogBeer, props: { beerVariant: 'log-brew' }},
  { path: '/log-tasting', component: LogBeer, props: { beerVariant: 'log-tasting' }},
  { path: '/fav-brewed', component: FavBrewed},
  { path: '/fav-tasted', component: FavTasted},
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

createApp(App).use(router).mount('#app')
