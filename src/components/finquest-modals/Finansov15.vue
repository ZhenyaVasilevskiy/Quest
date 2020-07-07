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
          <h2 class="finquest-box__title h2">Станция «На юридической консультации»</h2>
          <p class="finquest-box__text">
            – Добрый день! Вы попали на станцию «На юридической консультации».
            Перед вами выдержки из статей Закона «О защите прав потребителей» – главного закона Российской Федерации, регламентирующего взаимоотношения продавца и покупателя.
          </p>
          <p
            class="finquest-box__text"
          >Изучите инфографику и выдержки из Закона для решения задания на станции.</p>
        </div>
      </div>
      <div
        class="finquest-box quest__block animationQueue2"
        :style="{opacity: questionStep >= 1 ? 1 : 0}"
      >
        <div class="finquest-box__body">
          <v-open-rollup :src="require('../../assets/images/finquest/Finansov15/rollup.png')"></v-open-rollup>
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
            >Папа Вероники купил удочку, на которой не был указан срок службы. По истечении 4 лет удочка сломалась и порезала папе Вероники палец, тем самым причинив ему физический вред.</template>
            <template
              v-else-if="curWay == 1"
            >Мама купила тебе носки, но они не подошли по размеру. Мама отправилась в магазин с приобретённым товаром, чтобы заменить носки на другой размер. Чек был сохранён. Но в магазине, несмотря на то, что с момента покупки прошло несколько часов, носки обменять отказались.</template>
          </div>
          <div class="finquest-box__text">
            <template
              v-if="curWay == 0"
            >Может ли папа Вероники потребовать возмещения ущерба от производителя?</template>
            <template v-else-if="curWay == 1">Кто прав в этой ситуации покупатель или магазин?</template>
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
            <template
              v-if="curWay == 0"
            >Может ли папа Вероники потребовать возмещения ущерба от производителя?</template>
            <template v-else-if="curWay == 1">Кто прав в этой ситуации покупатель или магазин?</template>
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
            <h2 class="finquest-box__title h2">Выберите правильный вариант ответа:</h2>
            <div class="finquest-form">
              <template v-if="curWay == 0">
                <div class="finquest-form__select-group">
                  <span
                    class="finquest-form__select-group__title"
                  >Может ли папа Вероники потребовать возмещения ущерба от производителя?:</span>
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
              <template v-else-if="curWay == 1">
                <div class="finquest-form__select-group">
                  <span
                    class="finquest-form__select-group__title"
                  >Кто прав в этой ситуации покупатель или магазин?:</span>
                  <el-select v-model="ways[1].answers.q1" placeholder="Выберите ответ">
                    <el-option
                      v-for="question in ways[1].q1Options"
                      :key="question.value"
                      :label="question.label"
                      :value="question"
                    ></el-option>
                  </el-select>
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
              label:
                "Да, может, поскольку изготовитель не установил на товар срок службы, он обязан обеспечить безопасность товара в течение десяти лет со дня передачи товара потребителю.",
              isCorrect: true
            },
            {
              value: 2,
              label:
                "Нет, не может, так как, если изготовитель не установил на товар срок службы, он не обязан обеспечить безопасность товара."
            },
            {
              value: 3,
              label: "На усмотрение производителя."
            }
          ],

          cost: {
            correct: 4,
            hint: 1,
            zeroCorrect: 1
          },
          hintText:
            "Отсутствие гарантийного срока не означает, что его вовсе не существует.",
          correctAnswer:
            "Да, может, поскольку изготовитель не установил на товар срок службы, он обязан обеспечить безопасность товара в течение десяти лет со дня передачи товара потребителю. ",
          showHint: false
        },
        {
          answers: {
            q1: ""
          },
          q1Options: [
            {
              value: 1,
              label:
                "Прав покупатель, так как он имеет право на обмен доброкачественного товара в течение 14 дней, не считая дня покупки."
            },
            {
              value: 2,
              label:
                "Прав продавец, так как покупатель не имеет право на обмен товара, который входит в перечень товаров надлежащего качества, не подлежащих возврату.",
              isCorrect: true
            },
            {
              value: 3,
              label: "Все не правы."
            }
          ],

          cost: {
            correct: 5,
            hint: 1,
            zeroCorrect: 1
          },
          hintText: "Не все товары подлежат обмену. ",
          correctAnswer:
            "Прав продавец, так как покупатель не имеет право на обмен товара, который входит в перечень товаров надлежащего качества, не подлежащих возврату.",
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
        answers = Object.values(this.ways[1].answers);
        correctAnswers = answers.filter(item => {
          return !!item.isCorrect;
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
        // this.$store.commit("setLastQuestionAll", answers.length);
        // this.$store.commit("setLastQuestionCost", newPoints);
        this.$store.commit("setLastQuestion", {
          cost: newPoints,
          allCount: answers.length,
          correctCount: correctAnswers,
          correctAnswer: this.ways[1].correctAnswer,
          hint: this.ways[1].hintText
        });

        this.$store.commit("addPointsCount", newPoints);
        this.openCongratulationModal("FinquestQuestionResult");
      }

      this.$store.commit("setPointComplete", { point: 4, block: 3 });
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
        answers = Object.values(this.ways[1].answers);
        return (
          answers.filter(item => {
            return !!item;
          }).length == answers.length
        );
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
      } else if (this.curWay == 1) {
        sum =
          Object.keys(this.ways[1].answers).length * this.ways[1].cost.correct;
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
