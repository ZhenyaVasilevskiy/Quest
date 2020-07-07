<template>
  <div>
    <div v-html="questionInfo.questionText"></div>
    <el-select v-model="questionInfo.answer" placeholder="Выберите ответ">
      <el-option
        v-for="question in questionInfo.selectOptions"
        :key="'questionSelect' + question.value"
        :label="question.label"
        :value="question.value"
      ></el-option>
    </el-select>
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
  name: "question-select",
  data: function() {
    return {
      allFieldsFilled: false,
      answerIsCorrect: undefined
    };
  },
  watch: {
    "questionInfo.answer": function(newValue, oldValue) {
      console.log("answer " + newValue);
      let allFieldsFilled = !!this.questionInfo.answer;
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