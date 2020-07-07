<template>
  <el-row class="finquest-modal-inner" type="flex" justify="space-around">
    <button
      class="button--green button button--xs buttonStep"
      ref="nextButton"
      @click="questionStep++"
      v-show="questionStep < 3"
    >
      Далее
      <!-- :style="questionStepStyle[questionStep]" -->
    </button>

    <button
      type="button"
      class="returnToMap"
      @click="$store.dispatch('initChangePoint', false);closeFinquestModal();$store.commit('setShowHint', false)"
    >Вернуться на карту</button>
    <el-col class="finquest-box-col quest" :sm="8" :lg="8" :class="{ 'is-active': step === 1 }">
      <div
        class="finquest-box quest__block animationQueue1"
        :style="{opacity: questionStep >= 0 ? 1 : 0}"
      >
        <div class="finquest-box__body">
          <h2 class="finquest-box__title h2">Станция «В Магазине»</h2>
          <p class="finquest-box__text">
            – Добрый день! Вы пришли на станцию «В Магазине». На этой станции вам предстоит узнать о том, как стоит вести себя правильно,
            совершая покупки.
          </p>
          <p class="finquest-box__text">
            Изучите информацию на инфографике, там выделены основные пункты, которые в обязательном порядке нужно проверять при получении
            чека на кассе.
          </p>
        </div>
      </div>

      <div
        class="finquest-box quest__block animationQueue2"
        :style="{opacity: questionStep >= 1 ? 1 : 0}"
      >
        <div class="finquest-box__body">
          <v-open-rollup :src="require('../../assets/images/finquest/Deshevaya8/rollup.png')"></v-open-rollup>
        </div>
      </div>
    </el-col>
    <el-col class="finquest-box-col quest" :sm="7" :class="{ 'is-active': step === 2 }">
      <div
        class="finquest-box quest__block animationQueue3"
        :style="{opacity: questionStep >= 2 ? 1 : 0}"
      >
        <div class="finquest-box__body">
          <h2 class="finquest-box__title h2">Задание</h2>
          <div class="finquest-box__text">
            <template v-if="curWay == 0">Перед вами чек.</template>
            <template
              v-else-if="curWay == 1"
            >Перед вами перечень правильных и неправильных пунктов, на которые нужно обращать внимание при проверке чека.</template>
          </div>
          <div class="finquest-box__text">
            <template v-if="curWay == 0">
              Определите, какая информация представлена на чеке.
              <!-- <div
                v-for="(element, elementKey) in ways[0].q1Options"
                :key="element.correctPosition"
                class="answer list-group-item"
                @drop="drop"
                @dragstart="drag"
                :data-index="elementKey"
                :class="{'q1p1-img-isDisabled': ways[0].answers.q1.includes(element.label)}"
                :draggable="!ways[0].answers.q1.includes(element.label)"
              >{{element.label}}</div>-->

              <!-- <draggable
                v-model="ways[0].q1Options"
                group="q1"
                v-bind="dragOptions"
                class="list-group"
                @start="isDrag = true"
                @end="isDrag = false"
              >
                <transition-group type="transition" :name="!isDrag ? 'flip-list' : null">
                  <div
                    v-for="element in ways[0].q1Options"
                    :key="element.correctPosition"
                    class="list-group-item"
                  >{{ element.label }}</div>
                </transition-group>
              </draggable>-->
            </template>
            <template
              v-else-if="curWay == 1"
            >На что обязательно следует обращать внимание, проверяя чек в магазине?</template>
          </div>
        </div>
      </div>
      <!-- <div
        class="finquest-box quest__block animationQueue4"
        :style="{opacity: questionStep >= 3 ? 1 : 0}"
      > 
        <div class="finquest-box__body">
          <h2 class="finquest-box__title h2">Вопрос</h2>
          <div class="finquest-box__text">
            <template v-if="curWay == 0">
              Определите, какая информация представлена на чеке. -->
              <!-- <div
                v-for="(element, elementKey) in ways[0].q1Options"
                :key="element.correctPosition"
                class="answer list-group-item"
                @drop="drop"
                @dragstart="drag"
                :data-index="elementKey"
                :class="{'q1p1-img-isDisabled': ways[0].answers.q1.includes(element.label)}"
                :draggable="!ways[0].answers.q1.includes(element.label)"
              >{{element.label}}</div>-->

              <!-- <draggable
                v-model="ways[0].q1Options"
                group="q1"
                v-bind="dragOptions"
                class="list-group"
                @start="isDrag = true"
                @end="isDrag = false"
              >
                <transition-group type="transition" :name="!isDrag ? 'flip-list' : null">
                  <div
                    v-for="element in ways[0].q1Options"
                    :key="element.correctPosition"
                    class="list-group-item"
                  >{{ element.label }}</div>
                </transition-group>
              </draggable>-->
            <!--</template>
            <template
              v-else-if="curWay == 1"
            >На что обязательно следует обращать внимание, проверяя чек в магазине?</template>
          </div>
        </div> -->
      </div>
    </el-col>
    <el-col
      :sm="{span:17, push: 3}"
      :lg="{span: 8, push: 0}"
      :style="{opacity: questionStep >= 3 ? 1 : 0}"
    >
      <el-col class="finquest-box-col" :class="{ 'is-active': step === 2 }">
        <div class="finquest-box finquest-box--question animationQueue5">
          <div class="finquest-box__header">
            <!--<div class="finquest-box__header__item">
              <v-icons name="star"></v-icons>
              <span class="fw-bold">{{ getSumCost }}</span>
            </div>
            <div class="finquest-box__header__item">
              <v-stopwatch></v-stopwatch>
            </div>-->
          </div>
          <div class="finquest-box__body">
            <h2 class="finquest-box__title h2">
              <template v-if="curWay == 0">Выберите правильные ответы к элементам чека:</template>
              <template v-else-if="curWay == 1">Выберите несколько правильных ответов:</template>
            </h2>
            <div class="finquest-form">
              <template v-if="curWay == 0">
                <div style="display: flex">
                  <div style="position: relative;">
                    <img src="../../assets/images/finquest/Deshevaya8/q1p1.jpg" class="q1p1-img" />
                    <!-- <div
                      v-for="(zone, zoneKey) in ways[0].q1Zones"
                      :key="'zone' + zoneKey"
                      @drop="drop"
                      @dragover="allowDrop($event,zoneKey)"
                      :style="zone.style"
                      :data-index="zoneKey"
                      class="q1p1-img-section"
                      :class="{
                          'q1p1-img-isHovered': zone.isHovered, 
                          'q1p1-img-isComplete': ways[0].answers.q1[zoneKey] != ''
                        }"
                    >{{ways[0].answers.q1[zoneKey]}}</div>-->
                  </div>
                  <div style="display: flex;flex-direction: column;justify-content: space-around;">
                    <div class="finquest-form__select-group">
                      <el-select v-model="ways[0].answers.q1[0]" placeholder="Выберите ответ">
                        <el-option
                          v-for="(question, questionKey) in ways[0].q1Options"
                          :key="'q1' + questionKey"
                          :label="question.label"
                          :value="question.label"
                        ></el-option>
                      </el-select>
                    </div>
                    <div class="finquest-form__select-group">
                      <el-select v-model="ways[0].answers.q1[1]" placeholder="Выберите ответ">
                        <el-option
                          v-for="(question, questionKey) in ways[0].q1Options"
                          :key="'q1' + questionKey"
                          :label="question.label"
                          :value="question.label"
                        ></el-option>
                      </el-select>
                    </div>
                    <div class="finquest-form__select-group">
                      <el-select v-model="ways[0].answers.q1[2]" placeholder="Выберите ответ">
                        <el-option
                          v-for="(question, questionKey) in ways[0].q1Options"
                          :key="'q2' + questionKey"
                          :label="question.label"
                          :value="question.label"
                        ></el-option>
                      </el-select>
                    </div>
                    <div class="finquest-form__select-group">
                      <el-select v-model="ways[0].answers.q1[3]" placeholder="Выберите ответ">
                        <el-option
                          v-for="(question, questionKey) in ways[0].q1Options"
                          :key="'q3' + questionKey"
                          :label="question.label"
                          :value="question.label"
                        ></el-option>
                      </el-select>
                    </div>
                    <div class="finquest-form__select-group">
                      <el-select v-model="ways[0].answers.q1[4]" placeholder="Выберите ответ">
                        <el-option
                          v-for="(question, questionKey) in ways[0].q1Options"
                          :key="'q4' + questionKey"
                          :label="question.label"
                          :value="question.label"
                        ></el-option>
                      </el-select>
                    </div>
                    <div class="finquest-form__select-group">
                      <el-select v-model="ways[0].answers.q1[5]" placeholder="Выберите ответ">
                        <el-option
                          v-for="(question, questionKey) in ways[0].q1Options"
                          :key="'q5' + questionKey"
                          :label="question.label"
                          :value="question.label"
                        ></el-option>
                      </el-select>
                    </div>
                    <div class="finquest-form__select-group">
                      <el-select v-model="ways[0].answers.q1[6]" placeholder="Выберите ответ">
                        <el-option
                          v-for="(question, questionKey) in ways[0].q1Options"
                          :key="'q6' + questionKey"
                          :label="question.label"
                          :value="question.label"
                        ></el-option>
                      </el-select>
                    </div>
                    <div class="finquest-form__select-group">
                      <el-select v-model="ways[0].answers.q1[7]" placeholder="Выберите ответ">
                        <el-option
                          v-for="(question, questionKey) in ways[0].q1Options"
                          :key="'q7' + questionKey"
                          :label="question.label"
                          :value="question.label"
                        ></el-option>
                      </el-select>
                    </div>
                    <div class="finquest-form__select-group">
                      <el-select v-model="ways[0].answers.q1[8]" placeholder="Выберите ответ">
                        <el-option
                          v-for="(question, questionKey) in ways[0].q1Options"
                          :key="'q8' + questionKey"
                          :label="question.label"
                          :value="question.label"
                        ></el-option>
                      </el-select>
                    </div>
                    <div class="finquest-form__select-group">
                      <el-select v-model="ways[0].answers.q1[9]" placeholder="Выберите ответ">
                        <el-option
                          v-for="(question, questionKey) in ways[0].q1Options"
                          :key="'q9' + questionKey"
                          :label="question.label"
                          :value="question.label"
                        ></el-option>
                      </el-select>
                    </div>
                  </div>
                </div>
              </template>
              <template v-else-if="curWay == 1">
                <el-checkbox-group v-model="ways[1].answers.q1">
                  <el-checkbox
                    v-for="(checkbox, checkboxKey) in ways[1].q1Options"
                    :key="'checkbox' + checkboxKey"
                    :label="checkbox.label"
                    border
                  ></el-checkbox>
                </el-checkbox-group>
              </template>
              <button
                class="button button--xs"
                :class="{
                    'button--green': allFieldsFilled,
                    'button--disabled': !allFieldsFilled
                }"
                :disabled="!allFieldsFilled"
                @click="setAnswer"
              >
                <span>Ответить</span>
              </button>
              <p v-if="!allFieldsFilled" class="form-error-message">Дайте ответ на все вопросы</p>

              <hintBtn
                class="finquest-box__hint"
                :hintCost="ways[this.curWay].cost.hint"
                :hint="getHintText"
                :questionIndex="-1"
              ></hintBtn>
            </div>
          </div>
        </div>
      </el-col>
      <el-col
        class="finquest-box-col hintCol"
        :class="{ 'is-active': step === 3 }"
        v-if="getShowHint"
      >
        <div class="finquest-box hint-box">
          <div class="finquest-box__body">
            <button type="button" class="hint-box__close" @click="closeModal">
              <img src="../../assets/images/icon-close.png" alt="close" />
            </button>
            <div class="hint-box__title">
              <img src="../../assets/images/finquest/finquest-dog.png" alt="dog" />
              <h2 class="h2">Подсказка</h2>
            </div>
            <p>{{ getHintText }}</p>
          </div>
        </div>
      </el-col>
    </el-col>

    <!-- переключатель для моб. версии -->
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

