<template>
  <MainNav tagline="BEER" />
  <BeerCard v-for="beer in beers" :key="beer.id" :beer="beer" />
</template>

<script>
import MainNav from "./components/MainNav.vue";
import BeerCard from "./components/BeerCard.vue";

export default {
  components: {
    MainNav,
    BeerCard,
  },
  data: () => ({
    tagline: "beer`s",
    beers: [
      {
        id: 1,
        beer_image:
          "https://storage.googleapis.com/uxpilot-auth.appspot.com/2e32339530-08bf3e64743068117756.png",
        name: "Beer 1",
        type: "My Brew",
        style: "American IPA",
        abv: "6.5%",
        description:
          "Citrusy and hoppy with a smooth finish. Used Cascade and Centennial hops. Great balance!",
        date: "YYYY-MM-DD",
        rating: "4.5",
        favourite: true,
        location: null, // or ''
      },
      {
        id: 2,
        beer_image:
          "https://storage.googleapis.com/uxpilot-auth.appspot.com/27b1a83f3c-abf0c1773e5b4f28c065.png",
        name: "Beer 2",
        type: "Tasted",
        style: "Stout",
        abv: "8%",
        description:
          "Citrusy and hoppy with a smooth finish. Used Cascade and Centennial hops. Great balance!",
        date: null, // or ''
        rating: "3",
        favourite: false,
        location: "Great Lakes Brewing",
      },
    ],
  }),
};
</script>

<style scoped></style>
