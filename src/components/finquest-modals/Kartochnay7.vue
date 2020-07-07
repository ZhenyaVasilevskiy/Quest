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
    <el-col
      class="finquest-box-col quest"
      :class="{ 'is-active': step === 1 }"
      :sm="{span:17, push: 3}"
      :lg="{span: 8, push: 0}"
    >
      <div
        class="finquest-box quest__block animationQueue1"
        :style="{opacity: questionStep >= 0 ? 1 : 0}"
      >
        <div class="finquest-box__body">
          <h2 class="finquest-box__title h2">Станция «Твоя банковская карта»</h2>
          <p class="finquest-box__text">
            – Добрый день! Вы на станции Компания «Твоя банковская карта».
            Все банковские карты делятся на два типа: кредитные и дебетовые.
            Кредитная карта – банковская карта, позволяющая владельцу распоряжаться деньгами, взятыми в долг у банка на условиях платности и возвратности.
            Дебетовая карта – банковская карта, позволяющая владельцу распоряжаться деньгами в пределах суммы, находящейся на его счёте.
            На этой станции вы узнаете о том, с какой карты выгоднее снимать наличные, где есть ограничения по расходованию средств с карты и за пользование какими картами взымается плата за обслуживание.
            Помните, что никому нельзя сообщать данные банковской карты (имя владельца, срок действия, пин-код), даже сотрудникам банка. А при обнаружении технических неисправностей либо при возникновении проблем с банкоматом стоит незамедлительно сообщить об этом в банк, позвонив по телефону, указанному на карте, на сайте банка или на банкомате.
          </p>
          <p class="finquest-box__text">Изучите инфографику и выполните задания.</p>
        </div>
      </div>
      <div
        class="finquest-box quest__block animationQueue2"
        :style="{opacity: questionStep >= 1 ? 1 : 0}"
      >
        <div class="finquest-box__body">
          <v-open-rollup :src="require('../../assets/images/finquest/Kartochnay7/rollup.png')"></v-open-rollup>
        </div>
      </div>
    </el-col>
    <el-col
      class="finquest-box-col quest"
      :class="{ 'is-active': step === 2 }"
      :sm="{span:17, push: 3}"
      :lg="{span: 7, push: 0}"
    >
      <div
        class="finquest-box quest__block animationQueue3"
        :style="{opacity: questionStep >= 2 ? 1 : 0}"
      >
        <div class="finquest-box__body">
          <h2 class="finquest-box__title h2">Задание</h2>
          <div class="finquest-box__text">
            <template
              v-if="curWay == 0"
            >Анне позвонили из банка и сообщили о том, что кто-то пытался украсть деньги с её банковской карты. Ей предложили срочно сообщить всю написанную на банковской карте информацию.</template>
            <template
              v-if="curWay == 1"
            >Перед вами список основных характеристик дебетовых и кредитных карт.</template>
          </div>
          <div class="finquest-box__text">
            <template v-if="curWay == 0">Подскажите, как поступить в этой ситуации Анне?</template>
            <template
              v-if="curWay == 1"
            >Какие из этих характеристик относятся к дебетовым, а какие к кредитным картам (характеристика может подходить к одному или двум типам карт сразу).</template>
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
            <template v-if="curWay == 0">Подскажите, как поступить в этой ситуации Анне?</template>
            <template
              v-if="curWay == 1"
            >Какие из этих характеристик относятся к дебетовым, а какие к кредитным картам (характеристика может подходить к одному или двум типам карт сразу).</template>
          </div>
        </div>
      </div>-->
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
              <template v-if="curWay == 0">Выберите правильные варианты</template>
              <template
                v-if="curWay == 1"
              >Перетащите характеристики к типам карты (характеристика может подходить к одному или двум типам карт сразу).</template> ответа:
            </h2>
            <div class="finquest-form">
              <template v-if="curWay == 0">
                <div class="finquest-form__select-group">
                  <span
                    class="finquest-form__select-group__title"
                  >Подскажите, как поступить в этой ситуации Анне?</span>
                  <el-select v-model="ways[0].answers.q1" placeholder="Выберите ответ">
                    <el-option
                      v-for="question in ways[0].q1Options"
                      :key="question.value"
                      :label="question.label"
                      :value="question"
                    ></el-option>
                  </el-select>
                </div>
              </template>
              <template v-if="curWay == 1">
                <div style="display: flex">
                  <div style="width: 50%">
                    <img src="../../assets/images/finquest/Kartochnay7/q2_1.png" alt />
                    <div
                      class="draggAnswers"
                      @drop="drop"
                      @dragover="allowDrop"
                      @dragstart="drag"
                      data-card="1"
                    >
                      <div
                        class="dragg"
                        :data-index="optionKey"
                        v-for="(option, optionKey) in ways[1].q1"
                        :key="'q1' + optionKey"
                      >
                        {{ option }}
                        <el-button
                          type="danger"
                          size="mini"
                          class="draggDeleteButton"
                          @click="removeFromCard(1, optionKey)"
                        >x</el-button>
                      </div>
                    </div>
                  </div>
                  <div style="width: 50%">
                    <img src="../../assets/images/finquest/Kartochnay7/q2_2.png" alt />
                    <div
                      class="draggAnswers"
                      @drop="drop"
                      @dragover="allowDrop"
                      @dragstart="drag"
                      data-card="2"
                    >
                      <div
                        class="dragg"
                        :data-index="optionKey"
                        v-for="(option, optionKey) in ways[1].q2"
                        :key="'q2' + optionKey"
                      >
                        {{ option }}
                        <el-button
                          type="danger"
                          size="mini"
                          class="draggDeleteButton"
                          @click="removeFromCard(2, optionKey)"
                        >x</el-button>
                      </div>
                    </div>
                  </div>
                </div>
                <div style="display: flex">
                  <div
                    @dragstart="drag"
                    class="dragg"
                    :class="isInclude(option) ? 'dragg-disable' : ''"
                    :draggable="!isInclude(option)"
                    v-for="(option, optionKey) in ways[1].q1Options"
                    :key="'q1Options' + optionKey"
                  >{{option}}</div>
                </div>
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
import hintBtn from "../main/hintBtn.vue";
export default {
  name: "modal-job-application",
  data() {
    return {
      step: 1,
      questionStep: 0,
      ways: [
        {
          answers: {
            q1: ""
          },
          q1Options: [
            {
              value: 1,
              label: "Сообщить всю написанную на банковской карте информацию."
            },
            {
              value: 2,
              label:
                "Попросить представиться сотрудника банка, записать фамилию, имя и отчество сотрудника, отделение, в котором работает, и сообщить всю написанную на банковской карте информацию."
            },
            {
              value: 3,
              label:
                "Прекратить разговор и перезвонить в банк самостоятельно по телефону, указанному на карте или на сайте банка.",
              isCorrect: true
            },
            {
              value: 4,
              label: "Сообщить только номер карты и срок действия."
            },
            {
              value: 5,
              label: "Сообщить только имя владельца карты."
            }
          ],
          cost: {
            correct: 3,
            hint: 1,
            zeroCorrect: 1
          },
          hintText:
            "Прекратить разговор и перезвонить в банк самостоятельно по телефону, указанному на карте или на сайте банка.",
          correctAnswer:
            "Прекратить разговор и перезвонить в банк самостоятельно по телефону, указанному на карте или на сайте банка. ",
          showHint: false
        },
        {
          answers: {
            q1: ""
          },
          q1Options: [
            "деньги с карты можно снять в любое время",
            "деньги на карте принадлежат банку",
            "деньги на карте принадлежат тебе",
            "невыгодно снимать наличные",
            "можно оплатить любые товары и услуги",
            "возможна оплата за годовое обслуживание ",
            "нужно платить за пользование деньгами"
          ],
          q1: [],
          q2: [],
          cost: {
            correct: 0.5,
            hint: 1,
            zeroCorrect: 1
          },
          hintText:
            "Будьте внимательны, одни и те же критерии могут относиться как к дебетовой, так и к кредитной карте.  ",
          correctAnswer: `<table class="el-table">
                <tbody>
                    <tr>
                        <td>ДЕБЕТОВАЯ КАРТА</td>
                        <td>
                            <ul>
                            <li>деньги с карты можно снять в любое время </li>
                            <li>деньги на карте принадлежат тебе </li>
                            <li>можно оплатить любые товары и услуги </li>
                            <li>возможна плата за годовое обслуживание </li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td>КРЕДИТНАЯ КАРТА</td>
                        <td>
                            <ul>
                                <li>деньги с карты можно снять в любое время</li>
                                <li>деньги на карте принадлежат банку</li>
                                <li>невыгодно снимать наличные</li>
                                <li>можно оплатить любые товары и услуги</li>
                                <li>возможна плата за годовое обслуживание </li>
                                <li>нужно платить за пользование деньгами</li>
                            </ul>
                        </td>
                    </tr>
                    
                </tbody>
            </table>
            `,
          showHint: false
        }
      ],
      selected: {}
    };
  },
  components: {
    hintBtn
  },
  $_veeValidate: {
    validator: "new"
  },
  methods: {
    nextStep() {
      if (this.step + 1 <= 3) {
        this.step++;
      }
    },
    closeModal() {
      return this.$store.commit("setShowHint", false);
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
      let answers, correctAnswers, correctCost, newPoints;
      correctAnswers = 0;
      if (this.curWay == 0) {
        answers = Object.values(this.ways[0].answers);
        correctAnswers = answers.filter(item => {
          return !!item.isCorrect;
        }).length;
        correctCost = this.ways[0].cost.correct;
        this.closeFinquestModal();
        if (correctAnswers * correctCost > 0) {
          newPoints = correctAnswers * correctCost;
        } else {
          newPoints = this.ways[0].cost.zeroCorrect;
        }
        this.$store.dispatch("initChangePoint", false);
        // this.$store.commit("setLastQuestionCorrect", correctAnswers);
        // this.$store.commit("setLastQuestionAll", answers.length);
        // this.$store.commit("setLastQuestionCost", newPoints);

        this.$store.commit("setLastQuestion", {
          cost: newPoints,
          allCount: answers.length,
          correctCount: correctAnswers,
          correctAnswer: this.ways[0].correctAnswer,
          hint: this.ways[0].hintText
        });

        this.$store.commit("addPointsCount", newPoints);
        this.openCongratulationModal("FinquestQuestionResult");
      } else if (this.curWay == 1) {
        let correctq1 = [
          "деньги с карты можно снять в любое время",
          "деньги на карте принадлежат тебе",
          "можно оплатить любые товары и услуги",
          "возможна плата за годовое обслуживание"
        ];
        let correctq2 = [
          "деньги с карты можно снять в любое время",
          "деньги на карте принадлежат банку",
          "невыгодно снимать наличные",
          "можно оплатить любые товары и услуги",
          "возможна плата за годовое обслуживание ",
          "нужно платить за пользование деньгами"
        ];
        this.ways[1].q1.forEach(item => {
          if (correctq1.includes(item)) {
            correctAnswers++;
          }
        });
        this.ways[1].q2.forEach(item => {
          if (correctq2.includes(item)) {
            correctAnswers++;
          }
        });
        correctCost = this.ways[1].cost.correct;
        this.closeFinquestModal();
        if (correctAnswers * correctCost > 0) {
          newPoints = correctAnswers * correctCost;
        } else {
          newPoints = this.ways[1].cost.zeroCorrect;
        }
        this.$store.dispatch("initChangePoint", false);
        this.$store.commit("setLastQuestion", {
          cost: newPoints,
          allCount: 10,
          correctCount: correctAnswers,
          correctAnswer: this.ways[1].correctAnswer,
          hint: this.ways[1].hintText
        });

        this.$store.commit("addPointsCount", newPoints);
        this.openCongratulationModal("FinquestQuestionResult");
      }
      this.$store.commit("setPointComplete", { point: 7, block: 2 });
    },
    drag(ev) {
      ev.dataTransfer.setData("textFrom", ev.target.innerText);
    },
    allowDrop(ev) {
      ev.preventDefault();
    },
    drop(ev) {
      ev.preventDefault();
      let card = ev.currentTarget.dataset.card;
      let textFrom = ev.dataTransfer.getData("textFrom");
      if (this.ways[1]["q" + card].includes(textFrom)) return;
      this.ways[1]["q" + card].push(textFrom);
    },
    removeFromCard(card, index) {
      this.ways[1]["q" + card].splice(index, 1);
    },
    isInclude(option) {
      return (
        this.ways[1].q1.includes(option) && this.ways[1].q2.includes(option)
      );
    }
  },
  computed: {
    showHintBtn() {
      return this.$store.getters.getPointStatus;
    },
    allFieldsFilled() {
      let answers;
      if (this.curWay == 0) {
        answers = Object.values(this.ways[0].answers);
        return (
          answers.filter(item => {
            return !!item;
          }).length == answers.length
        );
      } else if (this.curWay == 1) {
        return this.ways[1].q1.length > 0 && this.ways[1].q2.length > 0;
      }
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
          Object.keys(this.ways[0].answers).length * this.ways[0].cost.correct;
      } else if (this.curWay == 0) {
        sum = 10;
      }
      return sum;
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
.dragg {
  padding: 5px;
  border: 1px solid gray;
  display: inline-block;
  border-radius: 4px;
  margin-right: 5px;
  margin-bottom: 5px;
}
.draggAnswers {
  width: 100%;
  min-height: 50px;
  border: 1px solid gray;
}
.draggDeleteButton {
  padding: 2px 5px;
}
.dragg-disable {
  opacity: 0.3;
  cursor: not-allowed;
}
</style>