<script>
import draggable from "vuedraggable";
import hintBtn from "../main/hintBtn.vue";
export default {
  name: "modal-job-application",
  components: {
    draggable
  },
  data() {
    return {
      step: 1,
      questionStep: 0,
      ways: [
        {
          q1Zones: [
            {
              isHovered: false,
              style: {
                height: "47px"
              }
            },
            {
              isHovered: false,
              style: {
                height: "26px",
                top: "47px"
              }
            },
            {
              isHovered: false,
              style: {
                height: "27px",
                top: "73px"
              }
            },
            {
              isHovered: false,
              style: {
                height: "47px",
                top: "100px"
              }
            },
            {
              isHovered: false,
              style: {
                height: "27px",
                top: "127px"
              }
            },
            {
              isHovered: false,
              style: {
                height: "27px",
                top: "152px"
              }
            },
            {
              isHovered: false,
              style: {
                height: "109px",
                top: "179px"
              }
            },
            {
              isHovered: false,
              style: {
                height: "27px",
                top: "288px"
              }
            },
            {
              isHovered: false,
              style: {
                height: "28px",
                top: "315px"
              }
            },
            {
              isHovered: false,
              style: {
                height: "53px",
                top: "343px"
              }
            }
          ],
          answers: {
            q1: ["", "", "", "", "", "", "", "", "", ""],
            q0: ""
          },
          q1Options: [
            {
              label: "Наименование организации",
              correctPosition: 0
            },
            {
              label: "Номер кассового аппарата",
              correctPosition: 1
            },
            {
              label:
                "Идентификационный номер налогоплательщика (ИНН), по которому организация платит налоги",
              correctPosition: 2
            },
            {
              label: "Дата/Время",
              correctPosition: 3
            },
            {
              label: "Номер чека",
              correctPosition: 4
            },
            {
              label: "ФИО кассира",
              correctPosition: 5
            },
            {
              label: "Расшифровка купленных товаров, количество, цена",
              correctPosition: 6
            },
            {
              label: "Итоговая сумма",
              correctPosition: 7
            },
            {
              label: "Величина наличных, внесённых покупателем",
              correctPosition: 8
            },
            {
              label: "Величина сдачи",
              correctPosition: 9
            }
          ],
          cost: {
            correct: 0.5,
            hint: 1,
            zeroCorrect: 1
          },
          correctAnswer: `
          <ul>
          <li>1) Наименование организации</li>
            <li>2) Номер кассового аппарата</li>
            <li>3) Идентификационный номер налогоплательщика (ИНН), по которому организация платит налоги</li>
            <li>4) Дата/Время</li>
            <li>5) Номер чека</li>
            <li>6) ФИО кассира</li>
            <li>7) Расшифровка купленных товаров, количество, цена</li>
            <li>8) Итоговая сумма</li>
            <li>9) Величина наличных, внесённых покупателем</li>
<li>            10) Величина сдачи</li>
<ul>
            `,
          hintText:
            "Для подтверждения вашей покупки важно, чтобы в чеке вся информация была на своих местах.",
          showHint: false
        },
        {
          answers: {
            q1: []
          },
          q1Options: [
            {
              label: "размер сдачи;",
              isCorrect: true
            },
            {
              label: "форма чека, цвет, размер; "
            },
            {
              label: "правильно ли посчитана скидка; ",
              isCorrect: true
            },
            {
              label: "наличие объявлений об акциях;"
            },
            {
              label: "название организации; ",
              isCorrect: true
            },
            {
              label: "учтён ли каждый купленный товар; ",
              isCorrect: true
            },
            {
              label: "дата и время пробития чека; ",
              isCorrect: true
            },
            {
              label: "правильно ли просчитан итог.",
              isCorrect: true
            }
          ],
          cost: {
            correct: 0.5,
            hint: 1,
            zeroCorrect: 1
          },
          hintText:
            "Чек является главным подтверждением вашей покупки, поэтому важно, чтобы на нём была информация, которая поможет вам при возникновении спорных ситуаций доказать свою правоту: что, где и когда вы покупали и какую цену за это на самом деле заплатили. После каждой покупки обращайте внимание на информацию в чеке.",
          correctAnswer: `<img :src="require(../../assets/images/finquest/Deshevaya8/answer.png)" class="q1p1-img" alt />`,
          correctAnswerImg:
            "../../assets/images/finquest/Deshevaya8/answer.png",
          showHint: false
        }
      ],
      selected: {},
      isDrag: false
    };
  },
  components: {
    hintBtn
  },
  $_veeValidate: {
    validator: "new"
  },
  methods: {
    drag(ev) {
      ev.dataTransfer.setData("textFrom", ev.target.innerText);
    },
    allowDrop(ev, index) {
      this.ways[0].q1Zones.forEach(item => (item.isHovered = false));
      this.ways[0].q1Zones[index].isHovered = true;
      ev.preventDefault();
    },
    drop(ev) {
      //   debugger;
      ev.preventDefault();
      let textFrom = ev.dataTransfer.getData("textFrom");
      let index = ev.currentTarget.dataset.index;
      this.$set(this.ways[0].answers.q1, index, textFrom);
      //   if (indexFrom != -1) {
      //     this.$set(this.ways[1].q1[indexFrom], "field" + column, text);
      //   }
    },
    nextStep() {
      if (this.step + 1 <= 3) {
        this.step++;
      }
    },
    openHint() {
      if (this.showHintBtn) {
        this.$store.dispatch("initHintCost", this.ways[this.curWay].cost.hint);
        this.openHintModal("HintModalActivate");
      }
    },
    validateBeforeSubmit() {
      this.$validator.validateAll("questForm").then(result => {
        if (result) {
          this.closeFinquestModal();
          this.$store.dispatch("initChangePoint", false);
          this.openCongratulationModal("CongratulationPhilanthropist");
        }
      });
    },
    setAnswer() {
      let answers,
        answersCount,
        correctAnswers,
        correctCost,
        newPoints,
        answersLength;
      if (this.curWay == 0) {
        // answers = this.ways[0].q1Options;
        let correctAnswerArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        answers = this.ways[0].answers.q1;
        // answers = Object.values(this.ways[0].q1Options);
        // answersCount = answers.filter(item => item.correctPosition >= 0).length;
        answersCount = answers.length;
        // correctAnswers = this.ways[0].q1Options.filter(
        //   item => item.label == this.ways[0].answers.q1[item.correctPosition]
        // ).length;
        correctAnswers = correctAnswerArr.filter(
          (item, itemKey) =>
            this.ways[0].q1Options[item].label == answers[itemKey]
        ).length;

        correctCost = this.ways[0].cost.correct;
        this.closeFinquestModal();
        if (correctAnswers * correctCost > 0) {
          newPoints = correctAnswers * correctCost;
        } else {
          newPoints = this.ways[0].cost.zeroCorrect;
        }
        this.$store.dispatch("initChangePoint", false);
        // this.$store.commit("setLastQuestionCorrect", correctAnswers);
        // this.$store.commit("setLastQuestionAll", answersCount);
        // this.$store.commit("setLastQuestionCost", newPoints);

        this.$store.commit("setLastQuestion", {
          cost: newPoints,
          allCount: answersCount,
          correctCount: correctAnswers,
          correctAnswer: this.ways[0].correctAnswer,
          hint: this.ways[0].hintText,
          correctAnswerImg: this.ways[0].correctAnswerImg
        });

        this.$store.commit("addPointsCount", newPoints);
        this.openCongratulationModal("FinquestQuestionResult");
      } else if (this.curWay == 1) {
        answers = this.ways[1].answers.q1;
        answersLength = this.ways[1].q1Options.filter(item1 => {
          return item1.isCorrect;
        }).length;
        correctAnswers = answers.filter(item => {
          return this.ways[1].q1Options.filter(item2 => {
            return item2.label == item;
          })[0].isCorrect;
        }).length;
        correctCost = this.ways[1].cost.correct;
        this.closeFinquestModal();
        if (correctAnswers * correctCost > 0) {
          newPoints = correctAnswers * correctCost;
        } else {
          newPoints = this.ways[1].cost.zeroCorrect;
        }
        this.$store.dispatch("initChangePoint", false);
        // this.$store.commit("setLastQuestionCorrect", correctAnswers);
        // this.$store.commit("setLastQuestionAll", answersLength);
        // this.$store.commit("setLastQuestionCost", newPoints);

        this.$store.commit("setLastQuestion", {
          cost: newPoints,
          allCount: answersCount,
          correctCount: correctAnswers,
          correctAnswer: this.ways[1].correctAnswer,
          hint: this.ways[1].hintText,
          correctAnswerImg: this.ways[1].correctAnswerImg
        });

        this.$store.commit("addPointsCount", newPoints);
        this.openCongratulationModal("FinquestQuestionResult");
      }

      this.$store.commit("setPointComplete", { point: 1, block: 0 });
    },
    closeModal() {
      return this.$store.commit("setShowHint", false);
    }
  },
  computed: {
    showHintBtn() {
      return this.$store.getters.getPointStatus;
    },
    allFieldsFilled() {
      let answers;
      if (this.curWay == 0) {
        answers =
          this.ways[0].answers.q1.filter(item => item == "").length == 0;
      } else if (this.curWay == 1) {
        answers = this.ways[1].answers.q1.length >= 1;
      }
      return answers;
    },
    getHintText() {
      return this.ways[this.curWay].hintText;
    },
    getShowHint() {
      return this.$store.getters.getShowHint;
    },
    getSumCost() {
      let sum;
      if (this.curWay == 0) {
        sum =
          Object.values(this.ways[0].q1Options).filter(
            item => item.correctPosition >= 0
          ).length * this.ways[0].cost.correct;
      } else if (this.curWay == 1) {
        sum = 3 * this.ways[1].cost.correct;
      }
      return sum;
    },
    dragOptions() {
      return {
        animation: 200,
        group: "q1",
        disabled: false,
        ghostClass: "ghost"
      };
    },
    curWay() {
      return this.$store.getters.getCurWay;
    }
  },
  watch: {
    getShowHint(newValue, oldValue) {
      let hintCost;
      hintCost = this.ways[this.curWay].cost.hint;

      if (newValue == true) {
        this.$store.commit("minusPointsCount", hintCost);
      }
    }
  }
};
</script>

<style>
.finquest-form {
  display: flex;
  flex-wrap: wrap;
}

.finquest-form .q1p1-img,
.finquest-form .list-group {
  width: 50%;
}
.q1p1-img {
  height: 400px;
  width: 226px;
  position: relative;
}
.q1p1-img-section {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
  padding: 5px;
  transition: 0.3s;
}
.q1p1-img-section:hover,
.q1p1-img-isHovered {
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid;
}
.q1p1-img-isComplete {
  background-color: rgba(255, 255, 255, 1);
  font-size: 15px;
}
.q1p1-img-isDisabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
<style scoped>
.finquest-form__select-group {
  margin-bottom: 0 !important;
}
</style>