<template>
  <div>
    <div v-html="questionInfo.questionText"></div>
    <draggable :list="questionInfo.items" class="list-group" ghost-class="ghost">
      <div
        class="list-group-item"
        v-for="element in questionInfo.items"
        :key="'sortableAnswer'+element.position"
      >{{element.position}}{{ element.answer }}</div>
    </draggable>
    <div v-html="questionInfo.afterQuestionText"></div>
  </div>
</template>

<script>
/*
    1) Событие что все поля заполнены или не заполнены
    2) Событие что ответ правильный или неправильный
*/
import draggable from "vuedraggable";
export default {
  props: ["questionInfo"],
  name: "question-sortable",
  components: {
    draggable
  },
  data: function() {
    return {
      allFieldsFilled: false,
      answerIsCorrect: undefined
    };
  },
  watch: {
    "questionInfo.items": function(newValue, oldValue) {
      Object.values(newValue)
        .map(item => item.position)
        .forEach((item2, item2Position) => {
          console.log(
            Object.values(this.questionInfo.correctAnswer)[item2Position]
          );
          this.$emit(
            "allFieldsFilled",
            true, // все поля заполнены или нет
            Object.values(this.questionInfo.correctAnswer)[item2Position] ==
              item2, // новый ответ првильный или нет
            this.questionInfo.prevAnswerIsCorrect // старый ответ правильный или нет
          );
        });
    }
    // "questionInfo.answer": function(newValue, oldValue) {
    //   console.log("answer " + newValue);
    //   let allFieldsFilled = !!this.questionInfo.answer;
    //   if (allFieldsFilled != this.allFieldsFilled) {
    //     this.allFieldsFilled = allFieldsFilled;
    //     this.$emit(
    //       "allFieldsFilled",
    //       allFieldsFilled, // все поля заполнены или нет
    //       this.questionInfo.correctAnswer == this.questionInfo.answer, // новый ответ првильный или нет
    //       this.answerIsCorrect // старый ответ правильный или нет
    //     );
    //     this.answerIsCorrect =
    //       this.questionInfo.correctAnswer == this.questionInfo.answer;
    //   }
    // }
  }
};
</script>

<style scoped>
</style>