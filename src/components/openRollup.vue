<template>
  <div class="rollup" :style="style" @click="openRollup" :class="{isOpen: isOpen}">
    <button
      type="button"
      class="hint-box__close"
      @click="closeRollup"
      v-show="isOpen"
      style="z-index: 999"
    >
      <img src="../assets/images/icon-close.png" alt="close" />
    </button>
    <img :src="src" alt class="rollupImg" />
  </div>
</template>

<script>
export default {
  name: "openRollup",
  props: ["src"],
  data() {
    return {
      openRollUpStyle: {
        position: "fixed",
        top: 0,
        height: "95vh",
        overflow: "auto",
        zIndex: 999
      },
      closeRollUpStyle: {},
      style: {},
      isOpen: false
    };
  },
  methods: {
    openRollup() {
      if (this.isOpen) return;
      this.style = this.openRollUpStyle;
      this.isOpen = true;
    },
    closeRollup() {
      if (!this.isOpen) return;
      this.style = {};
      setTimeout(() => {
        this.isOpen = false;
      }, 1000);
    }
  },
  computed: {}
};
</script>
<style scoped>
.rollup {
  cursor: zoom-in;
}
.rollup.isOpen {
  cursor: default;
  background-color: #fff;
}
</style>
