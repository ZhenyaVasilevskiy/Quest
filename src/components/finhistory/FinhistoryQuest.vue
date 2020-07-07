<template>
  <div class="finhistory-quest-inner">
    <template v-if="gameStep.isQuestion">
      <el-button
        class="finhistory-quest-nextButton fihistoryNextBtn"
        @click="questionStep++"
        type="success"
        v-if="questionStep < 2"
      >Далее</el-button>
      <!-- <template v-if="questionStep == 0">
        <el-button class="finhistory-quest-nextButton" @click="questionStep++" type="success">Далее</el-button>
      </template>
      <template v-if="questionStep == 1">
        <div class="finhistory-quest-2">
          <p class="finhistory-quest-text" v-html="gameStep.question"></p>
          <el-link
            style="font-size: 20px; font-weight: 600; padding: 5px; background-color: rgba(255,255,255,.5); border: 1px solid #000; margin-bottom: 5px"
            icon="el-icon-view"
            type="success"
            target="_blank"
            :href="gameStep.theory"
          >Читать теорию</el-link>
          <p class="finhistory-quest-tip" v-if="gameStep.questionTip">{{gameStep.questionTip}}</p>
          <template v-for="(question, questionIndex) in gameStep.questions">
            <h5
              class="questionText"
              :key="'questionText' + questionIndex"
            >{{gameStep.questionTexts[questionIndex]}}</h5>
            <el-checkbox-group
              v-model="gameStep.answers[questionIndex]"
              :key="'question' + questionIndex"
              :min="0"
              :max="gameStep.maxAnswers[questionIndex]"
              class="finhistory-quest-answer"
            >
              <el-checkbox
                v-for="(answer, answerKey) in question"
                :key="'answer'+answerKey"
                :label="answer.value"
              >{{answer.label}}</el-checkbox>
            </el-checkbox-group>
          </template>
          <el-button
            class="finhistory-quest-nextButton"
            :disabled="isDisabledAnswerButton"
            @click="setAnswer"
          >Ответить</el-button>
        </div>
      </template>-->
      <el-row class="q" type="flex">
        <el-col
          :md="{span: 18}"
          :lg="{span: 8}"
          class="q__block q__block--1"
          v-show="canShowStep(1)"
          :style="{opacity: questionStep >= 0 ? 1 : 0}"
        >
          <div class="q__block-inner" v-show="questionStep >= 0">
            <img src="../../assets/images/finhistory/npc.png" class="npc npc--q" />
            <h1 class="q__title">{{gameStep.stationName}}</h1>
            <div class="q__text" v-html="gameStep.text"></div>
            <div class="q__text" v-html="gameStep.theoryText" style="margin-top: 15px;"></div>
            <!-- <h1 class="q__title">Теория</h1> -->
            <!-- <openRollup :src="gameStep.theory"></openRollup> -->

            <el-button
              class="readTheoryBtn"
              icon="el-icon-view"
              type="info"
              target="_blank"
              :href="gameStep.theory"
              v-if="!rollUpIsOpen"
              @click="rollUpIsOpen = true"
            >{{gameStep.theoryBtnText}}</el-button>
            <div class="theoryText" v-if="rollUpIsOpen">
              <!-- <img :src="gameStep.theory" alt /> -->
              <div v-html="gameStep.theory" class="theoryText__inner"></div>
            </div>
          </div>
        </el-col>
        <el-col
          :md="{span: 18}"
          :lg="{span: 7}"
          class="q__block q__block--3"
          :style="{opacity: questionStep >= 1 ? 1 : 0}"
        >
          <!-- v-show="canShowStep(2)" -->
          <div class="q__block-inner" v-show="questionStep >= 1">
            <h1 class="q__title">Задание</h1>
            <div class="q__text" v-html="gameStep.question"></div>
            <div class="q__text" v-html="gameStep.tip"></div>
            <div class="q__text" style="margin-top: 15px;">
              <strong v-html="gameStep.task"></strong>
            </div>
            <p class="finhistory-quest-tip" v-if="showQuestionHint">qwe{{gameStep.questionTip}}</p>
          </div>
        </el-col>
        <el-col
          :md="{span: 18}"
          :lg="{span: 8}"
          class="q__block q__block--5"
          :style="{opacity: questionStep >= 2 ? 1 : 0}"
        >
          <!-- v-show="canShowStep(3)" -->
          <div class="q__block-inner" v-show="questionStep >= 2">
            <strong
              class="questionText"
              style="font-syle: normal !important;"
            >{{gameStep.questionRule}}</strong>
            <!-- :key="'questionTitle' + questionIndex" -->
            <template v-for="(question, questionIndex) in gameStep.questions">
              <div
                class="questionText q__text"
                :key="'questionText' + questionIndex"
                style="margin: 15px 0;"
              >{{gameStep.questionTexts[questionIndex]}}</div>
              <el-checkbox-group
                v-model="gameStep.answers[questionIndex]"
                :key="'question' + questionIndex"
                :min="0"
                :max="gameStep.maxAnswers[questionIndex]"
                class="finhistory-quest-answer"
              >
                <el-checkbox
                  v-for="(answer, answerKey) in question"
                  :key="'answer'+answerKey"
                  :label="answer.value"
                  class="q__checkbox"
                >{{answer.label}}</el-checkbox>
              </el-checkbox-group>
            </template>
            <button
              class="finhistory-quest-nextButton"
              :disabled="isDisabledAnswerButton"
              :class="{
                    'nextButton--allowed': !isDisabledAnswerButton,
                    'nextButton--notallowed': isDisabledAnswerButton
                }"
              @click="setAnswer"
            >
              <span>Ответить</span>
            </button>
            <p v-if="isDisabledAnswerButton" class="form-error-message">Дайте ответ на все вопросы</p>
            <!-- <button class="finquest-box__hint" @click="openHint" v-if="!showQuestionHint">
              <span class="finquest-box__hint__name">
                <template>Нужна подсказка?</template>
              </span>
            </button>-->
            <hintBtn
              class="finquest-box__hint finhistory-hint"
              :hintCost="gameStep.isQuestion ? 1 : 5"
              :hint="gameStep.questionTip ? gameStep.questionTip : gameStep.tip"
              :questionIndex="-1"
              @get="showQuestionHint = true"
            ></hintBtn>
          </div>
        </el-col>
        <ul class="finquest-steps-list h-reset-list">
          <li
            class="finquest-steps-list__item"
            :class="{ 'is-active': step === i }"
            v-for="i of 3"
            :key="`list-` + i"
            @click="step = i"
          >
            <span>{{ i }}</span>
          </li>
        </ul>
      </el-row>
    </template>
    <template v-else>
      <div class="finhistory-quest-1" v-if="questionStep == 0">
        <h1 class="finhistory-quest-title">{{gameStep.title}}</h1>
        <img src="../../assets/images/finhistory/npc.png" class="npc" />
        <p class="finhistory-quest-text" v-html="gameStep.text"></p>
        <p class="finhistory-quest-tip" v-if="showStepHint">{{gameStep.tip}}</p>
        <!-- <button
          class="finquest-box__hint"
          @click="openHint"
          v-if="!showStepHint"
          style="bottom: 7%; right: -10%"
        >
          <span class="finquest-box__hint__name">
            <template>Нужна подсказка?</template>
          </span>
        </button>-->
        <hintBtn
          class="finquest-box__hint finhistory-hint"
          :hintCost="gameStep.isQuestion ? 1 : 5"
          :hint="gameStep.questionTip ? gameStep.questionTip : gameStep.tip"
          :questionIndex="-1"
        ></hintBtn>
      </div>
    </template>
  </div>
