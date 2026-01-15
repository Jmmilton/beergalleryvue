<template>
  <div class="row">
    <div class="beer-page-inside-col col-12">
      <h1>Beer Page Inside</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// type dateString = string;

// type Beer = {
//   id: string;
//   beer_image: string; // varchar
//   name: string;
//   type: string;
//   style: string;
//   abv: number; // integer
//   description: string;
//   date: null | dateString;
//   rating: number; // integer
//   favourite: boolean;
//   location: null | string;
// };

export default defineComponent({
  props: {},
  // emits: ["delete-beer"],
  computed: {},
  methods: {
    // deleteBeer() {
    //   this.$emit("delete-beer", this.beer);
    // },
  },
});
</script>

<style lang="scss"></style>
