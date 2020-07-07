<template>
  <div class="congratulation-modal-inner">
    <div class="congratulation-modal-box">
      <button type="button" class="hint-box__close" @click="closeModal">
        <img src="../../assets/images/icon-close.png" alt="close" />
      </button>
      <!-- <p class="h1">
        Правильные ответы:
        <br />
        {{getLastQuestionCorrect}} из {{getLastQuestionAll}}
      </p>-->
      <div>
        <p>
          <span
            class="fw-bold"
          >Добро пожаловать в район «Деньги в кошельке». Здесь вы узнаете, что такое бюджет семьи, о правилах его ведения, а также о способах планирования, которые помогут сохранить и приумножить денежные средства.</span>
        </p>
      </div>

      <!-- <div
        class="congratulation-modal-box__rang rang--violet"
      >Эксперт по финансово-регулирующим учреждениям</div>
      <div class="congratulation-modal-box__image">
        <img
          src="../../assets/images/congratulation-modals/financial-regulatory-institutions.png"
          alt="financial-regulatory-institutions"
        />
      </div>-->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "finquest-question-result",
  data() {
    return {};
  },
  methods: {
    closeModal() {
      this.closeCongratulationModal();
    }
  },
  computed: {
    ...mapGetters([
      "getLastQuestionCorrect",
      "getLastQuestionAll",
      "getLastQuestionCost",
      "getLastQuestion"
    ])
  }
};
</script>

<style>
.congratulation-modal-box {
  width: 50%;
  max-width: 700px;
  max-height: 80vh;
  overflow: auto;
  width: auto;
}
</style>