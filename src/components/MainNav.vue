<template>
  <div class="beer-nav">
    <div class="nav-top">
      <div class="container-fluid">
        <div class="nav-top-before-banner">
          <div class="title">
            <h1>BrewLog</h1>
          </div>
          <button class="profile-button">
            <span class="profile-icon">
              <i class="fa-solid fa-user"></i>
            </span>
          </button>
        </div>

        <div class="row nav-top-banner-row">
          <div class="nav-top-banner col-12">
            <div class="nav-top-banner-wrapper">
              <div class="banner-top">
                <div class="nav-brew-icon-wrapper">
                  <span class="nav-brew-icon"
                    ><i class="fa-solid fa-beer-mug-empty"></i
                  ></span>
                </div>
                <div class="total-brews-wrapper">
                  <h2>Total Brews</h2>
                  <p>{{ totalBrews }}</p>
                </div>
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
      </div>
    </div>

    <div class="container-fluid">
      <div class="nav-middle brew-buttons-row row">
        <BrewNavButton
          v-for="item in navButtons"
          :key="item.path"
          :item="item"
          :buttonClass="`btn-${item.variant}`"
        />
      </div>

      <div class="row">
        <div class="nav-bottom">
          <div class="nav-bottom-categories col-12">
            <button v-for="item in categories" class="category-items">
              <span>{{ item.name }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
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
.beer-nav {
  .nav-top-banner-row {
    margin: 0 auto;
  }
  .nav-top {
    background: linear-gradient(90deg, #d97706, #f59e0b);

    h1 {
      color: #fff;
    }
    .nav-top-before-banner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0px;

      h1 {
        margin-bottom: 0;
      }

      .profile-button {
        border-radius: 50%;
        height: 35px;
        width: 35px;
        border: none;
        background: linear-gradient(90deg, #d97706, #f59e0b);

        .profile-icon {
          opacity: 1;
          color: #fff;
        }
      }
    }

    .nav-top-banner {
      background: #fff;
      border-radius: 1rem;
      margin: 30px auto;

      position: relative;
      bottom: 25px;
      padding: 0;
    }

    .nav-top-banner-wrapper {
      margin: 16px;
    }
    h2 {
      margin: 0;
      font-size: 12px;
      color: #64748b;
    }
    .banner-top {
      display: flex;
      margin-bottom: 10px;

      .total-brews-wrapper {
        display: flex;
        flex-direction: column;
        margin-left: 15px;

        p {
          font-size: 24px;
          line-height: 2rem;
          font-weight: 700;
        }
      }

      .nav-brew-icon-wrapper {
        width: 45px;
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        color: #fff;
        background: linear-gradient(90deg, #d97706, #f59e0b);
        border-radius: 0.75rem;
      }
    }

    .banner-bottom {
      display: flex;
      justify-content: space-around;

      p {
        font-size: 20px;
        font-weight: 700;
      }
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
        border: solid 1px #e2e8f0;
        border-radius: 20px;
        padding: 8px;
        min-width: 55px;

        span {
          margin: 0 5px;
          font-weight: 500;
          font-size: 14px;
        }

        &.active {
          background-color: #000;
          color: #fff;
        }
      }
    }
  }
}
</style>
