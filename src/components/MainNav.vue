<template>
  <nav class="nav">
    <div class="container-fluid">
      <div class="nav-top row">
        <div class="nav-top-before-banner col-12">
          <div class="title">
            <h1>BrewLog</h1>
          </div>
          <div class="profile">
            <i class="fa-solid fa-user"></i>
          </div>
        </div>

        <div class="row nav-top-banner-row">
          <div class="nav-top-banner col-12">
            <div class="banner-top">
              <i class="fa-solid fa-beer-mug-empty"></i>
              <h2>Total Brews</h2>
              <p>{{ totalBrews }}</p>
            </div>
            <div class="banner-bottom row">
              <div class="col-6">
                <h2>My Brews</h2>
                <p>{{ myBrews }}</p>
              </div>
              <div class="col-6">
                <h2>Tasted</h2>
                <p>{{ tasted }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="row"> -->
      <div class="nav-middle brew-buttons-row row">
        <BrewNavButton
          v-for="item in navButtons"
          :key="item.path"
          :item="item"
          :buttonClass="`btn-${item.variant}`"
        />
        <!-- </div> -->
      </div>

      <div class="row">
        <div class="nav-bottom">
          <div class="nav-bottom-categories col-12">
            <button v-for="item in categories" class="category-items">
              {{ item.name }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import BrewNavButton from "./BrewNavButton.vue";
export default {
  components: {
    BrewNavButton,
  },
  data: () => ({
    totalBrews: 1,
    myBrews: "2",
    tasted: "3",
    navButtons: [
      {
        name: "Log My Brew",
        subtitle: "Add Homebrew Batch",
        path: "/log-my-brew",
        variant: "log-my-brew",
      },
      {
        name: "Log Tasting",
        subtitle: "Save Beer I Tried",
        path: "/log-tasting",
        variant: "log-tasting",
      },
    ],
    categories: [
      {
        name: "All",
        path: "/log-my-brew",
      },
      {
        name: "My Brews",
        path: "/log-tasting",
      },
      {
        name: "Tasted",
        path: "/log-tasting",
      },
      {
        name: "Favourites",
        path: "/log-tasting",
      },
    ],
  }),
  methods: {},
};
</script>

<style lang="scss">
.nav {
  .nav-top-banner-row {
    margin: 0 auto;
  }
  .nav-top {
    background: #f59e0b;

    .nav-top-before-banner {
      display: flex;
      justify-content: space-between;
    }

    .nav-top-banner {
      background: #fff;
      border-radius: 1rem;
      margin: 30px auto;
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
      position: relative;
      bottom: 25px;
    }

    .banner-top {
      display: flex;
      justify-content: space-around;
    }

    .banner-bottom {
      display: flex;
      justify-content: space-around;
    }
  }
  .nav-middle {
    // display: flex;
    // flex-direction: row;
    // justify-content: space-around;
    position: relative;
    bottom: 35px;

    // &.brew-buttons-row {
    //   justify-content: space-around;
    // }
  }

  .nav-bottom {
    .nav-bottom-categories {
      display: flex;
      justify-content: space-around;
      position: relative;
      bottom: 10px;
      padding-bottom: 10px;

      .category-items {
        background-color: #fff;
        border: solid 1px #000;
        border-radius: 20px;
        padding: 12px;
        min-width: 60px;

        &.active {
          background-color: #000;
        }
      }
    }
  }
}
</style>
