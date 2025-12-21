<template>
  <div class="nav-middle-buttons col-6">
    <button class="brew-buttons" :class="buttonClass">
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
  }

  .brew-buttons {
    border-radius: 20px;
    padding: 10px;
    min-width: 160px;
    max-width: 160px;
    box-shadow: 0 10px 15px -3px rgb(255 0 0 / 10%),
      0 4px 6px -4px rgb(255 0 0 / 10%);
    border: none;
    color: #fff;
    min-height: 116px;
    max-height: 116px;
    min-width: 180px;
    max-width: 180px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: left;
    // padding: 15px;

    .button-name {
      font-size: 1.05rem;
      line-height: 1.8rem;
    }
    .button-subtitle {
    }

    &.btn-log-my-brew {
      background: linear-gradient(45deg, #f59e0b, #d97706);

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
      background: #1e293b;

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
