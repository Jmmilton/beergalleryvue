<template>
  <div>
    <BeerCard v-for="beer in beers" :key="beer.id" :beer="beer" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import BeerCard from "../components/BeerCard.vue";
import axios from "axios";

export default defineComponent({
  props: {},
  // emits: ["delete-beer"],
  components: {
    BeerCard,
  },
  data: () => ({
    tagline: "beers",
    beers: [
      // {
      //   id: 1,
      //   beer_image:
      //     "https://storage.googleapis.com/uxpilot-auth.appspot.com/2e32339530-08bf3e64743068117756.png",
      //   name: "Beer 1",
      //   type: "My Brew",
      //   style: "American IPA",
      //   abv: "6.5%",
      //   description:
      //     "Citrusy and hoppy with a smooth finish. Used Cascade and Centennial hops. Great balance!",
      //   date: "YYYY-MM-DD",
      //   rating: "4.5",
      //   favourite: true,
      //   location: null, // or ''
      // },
      // {
      //   id: 2,
      //   beer_image:
      //     "https://storage.googleapis.com/uxpilot-auth.appspot.com/27b1a83f3c-abf0c1773e5b4f28c065.png",
      //   name: "Beer 2",
      //   type: "Tasted",
      //   style: "Stout",
      //   abv: "8%",
      //   description:
      //     "Citrusy and hoppy with a smooth finish. Used Cascade and Centennial hops. Great balance!",
      //   date: null, // or ''
      //   rating: "3",
      //   favourite: false,
      //   location: "Great Lakes Brewing",
      // },
    ],
    errors: [],
  }),
  computed: {},
  created() {
    axios
      .get("http://localhost:3000/all-beers")
      .then((response) => {
        this.beers = response.data;
        console.log(this.beers, "beers");
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
  methods: {
    // deleteBeer() {
    //   this.$emit("delete-beer", this.beer);
    // },
  },
});
</script>

<style lang="scss"></style>
