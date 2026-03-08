<template>
  <div class="row">
    <div class="card-col col-12">
        <div class="card">
          <img :src="beer.image_url ? beer.image_url : beer.beer_image" alt="" v-if="beer.image_url || beer.beer_image" />
          <div class="card-body">
            <div class="top-row">
              <span class="beer-type" :class="brewTypeColor">{{
                beer.beer_type
              }}</span
              ><button :class="isFavourited" class="favourite-button">
                <span class="favourite-icon"
                  ><i :class="isFavourited" class="far fa-heart"></i
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
              <span v-if="beer.date_brewed"
                ><i class="fa-regular fa-calendar"></i>
                {{ beer.date_brewed }}</span
              >
              <span
                ><i class="fa-solid fa-star rating-star"></i>
                <span class="rating-number">{{ beer.rating }}</span></span
              >
            </div>
          </div>
        </div>

      <div>
        <p v-if="successMessage" class="success-message">
          {{ successMessage }}
        </p>
        <p v-else-if="errorMessage" class="success-message">
          {{ errorMessage }}
        </p>
      </div>

      <button @click="deleteBeer" class="submit-button">
        <i class="fa-solid fa-beer-mug-empty"></i>
        Delete Beer
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const beer = ref([])
const successMessage = ref("");
const errorMessage = ref("");

onMounted(async () => {
  const response = await axios.get(`/beer/${route.params.id}`)
    beer.value = response.data.beers
})


// const brewTypeColor = computed(() => {
//   // console.log(props.beer, "beer type");
//   switch (props.beer.beer_type) {
//     case "My Brew":
//       return "my-brew-color";
//     default:
//       return "tasted-brew-color";
//   }
// });

// const isFavourited = computed(() => {
//   switch (props.beer.favourite) {
//     case true:
//       return "is-favourite-true fa-solid";
//     default:
//       return "is-favourite-false fa-regular";
//   }
// });

const deleteBeer = async () => {
  try {
    await axios.delete(`/beer/${route.params.id}`)
    successMessage.value = "🍻 Beer deleted 🍻";
    setTimeout(() => router.push('/'), 1000)
  }
  catch (error) {
    errorMessage.value = "❌ Beer failed to delete ❌";
    console.error("Error:", error.response?.data || error.message);
  }
}
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
    box-shadow: 0 6px 10px -2px #e2e2e2;
  }

  a {
    color: inherit;
    text-decoration: none;
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
      font-size: 12px;
      align-items: center;
      .rating-star {
        color: #fbbf24;
        font-size: 15px;
      }
      .rating-number {
        font-size: 17px;
        margin-left: 2px;
        font-weight: 700;
      }
    }
  }
}
</style>
