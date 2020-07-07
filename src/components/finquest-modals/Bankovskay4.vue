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
          <h2 class="finquest-box__title h2">Станция Банк «Эволюция»</h2>
          <p class="finquest-box__text">
            – Добрый день! Вы на станции Банк «Эволюция».
            Бывают ситуации, когда человек решает купить определённую вещь в кредит: до того, как накопит на неё деньги. Такое решение оправдано при выполнении двух условий. Во-первых, эта вещь должна экономить затраты или повышать доходы сразу (например, холодильник взамен сломавшегося, машина для ежедневных поездок) или в будущем (например, затраты на образование или лечение). Во-вторых, текущий и будущий доход должен позволять по частям оплатить сумму кредита и начисленные проценты в определённый срок.
            Кредиты на дорогостоящие покупки (автомобиль, квартира) обычно выдают на более длинный срок и под залог самой покупаемой вещи. Купленная вещь является собственностью банка, а не покупателя до тех пор, пока кредит не будет полностью выплачен. Так банк снижает для себя риск того, что заёмщик не сможет выплатить кредит, и потому может предлагать по таким кредитам более низкую ставку.
            Изучив инфографику, вы узнаете, какие бывают кредиты, как отличается процентная ставка в зависимости от вида кредита, а также на что следует обращать внимание при выборе банка и кредита.
          </p>
          <p class="finquest-box__text">Изучите её и выполните задание.</p>
        </div>
      </div>
      <div
        class="finquest-box quest__block animationQueue2"
        :style="{opacity: questionStep >= 1 ? 1 : 0}"
      >
        <div class="finquest-box__body">
          <v-open-rollup :src="require('../../assets/images/finquest/Bankovskay4/rollup.png')"></v-open-rollup>
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
            >Перед вами список правильных и неправильных критериев для выбора банка и условий кредита.</template>
            <template
              v-else-if="curWay == 1"
            >Анатолий Александрович планирует взять кредит 1 000 000 рублей на 5 лет на покупку автомобиля. У него есть кредитные предложения от 4 банков.</template>
          </div>
          <div class="finquest-box__text">
            <template
              v-if="curWay == 0"
            >Определите критерии, которые необходимо учитывать при выборе банка и условий кредитного предложения.</template>
            <template v-else-if="curWay == 1">
              Сравните четыре кредитных предложения и помогите Анатолию Александровичу выбрать наиболее выгодное предложение.
              <img
                src="../../assets/images/finquest/Bankovskay4/1.jpg"
                class="q1p1-img"
                alt
              />
              <img src="../../assets/images/finquest/Bankovskay4/2.jpg" class="q1p1-img" alt />
              <img src="../../assets/images/finquest/Bankovskay4/3.jpg" class="q1p1-img" alt />
              <img src="../../assets/images/finquest/Bankovskay4/4.jpg" class="q1p1-img" alt />
            </template>
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
            >Определите критерии, которые необходимо учитывать при выборе банка и условий кредитного предложения.</template>
            <template v-else-if="curWay == 1">
              Сравните четыре кредитных предложения и помогите Анатолию Александровичу выбрать наиболее выгодное предложение.
              <img
                src="../../assets/images/finquest/Bankovskay4/1.jpg"
                class="q1p1-img"
                alt
              />
              <img src="../../assets/images/finquest/Bankovskay4/2.jpg" class="q1p1-img" alt />
              <img src="../../assets/images/finquest/Bankovskay4/3.jpg" class="q1p1-img" alt />
              <img src="../../assets/images/finquest/Bankovskay4/4.jpg" class="q1p1-img" alt />
            </template>
          </div>
        </div>
      </div>-->
    </el-col>
    <el-col :sm="{span:17, push: 3}" :lg="{span: 8, push: 0}">
      <el-col class="finquest-box-col" :class="{ 'is-active': step === 2 }">
        <div
          class="finquest-box finquest-box--question animationQueue5"
          :style="{opacity: questionStep >= 3 ? 1 : 0}"
        >
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
              <template
                v-if="curWay == 0"
              >Отметьте критерии, которые необходимо учитывать при выборе банка и условий кредитного предложения:</template>
              <template v-if="curWay == 1">Выберите правильные варианты ответа:</template>
            </h2>
            <div class="finquest-form">
              <template v-if="curWay == 0">
                <el-checkbox-group v-model="ways[0].answers.q1">
                  <el-checkbox
                    v-for="(checkbox, checkboxKey) in ways[0].q1Options"
                    :key="'checkbox' + checkboxKey"
                    :label="checkbox.label"
                    border
                  ></el-checkbox>
                </el-checkbox-group>
              </template>
              <template v-else-if="curWay == 1">
                <div class="finquest-form__select-group">
                  <span
                    class="finquest-form__select-group__title"
                  >Отметьте кредитные предложения, подходящие для покупки автомобиля:</span>
                  <el-select v-model="ways[1].answers.q1" multiple placeholder="Выберите ответ">
                    <el-option
                      v-for="question in ways[1].q1Options"
                      :key="question.value"
                      :label="question.label"
                      :value="question"
                    ></el-option>
                  </el-select>
                </div>
                <div class="finquest-form__select-group">
                  <span class="finquest-form__select-group__title">
                    Какой кредит самый выгодный и подходящий под цель кредитования для Анатолия
                    Александровича?
                  </span>
                  <el-select v-model="ways[1].answers.q2" placeholder="Выберите ответ">
                    <el-option
                      v-for="question in ways[1].q2Options"
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
            q1: []
          },
          q1Options: [
            {
              value: 1,
              label: "тип кредита;",
              isCorrect: true
            },
            {
              value: 2,
              label: "масштабность рекламной кампании;"
            },
            {
              value: 3,
              label: "размер процентной ставки;",
              isCorrect: true
            },
            {
              value: 4,
              label: "валюта, в которой оформляется кредит;",
              isCorrect: true
            },
            {
              value: 5,
              label: "скидки клиентам банка в магазинах-партнёрах;"
            },
            {
              value: 6,
              label: "красивый офис банка;"
            },
            {
              value: 7,
              label: "срок кредитования.",
              isCorrect: true
            }
          ],
          cost: {
            correct: 1,
            hint: 1,
            zeroCorrect: 1
          },
          hintText:
            "Выбирая кредитные предложения банков, будьте прагматичны, в первую очередь обращайте внимание только на критерии, позволяющие вам оценить условия кредита и сумму, которую придётся  вернуть банку.",
          correctAnswers: `<ul>
                <li>тип кредита; </li>
                <li>размер процентной ставки; </li>
                <li>валюта, в которой оформляется кредит; </li>
                <li>срок кредитования. </li>
            </ul>`,
          showHint: false
        },
        {
          answers: {
            q1: "",
            q2: ""
          },
          q1Options: [
            {
              value: 1,
              label: "Абсолют Кредит Банк «Мечты сбываются»."
            },
            {
              value: 2,
              label: "Капитал Н Банк «Авто рядом»."
            },
            {
              value: 3,
              label: "Тритикоф «Рядом с вами».",
              isCorrect: true
            },
            {
              value: 4,
              label: "Манидом банк «Семейное гнёздышко»."
            }
          ],
          q2Options: [
            {
              value: 1,
              label: "Абсолют Кредит Банк «Мечты сбываются»."
            },
            {
              value: 2,
              label: "Капитал Н Банк «Авто рядом»."
            },
            {
              value: 3,
              label: "Тритикоф «Рядом с вами».",
              isCorrect: true
            },
            {
              value: 4,
              label: "Манидом банк «Семейное гнёздышко»."
            }
          ],
          cost: {
            correct: 2,
            hint: 1,
            zeroCorrect: 1
          },
          hintText:
            "При прочих равных условиях процентная ставка должна стать решающим фактором. Но иногда более низкие ставки банки предлагают по кредитам, которые нельзя потратить на необходимые именно вам цели.",
          correctAnswers: `<ul>
                <li>тип кредита; </li>
                <li>размер процентной ставки; </li>
                <li>валюта, в которой оформляется кредит; </li>
                <li>срок кредитования. </li>
            </ul>`,
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
    closeModal() {
      return this.$store.commit("setShowHint", false);
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
        answers = this.ways[0].answers.q1;
        correctAnswers = answers.filter(item => {
          return this.ways[0].q1Options.filter(item2 => {
            return item2.label == item;
          })[0].isCorrect;
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

      this.$store.commit("setPointComplete", { point: 8, block: 2 });
    }
  },
  computed: {
    showHintBtn() {
      return this.$store.getters.getPointStatus;
    },
    allFieldsFilled() {
      let answers;
      if (this.curWay == 0) {
        answers = this.ways[0].answers.q1.length >= 1;
        return answers;
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
        sum = 4 * this.ways[0].cost.correct;
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
