<template>
  <button class="finquest-box__hint--mini" @click="openHint()">
    <span class="finquest-box__hint__name">
      <template v-if="!hintIsGetting">Нужна подсказка?</template>
      <template v-else-if="hintIsGetting">Прочитать подсказку</template>
    </span>
  </button>
</template>

<script>
export default {
  props: ["hintCost", "hint", "questionIndex"],
  data: () => {
    return {
      hintIsGetting: false
    };
  },
  methods: {
    openHint() {
      if (this.hintIsGetting) {
        this.readTip();
      } else {
        this.getTip();
      }
    },

    readTip() {
      this.$alert(`<div class="q__text">${this.hint}</div>`, `Подсказка`, {
        confirmButtonText: "OK",
        customClass: "fin-modal",
        confirmButtonClass: "button--green",
        dangerouslyUseHTMLString: true,
        showClose: false,
        confirmButtonText: "Далее"
      });
    },

    getTip() {
      let tipTitle = `Подсказка стоит баллов: ${this.hintCost} `;
      this.$confirm(``, tipTitle, {
        confirmButtonText: "Активировать подсказку",
        cancelButtonText: "Отклонить",
        customClass: "fin-modal",
        dangerouslyUseHTMLString: true,
        showClose: false,
        cancelButtonClass: "button--red",
        confirmButtonClass: "button--green"
      }).then(() => {
        this.hintIsGetting = true;
        // if (this.questionNumber == -1) {
        // }
        this.$store.commit("minusPointsCount", this.hintCost);
        this.readTip();
        this.$emit("get");
      });
    }
  }
};
</script>

<style scoped>
</style>