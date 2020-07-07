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
            <img src="../../assets/images/finregulator/npc.png" class="npc npc--q" />
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
              <questionSortable
                :questionInfo="question.questionInfo"
                :key="'questionText' + questionIndex"
                v-else-if="question.questionInfo.type == 'sortable'"
                @allFieldsFilled="setFilledFieldCount"
              ></questionSortable>
              <questionDraggable
                :questionInfo="question.questionInfo"
                :key="'questionText' + questionIndex"
                v-else-if="question.questionInfo.type == 'draggable'"
                @allFieldsFilled="setFilledFieldCount"
              ></questionDraggable>
              <button
                v-if="question.questionInfo.tipCost"
                class="finquest-box__hint--mini"
                @click="openHint({hintCost: question.questionInfo.tipCost,hintText: question.questionInfo.tip, hintIsGetting: question.questionInfo.tipIsGetting, questionNumber: questionIndex})"
                :key="'questionTextHint' + questionIndex"
              >
                <span class="finquest-box__hint__name">
                  <template v-if="!question.questionInfo.tipIsGetting">Нужна подсказка?</template>
                  <template v-else-if="question.questionInfo.tipIsGetting">Прочитать подсказку</template>
                </span>
              </button>
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
            <button
              class="finquest-box__hint"
              @click="openHint({hintCost: gameStep.hintCost,hintText: gameStep.questionTip, hintIsGetting: tipIsGetting, questionNumber: -1})"
            >
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
    <questionMinisterstvoFinansov
      :gameStep="gameStep"
      v-else-if="gameStep.showComponent == 'ministerstvoFinansov'"
      @complete="$emit('complete')"
    ></questionMinisterstvoFinansov>
  </div>
</template>

