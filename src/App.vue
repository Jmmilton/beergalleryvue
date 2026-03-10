<template>
  <MainNav v-if="$route.path !== '/login' && $route.path !== '/reset-password'" tagline="BEER" />
  <div class="container-fluid">
    <!-- <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/about">Go to About</RouterLink> -->
    <!-- <BeerCard v-for="beer in beers" :key="beer.id" :beer="beer" /> -->
    <!-- <Home /> -->
    <!-- <InsideBeer /> -->
  </div>
  <RouterView />
</template>

<script lang="ts">
import MainNav from "./components/MainNav.vue";
// import HomePageContainer from "./views/HomePageContainer.vue";
// import InsideBeer from "./views/InsideBeer.vue";
// import LogBeer from "./components/LogBeer.vue";
// import { RouterLink, RouterView } from "vue-router";

export default {
  name: "App",
  components: {
    MainNav,
    // HomePageContainer,
  },
  data: () => ({}),
};
</script>

<style scoped></style>
