<template>
  <div>
    <div v-html="questionInfo.questionText"></div>
    <div
      @dragstart="drag"
      class="dragg"
      :data-variant="variantKey"
      :class="options.includes(variant.answer) ? 'dragg-disable' : ''"
      :draggable="!options.includes(variant.answer)"
      v-for="(variant, variantKey) in questionInfo.variants"
      :key="'draggabeVariant' + variantKey"
    >{{ variant.answer }}</div>
    <ul class="draggQuestionsList">
      <li
        v-for="(question, questionKey) in questionInfo.questions"
        :key="'questionDraggable' + questionKey"
      >
        <span>{{question.question}}</span>
        <div class @drop="drop" @dragover="allowDrop" :data-answer="questionKey">
          <div class="dragg-zone">{{question.answer == '' ? '________________' : question.answer}}</div>
        </div>
      </li>
    </ul>
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
  name: "question-draggable",
  data: function() {
    return {
      allFieldsFilled: false,
      answerIsCorrect: undefined,
      curDraggableEl: undefined
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "q1",
        disabled: false,
        ghostClass: "ghost"
      };
    },
    options() {
      return Object.values(this.questionInfo.questions).map(
        item => item.answer
      );
    }
  },
  methods: {
    drag(ev) {
      ev.dataTransfer.setData("variant", ev.target.dataset.variant);
      ev.dataTransfer.setData("textFrom", ev.target.innerText);
    },
    allowDrop(ev) {
      ev.preventDefault();
    },
    drop(ev) {
      /*
        1) Какой вариант ответа был ранее?
        2) Он правильный или нет?
      */
      ev.preventDefault();
      let variant = ev.dataTransfer.getData("variant");
      let answer = ev.currentTarget.dataset.answer;
      let correctAnswers = this.questionInfo.correctAnswer;
      let prevAnswer = this.questionInfo.questions[answer].answer;
      let correctAnswerForField = this.questionInfo.variants[
        correctAnswers[answer] - 1
      ].answer;
      let prevAnswerIsCorrect;
      if (prevAnswer == "") {
        prevAnswerIsCorrect = undefined;
      } else if (correctAnswerForField == prevAnswer) {
        prevAnswerIsCorrect = true;
      } else {
        prevAnswerIsCorrect = false;
      }

      this.questionInfo.questions[answer].answer = this.questionInfo.variants[
        variant
      ].answer;

      let curAnswer = this.questionInfo.questions[answer].answer;
      let curAnswerIsCorrect;
      if (correctAnswerForField == curAnswer) {
        curAnswerIsCorrect = true;
      } else {
        curAnswerIsCorrect = false;
      }
      let allFieldsFilled = this.options.filter(item => item == "").length == 0;
      this.$emit(
        "allFieldsFilled",
        // allFieldsFilled, // все поля заполнены или нет
        true, // все поля заполнены или нет
        curAnswerIsCorrect, // новый ответ првильный или нет
        prevAnswerIsCorrect // старый ответ правильный или нет
      );
    }
  },
  watch: {
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
.draggQuestionsList li {
  margin-bottom: 10px;
  margin-left: 5px;
}
.dragg-zone {
  padding: 5px;
  border: 1px solid #000;
  display: inline-block;
  border-radius: 4px;
}
</style>