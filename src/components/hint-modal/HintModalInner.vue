<template>
  <div class="hint-modal-inner">
    <!-- <div class="finquest-box question-box">
            <div class="question-box__header">
                <div class="question-box__header__item">
                    <v-icons name="star"></v-icons>
                    <span class="fw-bold">175</span>
                </div>
                <div class="question-box__header__item">
                    <v-icons name="stopwatch"></v-icons>
                    <span>00:33</span>
                </div>
            </div>
            <div class="question-box__inner">
                <h2 class="h2 question-box__title">Что такое деньги?</h2>
                <div class="question-box__questions">
                    <div v-for="(answer, index) in answersArr" class="question-box__questions__item-col" :key="`answer`+index">
                        <button type="button" class="question-box__questions__item" :class="{'right-answer': rightAnswer  === index && userAnswer !== null, 'error-answer': rightAnswer !== index && userAnswer === index}" @click="hintDone(index)">
                            <span>{{answer}}</span>
                        </button>
                    </div>
                </div>
            </div>
    </div>-->
    <div class="finquest-box hint-box">
      <div class="finquest-box__body">
        <button type="button" class="hint-box__close" @click="closeModal">
          <img src="../../assets/images/icon-close.png" alt="close" />
        </button>
        <div class="hint-box__title">
          <img src="../../assets/images/finquest/finquest-dog.png" alt="dog" />
          <h2 class="h2">Подсказка</h2>
        </div>
        <p>{{ setHintText() }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "hint-modal-inner",
  data() {
    return {
      // userAnswer: null,
      // rightAnswer: 0,
      // answersArr: [
      //     'Золото', 'Бумажные деньги', 'Всеобщий эквивалент', 'Кредитные деньги'
      // ]
    };
  },
  methods: {
    closeModal() {
      this.closeHintModal();
      this.$store.dispatch("initChangePoint", false);
      this.$store.dispatch("initHintText", null);
    },
    setHintText() {
      return this.$store.getters.getHintText;
    }
    // hintDone(index) {
    //     this.userAnswer = index;
    //     setTimeout(() => {
    //         this.closeHintModal();
    //         this.openCongratulationModal('CongratulationModalInner');
    //     }, 1000);
    // }
  }
};
</script>