<template>
  <div class="finhistory-quest-inner">
    <template v-if="gameStep.isQuestion && !gameStep.showComponent && !gameStep.hideQuestion">
      <el-row class="q" type="flex">
        <el-col
          :md="{span: 18}"
          :lg="{span: 8}"
          class="q__block q__block--1"
          v-show="canShowStep(1) && !gameStep.hideBlock1"
        >
          <div class="q__block-inner">
            <img src="../../assets/images/finnavigator/npc.png" class="npc npc--q" />
            <h1 class="q__title">{{gameStep.stationName}}</h1>
            <div class="q__text" v-html="gameStep.text"></div>
            <div class="q__text" v-html="gameStep.theoryText" style="margin-top: 15px;"></div>
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
              <div v-html="gameStep.theory" class="theoryText__inner"></div>
            </div>
          </div>
        </el-col>
        <el-col
          :md="{span: 18}"
          :lg="{span: 7}"
          class="q__block q__block--3"
          v-show="canShowStep(2) && !gameStep.hideBlock2"
        >
          <div class="q__block-inner">
            <h1 class="q__title">Задание</h1>
            <div class="q__text" v-html="gameStep.question"></div>
            <div class="q__text" v-html="gameStep.tip"></div>
            <div class="q__text" style="margin-top: 15px;">
              <strong v-html="gameStep.task"></strong>
            </div>
          </div>
        </el-col>
        <el-col
          :md="{span: 18}"
          :lg="{span: 8}"
          class="q__block q__block--5"
          v-show="canShowStep(3) && !gameStep.hideBlock3"
        >
          <div class="q__block-inner">
            <strong
              class="questionText"
              style="font-syle: normal !important;"
            >{{gameStep.questionRule}}</strong>
            <!-- :key="'questionTitle' + questionIndex" -->
            <!-- СЮДА ВСТАВИТЬ КОМПОНЕНТ ВОПРОСА-->
            <template v-for="(question, questionIndex) in gameStep.questions">
              <questionInputText
                v-if="question.questionInfo.type == 'inputText'"
                :questionInfo="question.questionInfo"
                :key="'questionText' + questionIndex"
                @allFieldsFilled="setFilledFieldCount"
              ></questionInputText>
              <questionSelect
                v-else-if="question.questionInfo.type == 'select'"
                :questionInfo="question.questionInfo"
                :key="'questionText' + questionIndex"
                @allFieldsFilled="setFilledFieldCount"
              ></questionSelect>
              <questionHoverItems
                v-else-if="question.questionInfo.type == 'hoverItems'"
                :questionInfo="question.questionInfo"
                :key="'questionText' + questionIndex"
                @allFieldsFilled="setFilledFieldCount"
              ></questionHoverItems>
              <questionNoAnswer
                :questionInfo="question.questionInfo"
                :key="'questionText' + questionIndex"
                v-else-if="question.questionInfo.type == 'noAnswer'"
                @allFieldsFilled="setFilledFieldCount"
              ></questionNoAnswer>
            </template>
            <!-- <p class="finhistory-quest-tip" v-if="showQuestionHint">{{gameStep.questionTip}}</p> -->
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
            <button class="finquest-box__hint" @click="openHint">
              <!-- <img src="../../assets/images/finhistory/question-sm.png" alt="hint" /> -->
              <span class="finquest-box__hint__name">
                <!-- <template>Нужна подсказка?</template> -->
                <template v-if="!tipIsGetting">Нужна подсказка?</template>
                <template v-else-if="tipIsGetting">Прочитать подсказку</template>
              </span>
            </button>
          </div>
        </el-col>
        <ul class="finquest-steps-list h-reset-list" ref="t">
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
    <questionStrahovaya v-else-if="gameStep.showComponent == 'strahovay'"></questionStrahovaya>
    <questionBankB v-else-if="gameStep.showComponent == 'bankB'" @complete="$emit('complete')"></questionBankB>
  </div>
</template>