</template>

<script>
import openRollup from "../openRollup.vue";
import hintBtn from "../main/hintBtn.vue";
import congratulationWindow from "../main/congratulationWindow.vue";
export default {
  props: ["gameStep"],
  name: "finhistory-quest",
  data: function() {
    return {
      questionStep: 0,
      //   tipIsGetting: false,
      step: 1,
      rollUpIsOpen: false,
      showQuestionHint: false,
      showStepHint: false
    };
  },
  components: {
    openRollup,
    hintBtn
  },
  methods: {
    setAnswer() {
      this.showQuestionHint = false;
      let newPoints;
      let questionsCount = this.gameStep.questions.length;
      let correctAnswers = 0;
      let incorrectAnswers = 0;
      this.gameStep.answers.forEach((question, questionIndex) => {
        question.forEach(answer => {
          let inCorrectAnswer = this.gameStep.answer[questionIndex].includes(
            answer
          );
          if (inCorrectAnswer) {
            correctAnswers++;
          } else {
            incorrectAnswers++;
          }
        });
      });
      let correctCost = this.gameStep.rewards.correct;
      if (correctAnswers * correctCost > 0) {
        newPoints = correctAnswers * correctCost;
      } else {
        newPoints = this.gameStep.rewards.zeroCorrect;
      }
      this.$store.dispatch("initChangePoint", false);
      this.$store.commit("setLastQuestion", {
        cost: newPoints,
        allCount: questionsCount,
        correctCount: correctAnswers,
        correctAnswer: this.gameStep.correctAnswer,
        hint: this.gameStep.questionTip
      });
      this.questionStep = 0;
      this.$store.commit("addPointsCount", newPoints);
      this.$alert(
        `
        <h3 class="fin-modal-title">Набрано баллов: <strong>${newPoints}</strong></h3>
        <h3 class="fin-modal-title">Правильных ответов: <strong>${correctAnswers}</strong></h3>
        <h3 class="fin-modal-title">Неправильных ответов: <strong>${questionsCount -
          correctAnswers}</strong></h3>
        <div style="margin: 10px 0;">
            <h5>Правильный ответ:</h5>
            ${this.gameStep.correctAnswer}
        </div>
        <div>
            <h5>Подсказка:</h5>
            ${this.gameStep.questionTip}
        </div>
      `,
        "",
        {
          confirmButtonText: "OK",
          customClass: "fin-modal",
          dangerouslyUseHTMLString: true,
          showClose: false,
          confirmButtonText: "Далее",
          confirmButtonClass: "button--green",
          callback: () => {
            // this.tipIsGetting = false;
            this.showQuestionHint = false;
            this.showStepHint = false;
            this.rollUpIsOpen = false;
            if (
              this.$store.getters.getFinhistory.gameStep <
              this.$store.getters.getFinhistory.gameSteps.length - 1
            ) {
              this.$store.commit(
                "setFinhistoryGameStep",
                this.$store.getters.getFinhistory.gameStep + 1
              );
            } else {
              this.$store.commit("setFinhistoryIsComplete", true);
              const h = this.$createElement;
              this.$msgbox({
                title: "",
                message: h(congratulationWindow, {
                  props: {
                    maxReward: this.$store.getters.getFinhistoryMaxReward,
                    pointReward: this.$store.getters.getPointReward,
                    quest: "finhistory"
                  }
                }),
                confirmButtonText: "Далее",
                confirmButtonClass: "button--green",
                //   showConfirmButton: false,
                showClose: false
              }).then(() => {
                window.open(
                  "https://docs.google.com/forms/d/e/1FAIpQLSfszClcl_o8Q0Am7CeeGch0s1KfwQB9f8V-wCxuxy-GM30RVg/viewform"
                );
                this.$router.push("/");
              });
              //   this.$alert(
              //     `<h1>Поздравляем!</h1>Вы набрали ${this.$store.getters.getPointReward} баллов`,
              //     "",
              //     {
              //       confirmButtonText: "OK",
              //       customClass: "fin-modal",
              //       dangerouslyUseHTMLString: true,
              //       showClose: false,
              //       confirmButtonText: "Далее",
              //       callback: () => {
              //         this.$router.push("/");
              //       }
              //     }
              //   );
            }
            // const h = this.$createElement;
            // this.$msgbox({
            //   title: "",
            //   message: h(congratulationWindow, {
            //     props: {
            //       maxReward: this.$store.getters.getFinhistoryMaxReward,
            //       pointReward: this.$store.getters.getPointReward,
            //       quest: "finhistory"
            //     }
            //   }),
            //   confirmButtonText: "Далее",
            //   confirmButtonClass: "button--green",
            //   //   showConfirmButton: false,
            //   showClose: false
            // }).then(() => {
            //   window.open(
            //     "https://docs.google.com/forms/d/e/1FAIpQLSfszClcl_o8Q0Am7CeeGch0s1KfwQB9f8V-wCxuxy-GM30RVg/viewform"
            //   );
            //   this.$router.push("/");
            // });
          }
        }
      );
      this.$emit("complete");
    },
    openHint() {
      this.getTip();
      //   if (this.tipIsGetting) {
      //     this.readTip();
      //   } else {
      //     this.getTip();
      //   }
    },
    readTip() {
      this.$alert(
        `<div class="q__text">${this.gameStep.questionTip}</div>`,
        `Подсказка`,
        {
          confirmButtonText: "OK",
          customClass: "fin-modal",
          confirmButtonClass: "button--green",
          dangerouslyUseHTMLString: true,
          showClose: false,
          confirmButtonText: "Далее"
        }
      );
    },
    getTip() {
      let tipTitle = "";
      let tipCost = 0;
      if (this.gameStep.isQuestion) {
        tipTitle = "Подсказка стоит 5 баллов";
        tipCost = 5;
      } else {
        tipTitle = "Подсказка стоит 1 балл";
        tipCost = 1;
      }
      this.$confirm(``, tipTitle, {
        confirmButtonText: "Активировать подсказку",
        cancelButtonText: "Отклонить",
        customClass: "fin-modal",
        dangerouslyUseHTMLString: true,
        showClose: false,
        cancelButtonClass: "button--red",
        confirmButtonClass: "button--green"
      }).then(() => {
        //   this.tipIsGetting = true;
        if (this.gameStep.isQuestion) {
          this.showQuestionHint = true;
        } else {
          this.showStepHint = true;
        }
        this.$store.commit("minusPointsCount", tipCost);
        // this.readTip();
      });
    },
    canShowStep(step) {
      let screenWidth = screen.width;
      let canShow = false;
      if (screenWidth >= 1200) {
        canShow = true;
      } else {
        if (this.step == step) {
          canShow = true;
        } else [(canShow = false)];
      }

      return canShow;
    }
  },
  computed: {
    isDisabledAnswerButton() {
      return (
        this.gameStep.answers.filter(answer => answer.length == 0).length > 0
      );
    }
  },
  destroyed: function() {
    // this.questionStep = 0;
    // this.tipIsGetting = false;
    // this.step = 1;
    // this.rollUpIsOpen = false;
    this.showQuestionHint = false;
  }
};
</script>

