<template>
  <div class="hint-modal-inner">
    <div class="finquest-box">
      <div class="finquest-box__body">
        <h2 class="h2 finquest-box__title text-center">Подсказка стоит {{getHintCost}}</h2>
        <div class="finquest-box__btns-wrap">
          <button
            type="button"
            class="button button--xs button--green"
            @click="confirm"
          >Активировать подсказку?</button>
          <!-- @click="openHintModal('HintModalInner')" -->
          <button
            type="button"
            class="button button--xs button--red"
            @click="closeHintModal()"
          >Отклонить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "hint-modal-activate",
  props: {
    hintCost: Number
  },
  data() {
    return {};
  },
  methods: {
    confirm() {
      this.closeHintModal();
      this.$store.commit("setShowHint", true);
    }
  },
  computed: {
    getHintCost() {
      return this.$store.getters.getHintCost;
    }
  }
};
</script>