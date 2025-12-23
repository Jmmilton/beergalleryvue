<template>
  <div class="nav-middle-buttons col-6">
    <button class="brew-buttons" :class="buttonClass">
      <div class="button-wrapper">
        <div class="icon-row">
          <!-- Named slot for icons - provides defaults -->
          <slot name="icon">
            <i class="btn-custom-icon"></i>
          </slot>
          <slot name="action-icon">
            <i class="fa-solid fa-plus"></i>
          </slot>
        </div>
        <div class="button-content">
          <!-- Default slot for full content override, or use name/subtitle -->
          <slot :item="item">
            <div class="button-name">{{ item.name }}</div>
            <div class="button-subtitle">{{ item.subtitle }}</div>
          </slot>
        </div>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    buttonClass: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss">
.nav-middle-buttons {
  display: flex;
  justify-content: center;
  .icon-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
  }

  .brew-buttons {
    border-radius: 20px;
    padding: 10px;
    // min-width: 160px;
    // max-width: 160px;
    border: none;
    color: #fff;
    // min-height: 116px;
    // max-height: 116px;
    // min-width: 190px;
    // max-width: 190px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: left;
    // padding: 15px;

    @media (min-width: 426px) {
      min-height: 116px;
      max-height: 116px;
      min-width: 190px;
      max-width: 190px;
    }

    @media (min-width: 580px) {
      min-height: 130px;
      max-height: 130px;
      min-width: 210px;
      max-width: 210px;
    }

    .button-wrapper {
      display: flex;
      flex-direction: column;
      margin: 5px;
    }

    .button-name {
      font-size: 1.05rem;
      line-height: 1.8rem;
    }
    .button-subtitle {
    }

    &.btn-log-my-brew {
      background: linear-gradient(45deg, #f59e0b, #d97706);
      box-shadow: 0 6px 10px -2px rgb(124 45 18 / 35%),
        0 2px 4px -2px rgb(124 45 18 / 35%);

      &:hover {
        box-shadow: 0 10px 14px -3px rgb(120 53 15 / 45%),
          0 4px 6px -3px rgb(120 53 15 / 40%);
      }

      .btn-custom-icon {
        &:before {
          content: "\f0c3";
          font-family: "Font Awesome 7 Free";
          font-weight: 900;
          margin-right: 0.5rem;
          font-style: normal;
          font-size: 1.5rem;
          line-height: 2rem;
        }
      }
    }

    &.btn-log-tasting {
      background: linear-gradient(45deg, #334155, #1e293b);
      box-shadow: 0 6px 10px -2px rgb(15 23 42 / 30%),
        0 2px 4px -2px rgb(15 23 42 / 25%);

      &:hover {
        box-shadow: 0 14px 20px -3px rgb(15 23 42 / 45%),
          0 6px 8px -4px rgb(15 23 42 / 40%);
      }

      .btn-custom-icon {
        &:before {
          font-family: "Font Awesome 7 Free";
          font-weight: 900;
          content: "\f72f";
          margin-left: 0.5rem;
          display: inline-block;
          -webkit-transform: rotate(45degdeg);
          transform: rotate(45deg);
          font-style: normal;
          font-size: 1.5rem;
          line-height: 2rem;
        }
      }
    }
  }
}
</style>
