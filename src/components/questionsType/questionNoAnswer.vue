<template>
  <div>
    <div v-html="questionInfo.questionText"></div>
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
    return {};
  },
  mounted: function() {
    this.$nextTick(() => {
      this.$emit(
        "allFieldsFilled",
        true, // все поля заполнены или нет
        true, // новый ответ првильный или нет
        undefined // старый ответ правильный или нет
      );
    });
  }
};
</script>

<style scoped>
</style>