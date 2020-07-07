<template>
  <div style="display: flex; flex-direction:column;align-items: center;">
    <img src="../../assets/images/finnavigator/bankComix.png" alt style="width: 40%" />
    <questionInputText :questionInfo="questionInfo" v-if="showQuestion"></questionInputText>
    <!-- @allFieldsFilled="sendAllFieldsFilled" -->
    <!-- <el-button @click="showQuestion = true">Далее</el-button> -->
  </div>
</template>

<script>
import questionInputText from "../questionsType/questionInputText.vue";
/*
    1) Событие что все поля заполнены или не заполнены
    2) Событие что ответ правильный или неправильный
*/
export default {
  name: "bank-question-1",
  data: function() {
    return {
      questionInfo: {
        type: "inputText",
        maxLength: 6,
        correctAnswer: "680000",
        answer: "",
        questionText:
          "Похоже, моему клиенту не обойтись без кредита. Всего ему нужно заплатить за обучение"
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