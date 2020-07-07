<template>
  <div>
    <div v-html="questionInfo.questionText"></div>
    <el-input
      v-model="questionInfo.answer"
      :maxlength="questionInfo.maxLength"
      :show-word-limit="true"
    ></el-input>
    <div v-html="questionInfo.afterQuestionText"></div>
  </div>
</template>

<script>
/*
    1) Событие что все поля заполнены или не заполнены
    2) Событие что ответ правильный или неправильный
*/
export default {
  props: ["questionInfo"],
  name: "question-input-text",
  data: function() {
    return {
      allFieldsFilled: false,
      answerIsCorrect: undefined
    };
  },
  watch: {
    "questionInfo.answer": function(newValue, oldValue) {
      let allFieldsFilled =
        this.questionInfo.answer.length ==
        this.questionInfo.correctAnswer.length;
      if (allFieldsFilled != this.allFieldsFilled) {
        this.allFieldsFilled = allFieldsFilled;
        this.$emit(
          "allFieldsFilled",
          allFieldsFilled, // все поля заполнены или нет
          this.questionInfo.correctAnswer == this.questionInfo.answer, // новый ответ првильный или нет
          this.answerIsCorrect // старый ответ правильный или нет
        );
        this.answerIsCorrect =
          this.questionInfo.correctAnswer == this.questionInfo.answer;
      }
    }
  }
};
</script>

<style scoped>
</style>