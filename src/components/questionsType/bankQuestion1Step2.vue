<template>
  <div style="display: flex; flex-direction:column;align-items: center;">
    <img src="../../assets/images/finnavigator/bankComix.png" alt style="width: 40%" />
    <questionInputText :questionInfo="questionInfo"></questionInputText>
  </div>
</template>

<script>
import questionInputText from "../questionsType/questionInputText.vue";
/*
    1) Событие что все поля заполнены или не заполнены
    2) Событие что ответ правильный или неправильный
*/
export default {
  name: "bank-question-2",
  data: function() {
    return {
      questionInfo: {
        type: "inputText",
        maxLength: 6,
        correctAnswer: "680000",
        answer: "",
        questionText:
          "Похоже, моему клиенту не обойтись без кредита. Всего ему нужно заплатить за обучение",
        afterQuestionText:
          "Надо подумать, как будет выгоднее — взять кредит на один год обучения или сразу на все четыре? Здесь рядом есть два банка. Схожу, уточню процентную ставку для своего клиента и получу график платежей. "
      },
      showQuestion: false
    };
  },
  mounted: function() {
    this.$nextTick(() => {
      console.log(this.$msgbox);
    });
  },
  components: {
    questionInputText
  },
  computed: {}
};
</script>

<style scoped>
</style>