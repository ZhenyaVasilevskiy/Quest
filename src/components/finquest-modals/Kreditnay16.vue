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
          <h2 class="finquest-box__title h2">Станция «Твои Финансы Консалт»</h2>
          <p class="finquest-box__text">
            – Добрый день! Вы на станции Компания «Твои Финансы Консалт».
            Зачастую, когда очень нужны деньги на покупку необходимой вещи, нужно понимать, что при обращении в банк за ними кредитную заявку могут не одобрить или предоставить деньги по более высокой процентной ставке. Банки должны быть уверены, что клиент сможет вернуть полученные у них средства, для этого оценивается кредитоспособность. На более выгодные условия могут рассчитывать работающие граждане трудоспособного возраста, имеющие имущество, а также положительную кредитную историю. Если клиент не относится к их числу, банк, осознавая высокий риск невозврата задолженности, предложит менее выгодные условия, или, может быть, вообще откажет.
            Поэтому перед тем, как обратиться в банк за кредитом, лучше проверить на его сайте, какие есть требования к заёмщикам. А также следует оценить сумму задолженности по кредиту и возможность её погашения в срок, внося ежемесячные платежи.
            Изучив инфографику, вы узнаете о том, как рассчитать размер задолженности по кредиту, какую часть от доходов заёмщика должны занимать выплаты по кредиту и каким клиентам банки предоставляют более выгодные условия кредитования.
            Успехов!
          </p>
          <p class="finquest-box__text">Изучите инфографику и решите задачи.</p>
        </div>
      </div>
      <div
        class="finquest-box quest__block animationQueue2"
        :style="{opacity: questionStep >= 1 ? 1 : 0}"
      >
        <div class="finquest-box__body">
          <v-open-rollup :src="require('../../assets/images/finquest/Kreditnay16/rollup.png')"></v-open-rollup>
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
            >Зарплата Юрия – 70 000 руб. в месяц. Он собирается взять потребительский кредит с ежемесячным платежом 20 000 руб.</template>
            <template
              v-else-if="curWay == 1"
            >Зарплата Сергея – 58 000 руб. в месяц. Он собирается взять ипотечный кредит с ежемесячным платежом 40 000 руб.</template>
          </div>
          <div class="finquest-box__text">
            <template v-if="curWay == 0">Сможет ли Юрий отдавать такую сумму банку ежемесячно?</template>
            <template
              v-else-if="curWay == 1"
            >Сможет ли Сергей отдавать такую сумму банку ежемесячно?</template>
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
            <template v-if="curWay == 0">Сможет ли Юрий отдавать такую сумму банку ежемесячно?</template>
            <template
              v-else-if="curWay == 1"
            >Сможет ли Сергей отдавать такую сумму банку ежемесячно?</template>
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
            <h2 class="finquest-box__title h2">Выберите правильные варианты ответов:</h2>
            <div class="finquest-form">
              <template v-if="curWay == 0">
                <div class="finquest-form__select-group">
                  <span
                    class="finquest-form__select-group__title"
                  >Выплата по кредиту составляет _____% от зарплаты Юрия.</span>
                  <el-select v-model="ways[0].answers.q1" placeholder="Выберите ответ">
                    <el-option
                      v-for="question in ways[0].q1Options"
                      :key="question.value"
                      :label="question.label"
                      :value="question"
                    ></el-option>
                  </el-select>
                </div>
                <div class="finquest-form__select-group">
                  <span
                    class="finquest-form__select-group__title"
                  >Сможет ли Юрий отдавать такую сумму банку ежемесячно?</span>
                  <el-select v-model="ways[0].answers.q2" placeholder="Выберите ответ">
                    <el-option
                      v-for="question in ways[0].q2Options"
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
                  >Выплата по кредиту составляет _____% от зарплаты Сергея.</span>
                  <el-select v-model="ways[1].answers.q1" placeholder="Выберите ответ">
                    <el-option
                      v-for="question in ways[1].q1Options"
                      :key="question.value"
                      :label="question.label"
                      :value="question"
                    ></el-option>
                  </el-select>
                </div>
                <div class="finquest-form__select-group">
                  <span
                    class="finquest-form__select-group__title"
                  >Сможет ли Сергей отдавать такую сумму банку ежемесячно?</span>
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
            q1: "",
            q2: ""
          },
          q1Options: [
            {
              value: 1,
              label: "20%"
            },
            {
              value: 2,
              label: "28%",
              isCorrect: true
            },
            {
              value: 3,
              label: "35%"
            },
            {
              value: 4,
              label: "32%"
            },
            {
              value: 5,
              label: "30%"
            }
          ],
          q2Options: [
            {
              value: 1,
              label: "Да",
              isCorrect: true
            },
            {
              value: 2,
              label: "Нет"
            }
          ],
          cost: {
            correct: 2.5,
            hint: 1,
            zeroCorrect: 1
          },
          hintText:
            "Если выплаты по кредиту превышают рекомендуемый процент от дохода, заёмщик при незапланированном росте расходов может оказаться в очень рискованном положении. ",
          correctAnswer: `<ul>
                <li>(20 000/70 000)×100% = 28% от зарплаты выплата по кредиту. </li>
                <li>Да, скорее всего, Юрий сможет ежемесячно отдавать такую сумму банку, т.к. на выплату кредита тратитсяменее 30% от заработной платы. </li>
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
              label: "30%"
            },
            {
              value: 2,
              label: "20%"
            },
            {
              value: 3,
              label: "44%"
            },
            {
              value: 4,
              label: "69%",
              isCorrect: true
            },
            {
              value: 5,
              label: "31%"
            }
          ],
          q2Options: [
            {
              value: 1,
              label: "Да"
            },
            {
              value: 2,
              label: "Нет",
              isCorrect: true
            }
          ],
          cost: {
            correct: 2.5,
            hint: 1,
            zeroCorrect: 1
          },
          hintText:
            "Если выплаты по кредиту превышают рекомендуемый процент от дохода, заёмщик при незапланированном росте расходов может оказаться в очень рискованном положении.",
          correctAnswer: `<ul>
                <li>(40 000/58 000)×100% = 68,9% от зарплаты выплата по кредиту. </li>
                <li>Нет, Сергей не сможет ежемесячно отдавать такую сумму банку, т.к. на выплаты по кредиту тратится существенно больше 30% от заработной платы. </li>
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

      this.$store.commit("setPointComplete", { point: 10, block: 2 });
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
