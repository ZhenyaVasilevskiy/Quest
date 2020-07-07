<template>
  <div class="hint-modal-container" :class="{active: hintModal}">
    <component :is="currentComponent"></component>
  </div>
</template>

<script>
export default {
  name: "hint-modal-component",
  data() {
    return {};
  },
  computed: {
    hintModal() {
      return window.$hintModal.value;
    },
    currentComponent() {
      if (this.hintModal) {
        return require("./" + this.hintModal + ".vue").default;
        return this.hintModal;
      } else {
        return null;
      }
    }
  }
};
</script>