<script>
import questionInputText from "../questionsType/questionInputText.vue";
import questionSelect from "../questionsType/questionSelect.vue";
import questionHoverItems from "../questionsType/questionHoverItems.vue";
import questionNoAnswer from "../questionsType/questionNoAnswer.vue";
import shopListTable from "../questionsType/shopListTable.vue";
import bankQuestion1Step1 from "../questionsType/bankQuestion1Step1.vue";
import bankQuestion1Step2 from "../questionsType/bankQuestion1Step2.vue";
import questionStrahovaya from "../finnavigator-questions/strahovaya.vue";
import questionBankB from "../finnavigator-questions/bankB.vue";
export default {
  props: ["gameStep"],
  name: "finnavigator-quest",
  data: function() {
    return {
      questionStep: 0,
      tipIsGetting: false,
      step: 1,
      rollUpIsOpen: false,
      showQuestionHint: false,
      showStepHint: false,
      filledFieldCount: 0,
      correctAnswersCount: 0,
      incorrectAnswersCount: 0,
      showShoplistTable: false,
      showBankQuestion1: false
    };
  },
  components: {
    questionInputText,
    questionSelect,
    questionHoverItems,
    questionNoAnswer,
    shopListTable,
    questionStrahovaya,
    questionBankB
  },
  mounted: function() {
    this.$nextTick(() => {
      if (this.gameStep.showBankQuestion1) {
        this.showBankQuestion1 = true;
      }
    });
  },
  methods: {
    setFilledFieldCount(
      allFieldsFilled,
      newAnswerIsCorrect,
      oldAnswerIsCorrect
    ) {
      if (allFieldsFilled) {
        if (newAnswerIsCorrect === true && oldAnswerIsCorrect === false) {
          // дан правильный ответ, а до этого был неправильный
          this.incorrectAnswersCount--;
          this.correctAnswersCount++;
        } else if (
          newAnswerIsCorrect === false &&
          oldAnswerIsCorrect === true
        ) {
          // дан неправильный ответ, а до этого был правильный
          this.incorrectAnswersCount++;
          this.correctAnswersCount--;
        }

        if (oldAnswerIsCorrect === undefined) {
          // Ответ дан первый раз
          if (newAnswerIsCorrect === true) {
            // Ответ правильный
            this.correctAnswersCount++;
          } else if (newAnswerIsCorrect === false) {
            // Ответ неправильный
            this.incorrectAnswersCount++;
          }
        }
        this.filledFieldCount++;
      } else {
        if (oldAnswerIsCorrect !== undefined) {
          if (oldAnswerIsCorrect === true) {
            this.correctAnswersCount--;
            this.incorrectAnswersCount++;
          }
        }

        this.filledFieldCount--;
      }
    },
    getFinnavigator() {
      return this.$store.getters.getFinnavigator[this.getCurCity];
    },
    getCurCity() {
      return this.$store.getters.getFinnavigator.curCity;
    },
    setAnswer() {
      //   debugger;
      let newPoints;
      let correctCost = this.gameStep.rewards.correct;
      if (this.correctAnswersCount * correctCost > 0) {
        newPoints = this.correctAnswersCount * correctCost;
      } else {
        newPoints = this.gameStep.rewards.zeroCorrect;
      }
      this.$store.dispatch("initChangePoint", false); // закрываю окно с заданием
      this.questionStep = 0; // обнуляю шаги внутри квеста
      if (this.gameStep.stationName == "Магазин №1") {
        this.$store.commit(
          "setFinnavigatorGameStep",
          this.$store.getters.getFinnavigator[
            this.$store.getters.getFinnavigator.curCity
          ].gameStep + 1
        );
        this.$emit("complete");
        return;
      } else if (
        this.gameStep.stationName == "Магазин №2" &&
        !this.showShoplistTable
      ) {
        this.$emit("complete");
        this.showShoplistTable = true;
        return;
      }
      this.showShoplistTable = false;
      this.$store.commit("addPointsCount", newPoints); // Добавляю баллы
      this.$store.commit("addFinnavigatorPointsReward", newPoints); // Увеличиваем количество баллов, которые были получены именно за прохождение заданий
      if (this.gameStep.notShowFinalWindow) {
        if (!this.gameStep.hideQuestion) {
          this.gameStep.hideQuestion = true;
        }
        this.showQuestionHint = false;
        this.showStepHint = false;
        this.rollUpIsOpen = false;
        let curStep = this.$store.getters.getFinnavigator[
          this.$store.getters.getFinnavigator.curCity
        ];
        if (curStep.gameStep < curStep.gameSteps.length - 1) {
          if (this.gameStep.preventChangeStep) return;
          this.$store.commit("setFinnavigatorGameStep", curStep.gameStep + 1);
        }
        this.$emit("complete");
        return;
      }
      this.$alert(
        `
        <h3 class="fin-modal-title">Набрано баллов: <strong>${newPoints}</strong></h3>
        <h3 class="fin-modal-title">Правильных ответов: <strong>${this.correctAnswersCount}</strong></h3>
        <h3 class="fin-modal-title">Неправильных ответов: <strong>${this.incorrectAnswersCount}</strong></h3>
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
            if (!this.gameStep.hideQuestion) {
              this.gameStep.hideQuestion = true;
            }
            this.showQuestionHint = false;
            this.showStepHint = false;
            this.rollUpIsOpen = false;
            let curStep = this.$store.getters.getFinnavigator[
              this.$store.getters.getFinnavigator.curCity
            ];
            if (curStep.gameStep < curStep.gameSteps.length - 1) {
              if (this.gameStep.preventChangeStep) return;
              this.$store.commit(
                "setFinnavigatorGameStep",
                curStep.gameStep + 1
              );
              //   if (this.gameStep.stationName == "Магазин №2") {
              //     this.showBankQuestion1 = true;
              //   }
            } else {
              this.$alert(
                `<h1>Поздравляем!</h1>Вы набрали ${this.$store.getters.getFinnavigatorPointsReward} баллов`,
                "",
                {
                  confirmButtonText: "OK",
                  customClass: "fin-modal",
                  dangerouslyUseHTMLString: true,
                  showClose: false,
                  confirmButtonText: "Далее",
                  callback: () => {
                    this.$router.push("/");
                  }
                }
              );
            }
          }
        }
      );
      //   debugger;
      this.$emit("complete");
    },
    openHint() {
      //   this.getTip();
      if (this.tipIsGetting) {
        this.readTip();
      } else {
        this.getTip();
      }
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
      let tipCost = this.gameStep.hintCost;
      let tipTitle = `Подсказка стоит баллов: ${tipCost} `;
      this.$confirm(``, tipTitle, {
        confirmButtonText: "Активировать подсказку",
        cancelButtonText: "Отклонить",
        customClass: "fin-modal",
        dangerouslyUseHTMLString: true,
        showClose: false,
        cancelButtonClass: "button--red",
        confirmButtonClass: "button--green"
      }).then(() => {
        this.tipIsGetting = true;
        if (this.gameStep.isQuestion) {
          this.showQuestionHint = true;
        } else {
          this.showStepHint = true;
        }
        this.$store.commit("minusPointsCount", tipCost);
        this.readTip();
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
      if (this.gameStep.changeCountType == 1) {
        // debugger;
        return this.gameStep.questions[0].questionInfo.answer.length == 0;
        // return this.filledFieldCount != this.gameStep.questions.length;
      }
      return this.filledFieldCount != this.gameStep.questions.length;
    }
  },
  watch: {
    showShoplistTable: function(newValue) {
      if (newValue === true) {
        const h = this.$createElement;
        this.$msgbox({
          title: "Выберите налучшие товары",
          message: h(shopListTable, {
            key: 1,
            props: {
              shopList: this.$store.getters.getFinnavigator[
                this.$store.getters.getFinnavigator.curCity
              ].shopList
            }
          }),
          customClass: "shopListMsg",
          callback: () => {
            let shopList = this.$store.getters.getFinnavigator[
              this.$store.getters.getFinnavigator.curCity
            ].shopList;
            if (
              shopList.correctAnswer.includes(
                shopList.shops[shopList.finalChecked.chocolate][0].title
              )
            ) {
              this.correctAnswersCount++;
            } else {
              this.incorrectAnswersCount++;
            }
            if (
              shopList.correctAnswer.includes(
                shopList.shops[shopList.finalChecked.beef][1].title
              )
            ) {
              this.correctAnswersCount++;
            } else {
              this.incorrectAnswersCount++;
            }
            if (
              shopList.correctAnswer.includes(
                shopList.shops[shopList.finalChecked.buckwheat][2].title
              )
            ) {
              this.correctAnswersCount++;
            } else {
              this.incorrectAnswersCount++;
            }
            this.showShoplistTable = true;
            this.setAnswer();
          }
        });
      }
    },
    showBankQuestion1: function(newValue) {
      if (newValue === true) {
        const h = this.$createElement;
        this.$msgbox({
          title: "",
          message: h(bankQuestion1Step1, {
            key: 1,
            props: {
              shopList: this.$store.getters.getFinnavigator[
                this.$store.getters.getFinnavigator.curCity
              ].shopList
            }
          }),
          customClass: "shopListMsg",
          callback: () => {
            this.$prompt({
              title: "",
              message: h(bankQuestion1Step2, {
                key: 1,
                props: {
                  shopList: this.$store.getters.getFinnavigator[
                    this.$store.getters.getFinnavigator.curCity
                  ].shopList
                }
              }),
              customClass: "shopListMsg",
              callback: () => {
                this.setAnswer();
              }
            });
          }
        });
      }
    }
  },
  destroyed: function() {
    // this.questionStep = 0;
    // this.tipIsGetting = false;
    // this.step = 1;
    // this.rollUpIsOpen = false;
    // this.showHint = fals;
  }
};
</script>

<style scoped>
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
  box-shadow: 2px 0 8px #dceffa;
  background-color: #fff;
  height: 98%;
  padding: 6% 3% 3% 3%;
  /* background-image: url("../../assets/images/finhistory/questBg.png"); */
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
.shopListMsg {
  width: 90vw;
}
</style>