<script>
import questionInputText from "../questionsType/questionInputText.vue";
import questionSelect from "../questionsType/questionSelect.vue";
import questionHoverItems from "../questionsType/questionHoverItems.vue";
import questionNoAnswer from "../questionsType/questionNoAnswer.vue";
import questionSortable from "../questionsType/questionSortable.vue";
import questionDraggable from "../questionsType/questionDraggable.vue";
import shopListTable from "../questionsType/shopListTable.vue";
import bankQuestion1Step1 from "../questionsType/bankQuestion1Step1.vue";
import bankQuestion1Step2 from "../questionsType/bankQuestion1Step2.vue";
import questionMinisterstvoFinansov from "../questionsType/ministerstvoFinansov.vue";
export default {
  props: ["gameStep"],
  name: "finregulator-quest",
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
    questionSortable,
    questionDraggable,
    shopListTable,
    questionMinisterstvoFinansov
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
    getFinregulator() {
      return this.$store.getters.getFinregulator;
    },
    setAnswer() {
      let newPoints;
      let correctCost = this.gameStep.rewards.correct;
      if (this.correctAnswersCount * correctCost > 0) {
        newPoints = this.correctAnswersCount * correctCost;
      } else {
        newPoints = this.gameStep.rewards.zeroCorrect;
      }
      this.$store.dispatch("initChangePoint", false); // закрываю окно с заданием
      this.questionStep = 0; // обнуляю шаги внутри квеста
      this.showShoplistTable = false;
      this.$store.commit("addPointsCount", newPoints); // Добавляю баллы
      this.$store.commit("addFinregulatorPointsReward", newPoints); // Увеличиваем количество баллов, которые были получены именно за прохождение заданий
      if (this.gameStep.notShowFinalWindow) {
        if (!this.gameStep.hideQuestion) {
          this.gameStep.hideQuestion = true;
        }
        this.showQuestionHint = false;
        this.showStepHint = false;
        this.rollUpIsOpen = false;
        let curStep = this.$store.getters.getFinregulator;
        if (curStep.gameStep < curStep.gameSteps.length - 1) {
          if (this.gameStep.preventChangeStep) return;
          this.$store.commit("setFinregulatorGameStep", curStep.gameStep + 1);
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
            let curStep = this.$store.getters.getFinregulator;
            if (curStep.gameStep < curStep.gameSteps.length - 1) {
              if (this.gameStep.preventChangeStep) return;
              this.$store.commit(
                "setFinregulatorGameStep",
                curStep.gameStep + 1
              );
              //   if (this.gameStep.stationName == "Магазин №2") {
              //     this.showBankQuestion1 = true;
              //   }
            } else {
              this.$alert(
                `<h1>Поздравляем!</h1>Вы набрали ${this.$store.getters.getFinregulatorPointsReward} баллов`,
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
      this.$emit("complete");
    },
    openHint(hintInfo) {
      /*
        hintInfo: {
            hintCost: 1,
            hintText: "text",
            hintIsGetting: false,
            questionNumber: -1 это основная подсказка,
        },
      */
      if (hintInfo.hintIsGetting) {
        this.readTip(hintInfo);
      } else {
        this.getTip(hintInfo);
      }
    },
    readTip(hintInfo) {
      this.$alert(
        `<div class="q__text">${hintInfo.hintText}</div>`,
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
    getTip(hintInfo) {
      let tipCost = hintInfo.hintCost;
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
        if (hintInfo.questionNumber == -1) {
          this.tipIsGetting = true;
        } else {
          this.gameStep.questions[
            hintInfo.questionNumber
          ].questionInfo.tipIsGetting = true;
          // hintInfo.hintIsGetting = true;
        }
        if (this.gameStep.isQuestion) {
          this.showQuestionHint = true;
        } else {
          this.showStepHint = true;
        }
        this.$store.commit("minusPointsCount", tipCost);
        this.readTip(hintInfo);
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
        return this.gameStep.questions[0].questionInfo.answer.length == 0;
      } else if (this.gameStep.changeCountType == 2) {
        return false;
      } else if (this.gameStep.changeCountType == 3) {
        console.log(
          this.gameStep.questions[0].questionInfo.questions.filter(
            item => item == ""
          )
        );
        return (
          Object.values(this.gameStep.questions[0].questionInfo.questions)
            .map(item => item.answer)
            .filter(item => item == "").length > 0
        );
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
              shopList: this.$store.getters.getFinregulator.shopList
            }
          }),
          customClass: "shopListMsg",
          callback: () => {
            let shopList = this.$store.getters.getFinregulator.shopList;
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
              shopList: this.$store.getters.getFinregulator.shopList
            }
          }),
          customClass: "shopListMsg",
          callback: () => {
            this.$prompt({
              title: "",
              message: h(bankQuestion1Step2, {
                key: 1,
                props: {
                  shopList: this.$store.getters.getFinregulator.shopList
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
.finquest-box__hint--mini .finquest-box__hint__name {
  font-size: 12px;
  color: #3dc479 !important;
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
  /* font-family: "Times New Roman", cursive; */
  /* font-style: italic; */
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
}
.finhistory-quest-nextButton {
  margin-top: 10px;
  /* font-family: "Times New Roman", cursive; */
  /* font-style: italic; */
  font-weight: 600;
  color: #000;
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
  /* font-family: "Times New Roman", cursive; */
  font-family: "product-sans", sans-serif;
  line-height: 1.2;
}
.q__text {
  /* font-style: normal; */
  font-size: 1.3rem;
  font-weight: 400;
  color: #324b59;
  line-height: 1.66;
  font-family: "product-sans", sans-serif;
}
.q__checkbox {
  /* font-style: normal; */
  font-size: 1.3rem;
  font-weight: 400;
  color: #324b59;
  line-height: 1.66;
  font-family: "product-sans", sans-serif;
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
  /* font-style: italic; */
  font-family: "product-sans", sans-serif;
}
.form-error-message {
  font-family: "product-sans", sans-serif;
  /* font-style: normal; */
}
.finquest-steps-list {
  display: none;
}
.finquest-steps-list__item {
  /* font-style: normal; */
  font-family: "product-sans", sans-serif;
}
.readTheoryBtn {
  font-size: 20px;
  font-weight: 600;
  padding: 5px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid #000;
  margin-bottom: 5px;
  /* font-style: italic; */
  font-family: "product-sans", sans-serif;
  color: #324b59 !important;
  white-space: normal;
  margin-top: 15px;
  width: 90%;
}
.finquest-box__hint {
  right: -5%;
  bottom: 3%;
}
.finquest-box__hint__name {
  color: #324b59 !important;
  /* font-style: italic; */
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
.fin-modal {
  max-height: 90vh;
  overflow: auto;
}
.fin-modal .el-message-box__btns {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}
.fin-modal .el-message-box__btns .el-button span {
  color: #fff;
  font-family: "product-sans", sans-serif;
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