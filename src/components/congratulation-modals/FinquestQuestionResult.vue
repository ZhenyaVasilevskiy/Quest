<template>
  <div class="congratulation-modal-inner">
    <div class="congratulation-modal-box">
      <!-- <button type="button" class="hint-box__close" @click="closeModal">
        <img src="../../assets/images/icon-close.png" alt="close" />
      </button>-->
      <!-- <p class="h1">
        Правильные ответы:
        <br />
        {{getLastQuestionCorrect}} из {{getLastQuestionAll}}
      </p>-->
      <div>
        Набрано баллов:
        <span class="fw-bold">{{getLastQuestion.cost}}</span>
      </div>
      <div style="width: 100%; text-align: center;">
        Правильных ответов:
        <span class="fw-bold">{{getLastQuestion.correctCount}}</span>
      </div>
      <div style="width: 100%; text-align: center;">
        Неправильных ответов:
        <span
          class="fw-bold"
        >{{getLastQuestion.allCount - getLastQuestion.correctCount}}</span>
      </div>
      <div>
        <div>
          <span class="fw-bold">Правильный ответ</span>
          <br />
          <div v-html="getLastQuestion.correctAnswer"></div>
          <img :src="getLastQuestion.correctAnswerImg" alt />
        </div>
        <p>
          <span class="fw-bold">Подсказка:</span>
          <br />
          {{getLastQuestion.hint}}
        </p>

        <button class="button--green button button--xs" ref="nextButton" @click="closeModal">
          Далее
          <!-- :style="questionStepStyle[questionStep]" -->
        </button>
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

<style scoped>
.congratulation-modal-box {
  width: 50%;
  max-width: 700px !important;
  max-height: 80vh;
  overflow: auto;
  width: auto;
  text-align: left;
}
</style>