<style scoped>
.finhistory-hint {
  font-family: inherit;
  font-style: italic;
  position: fixed;
  bottom: 7% !important;
  right: -10% !important;
}
.finhistory-hint >>> .finquest-box__hint__name {
  color: #324b59 !important;
}
>>> .theoryText__title {
  font-size: 20px;
}
>>> .theoryText__ul {
  margin-top: 10px;
  margin-bottom: 10px;
}
>>> .theoryText__li {
  margin-top: 10px;
  margin-bottom: 10px;
}
>>> .theoryText__table {
  width: 100%;
}
>>> .theoryText__table thead {
  text-align: center;
  border: 1px solid;
}
>>> .theoryText__table td {
  width: 50%;
  border: 1px solid;
  padding: 5px;
}
>>> .theoryText__formula {
  width: 100%;
  display: flex;
}
>>> .theoryText__formula-main {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.theoryText__formula-top {
  font-size: 13px;
  border-bottom: 1px solid;
}
.finhistory-quest-inner {
  font-family: "Times New Roman", cursive;
  font-style: italic;
  padding: 10px;
  height: 90%;
  overflow: auto;
  border: 1px solid transparent;
  border-image-slice: 4 5 7 4;
  border-image-width: 3px;
  border-image-outset: 0px 0px 0px 0px;
  border-image-repeat: round round;
  border-image-source: url("data:image/png;base64,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");
}
.finhistory-quest-title {
  font-size: 24px;
  color: #000;
}
.finhistory-quest-text {
  font-size: 17px;
  color: #000;
  line-height: 1.2;
}
.finhistory-quest-tip {
  line-height: 16px;
  font-weight: 600;
  font-size: 16px;
  margin: 15px 0;
  width: 90%;
  color: #000;
  padding: 10px;
  border: 1px solid transparent;
  border-image-slice: 10 15 10 15;
  border-image-width: 7px;
  border-image-outset: 0px 0px 0px 0px;
  border-image-repeat: round round;
  border-image-source: url("data:image/png;base64,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");
}
.finhistory-quest-nextButton {
  margin-top: 10px;
  font-family: "Times New Roman", cursive;
  font-style: italic;
  font-weight: 600;
  color: #000;
  border: 1px solid;
  background-color: transparent;
  border-image-slice: 42 42 42 42;
  border-image-width: 42px 42px 42px 42px;
  border-image-outset: 0px 0px 0px 0px;
  border-image-repeat: round round;
  border-image-source: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL4AAAA+CAMAAACiGlF3AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAUdQTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzQoxCwAAAG10Uk5T/wkFAAGZAw8sKHrlUBmPf8EGBwzNEXY8v5vxtiMUiVvtFQoTaB1tYTJpCAI7zzoW+yUQKWYbNYYq2LUNGiAkQUlfoCdFSEOx79SpvAsEEroXNtajYB9VPSEOSzOcMINHJjEr4VrEHnVl8zdYNMQUSagAAAJUSURBVHic7dpZV9NAGIDhbxaS1mprBurCUgRM6UKtFRVKaSkuxSVB3NBWVMQNl/9/7cy0cJAcFeeC76Rn3oukzDTJc4a0vQkAoYxxwkcYY46bgL+XPHhxJjKVgrPnIJ057zmCjDIGY1kPLly8ROEyH++/Y2JSbqbUJXLTeuDKzKxH6dzgBFd9yOsXvt7OF4r/wKhKkl5ekBdYKPPZyYoeu9afmj/B4b9VvV6TW3rDK/HFm7fgNgArAHiJKbIkx5drtcH76v1dHkYFXaHpwejh0hzMnyTB5UrpGoxTWAWoQLO1DLDWbjX/x64V61XXrVEqWPLO3XsZcPh9AHlWaHagED1kY1EuPn0ADx8dHW0//tMl3OgQDUIW0zR/dQ2bYZriO3wTm2Ga4ifZE2yGaYq/FQI2wzTF92ccbIZpiv/U5dgM0xSfFGN98wjxDJthmubDc2yGafpnixBshmmK/+Kli80wTfG3IdYfXUj72AzTlL7+KovNME3xU6+72AzT9L3Ti/W9n4j5R9fykVL2Nxux5sd89S0fq2HgT+9gM0zT/PF4r34u3vy38eZvL2EzTBuGbx7LR8ryMbN8zCwfM8vHzPIxs3zMLB8zy8fM8jGzfMwsH7Ph4J9yW0G3o540rUNG/70DjTInAqAYMsbLEHheSAL/+GHveqcNjfRebRok2M3JfepDVj95226px9H4ygQVzepeSAmlZU+IMTn18cixOQTv8ToA+S580gv5+Uvyq9rvb4ZCOM5cyHt7Xthyd7+VKHWa9Luca/9Q/6FK5DyFn/t6/ws54aaCA4tKhQAAAABJRU5ErkJggg==");
  background-size: contain;
  width: 120px;
  height: 42px;
}
.finhistory-quest-nextButton:focus,
.finhistory-quest-nextButton:hover:not(.nextButton--notallowed) {
  color: #000;
  background-color: #3dc479;
  cursor: pointer;
}
.nextBtn--allowed {
  background-color: #3dc479;
}
.nextButton--notallowed {
  opacity: 0.5;
  background-color: #fa4848;
}
>>> .finhistory-quest-answer.el-checkbox-group {
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
>>> .finhistory-quest-answer .el-checkbox__input {
  display: none;
}
>>> .finhistory-quest-answer
  .el-checkbox__input.is-checked
  + .el-checkbox__label {
  color: #000 !important;
}
>>> .finhistory-quest-answer .el-checkbox__label {
  padding: 0 5px !important;
}
>>> .finhistory-quest-answer .el-checkbox {
  margin: 0;
  margin-bottom: 5px;
  color: #000;
  white-space: normal;
  border: 1px solid;
  background-color: transparent;
  border-image-slice: 42 42 42 42;
  border-image-width: 42px 42px 42px 42px;
  border-image-outset: 0px 0px 0px 0px;
  border-image-repeat: round round;
  border-image-source: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL4AAAA+CAMAAACiGlF3AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAUdQTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzQoxCwAAAG10Uk5T/wkFAAGZAw8sKHrlUBmPf8EGBwzNEXY8v5vxtiMUiVvtFQoTaB1tYTJpCAI7zzoW+yUQKWYbNYYq2LUNGiAkQUlfoCdFSEOx79SpvAsEEroXNtajYB9VPSEOSzOcMINHJjEr4VrEHnVl8zdYNMQUSagAAAJUSURBVHic7dpZV9NAGIDhbxaS1mprBurCUgRM6UKtFRVKaSkuxSVB3NBWVMQNl/9/7cy0cJAcFeeC76Rn3oukzDTJc4a0vQkAoYxxwkcYY46bgL+XPHhxJjKVgrPnIJ057zmCjDIGY1kPLly8ROEyH++/Y2JSbqbUJXLTeuDKzKxH6dzgBFd9yOsXvt7OF4r/wKhKkl5ekBdYKPPZyYoeu9afmj/B4b9VvV6TW3rDK/HFm7fgNgArAHiJKbIkx5drtcH76v1dHkYFXaHpwejh0hzMnyTB5UrpGoxTWAWoQLO1DLDWbjX/x64V61XXrVEqWPLO3XsZcPh9AHlWaHagED1kY1EuPn0ADx8dHW0//tMl3OgQDUIW0zR/dQ2bYZriO3wTm2Ga4ifZE2yGaYq/FQI2wzTF92ccbIZpiv/U5dgM0xSfFGN98wjxDJthmubDc2yGafpnixBshmmK/+Kli80wTfG3IdYfXUj72AzTlL7+KovNME3xU6+72AzT9L3Ti/W9n4j5R9fykVL2Nxux5sd89S0fq2HgT+9gM0zT/PF4r34u3vy38eZvL2EzTBuGbx7LR8ryMbN8zCwfM8vHzPIxs3zMLB8zy8fM8jGzfMwsH7Ph4J9yW0G3o540rUNG/70DjTInAqAYMsbLEHheSAL/+GHveqcNjfRebRok2M3JfepDVj95226px9H4ygQVzepeSAmlZU+IMTn18cixOQTv8ToA+S580gv5+Uvyq9rvb4ZCOM5cyHt7Xthyd7+VKHWa9Luca/9Q/6FK5DyFn/t6/ws54aaCA4tKhQAAAABJRU5ErkJggg==");
  background-size: contain;
}
.finhistory-quest-answer .el-checkbox.is-checked::after {
  content: "";
  background-image: url(../../assets/images/finhistory/checked.png);
  position: absolute;
  top: -40%;
  left: 0;
  width: 100%;
  height: 200%;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.6;
}
.npc {
  width: 50%;
  float: left;
  padding-right: 15px;
}
.npc--q {
  width: 150px;
}
.q {
  position: fixed;
  height: 90vh;
  bottom: 0;
  right: -1rem;
  width: calc(100% - 11rem);
  /* flex-direction: column; */
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: stretch;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.5);
}
.q__block {
  /* box-shadow: 2px 0 8px #dceffa; */
  /* background-color: #fff; */
  height: 100%;
  padding: 6% 3% 3% 3%;
  background-image: url("../../assets/images/finhistory/questBg.png");
  /* background-size: contain; */
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.q__block-inner {
  height: 91%;
  overflow-x: hidden;
  overflow-y: auto;
}
.q__block--3 .q__block-inner {
  overflow-x: auto;
}
.q__block--5 {
  height: 98%;
}
.q__title {
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #324b59;
  /* font-style: normal; */
  font-family: "Times New Roman", cursive;
  /* font-family: "product-sans", sans-serif; */
  line-height: 1.2;
}
.q__text {
  /* font-style: normal; */
  font-size: 1.3rem;
  font-weight: 400;
  color: #324b59;
  line-height: 1.66;
  /* font-family: "product-sans", sans-serif; */
}
.q__checkbox {
  /* font-style: normal; */
  font-size: 1.3rem;
  font-weight: 400;
  color: #324b59;
  line-height: 1.66;
  /* font-family: "product-sans", sans-serif; */
  max-width: 60%;
  word-wrap: break-word;
  display: flex;
  margin-bottom: 15px;
  padding: 0;
}
.q__checkbox .el-checkbox__label {
  white-space: normal;
}
.button {
  font-style: italic;
  /* font-family: "product-sans", sans-serif; */
}
.form-error-message {
  /* font-family: "product-sans", sans-serif; */
  /* font-style: normal; */
}
.finquest-steps-list {
  display: none;
}
.finquest-steps-list__item {
  /* font-style: normal; */
  /* font-family: "product-sans", sans-serif; */
}
.readTheoryBtn {
  font-size: 20px;
  font-weight: 600;
  padding: 5px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid #000;
  margin-bottom: 5px;
  font-style: italic;
  /* font-family: "product-sans", sans-serif; */
  color: #324b59 !important;
  white-space: normal;
  margin-top: 15px;
  width: 90%;
}
.finquest-box__hint {
  background-color: transparent;
  right: -5%;
  bottom: 3%;
}
.finquest-box__hint__name {
  color: #324b59 !important;
  font-style: italic;
}
.theoryText__inner {
  margin: 15px 15px 15px 0;
  padding: 15px;
  border: 1px solid #000;
}
.theoryText__inner td {
  border: 1px solid;
}
@media (max-width: 1200px) {
  .q {
    flex-direction: row;
    justify-content: flex-end;
  }
  .q__block {
    margin-right: 3rem;
  }
  .finquest-steps-list {
    display: block;
  }
}
</style>
<style>
/* .fin-modal { */
.el-message-box__wrapper {
  background-color: rgba(149, 155, 238, 0.8);
}
.fin-modal .el-message-box__btns {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}
.fin-modal .el-message-box__btns .el-button span {
  color: #fff;
  /* font-family: "product-sans", sans-serif; */
  font-size: 1.6rem;
}
.fin-modal .el-message-box__btns .el-button {
  padding: 0 2rem;
  min-width: 18.6rem;
  height: 5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  outline: none;
  box-shadow: none;
  border-radius: 6px;
  font-weight: 700;
  color: #fff !important;
  transition: background-color 0.3s ease;
  outline: none;
  box-shadow: none;
  border: none;
}
.fin-modal .el-message-box__title {
  font-weight: 700;
  z-index: 321;
  color: #324b59;
  font-size: 1.5rem;
  text-align: center;
}
.fin-modal {
  width: 40%;
  max-width: 600px;
  box-shadow: 2px 0 8px #dceffa;
  padding: 3.5rem;
}
.fin-modal-title {
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.4;
  color: #000;
  text-align: center;
}
.fihistoryNextBtn {
  position: fixed;
  z-index: 9999;
  bottom: 10vh;
  right: 5vw;
}
</style>