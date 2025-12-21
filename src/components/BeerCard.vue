<template>
  <div class="row">
    <div class="card-col col-10">
      <div class="card">
        <img :src="beer.beer_image" alt="" />
        <div class="card-body">
          <div class="top-row">
            <span class="beer-type" :class="brewTypeColor">{{ beer.type }}</span
            ><button :class="isFavourited" class="favourite-button">
              <span class="favourite-icon"
                ><i :class="isFavourited" class="fa-heart"></i
              ></span>
            </button>
          </div>
          <h3 class="card-title">
            {{ beer.name }}
          </h3>
          <h4 class="beer-style">
            {{ beer.style }} <span>{{ beer.abv }}</span>
          </h4>
          <p>{{ beer.description }}</p>
          <hr />
          <div class="bottom-row">
            <span v-if="beer.location"
              ><i class="fa-solid fa-location-dot"></i>
              {{ beer.location }}</span
            >
            <span v-if="beer.date"
              ><i class="fa-regular fa-calendar"></i> {{ beer.date }}</span
            >
            <span
              ><i class="fa-solid fa-star rating-star"></i>
              {{ beer.rating }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

type dateString = string;

type Beer = {
  id: string;
  beer_image: string; // varchar
  name: string;
  type: string;
  style: string;
  abv: number; // integer
  description: string;
  date: null | dateString;
  rating: number; // integer
  favourite: boolean;
  location: null | string;
};

export default defineComponent({
  props: {
    beer: {
      type: Object,
      required: true,
    },
  },
  // emits: ["delete-beer"],
  computed: {
    brewTypeColor() {
      switch (this.beer.type) {
        case "My Brew":
          return "my-brew-color";
        default:
          return "tasted-brew-color";
      }
    },

    isFavourited() {
      switch (this.beer.favourite) {
        case true:
          return "is-favourite-true fa-solid";
        default:
          return "is-favourite-false fa-regular";
      }
    },
  },
  methods: {
    // deleteBeer() {
    //   this.$emit("delete-beer", this.beer);
    // },
  },
});
</script>

<style lang="scss">
.card-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;

  .card {
    overflow: hidden;
    border-radius: 20px;

    margin: 10px 0;
  }

  .card-body {
    .top-row {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .beer-type {
        font-weight: bold;
        font-size: 12px;
        line-height: 1rem;
        padding: 3px 10px;
        border-radius: 20px;
      }

      .my-brew-color {
        color: #b45309;
        background: #fef3c7;
      }
      .tasted-brew-color {
        color: #334155;
        background: #f1f5f9;
      }

      .favourite-button {
        border-radius: 50%;
        height: 35px;
        width: 35px;
        border: none;

        &.is-favourite-true {
          background: #fef2f2;
          .favourite-icon {
            opacity: 1;
            color: #ef4444;
          }
        }
        &.is-favourite-false {
          background: #f8fafc;
          .favourite-icon {
            opacity: 0.35;
          }
        }
      }
    }

    .bottom-row {
      display: flex;
      justify-content: space-between;

      .rating-star {
        color: #fbbf24;
      }
    }
  }
}
</style>
