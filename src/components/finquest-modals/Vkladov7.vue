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
          <h2 class="finquest-box__title h2">Станция «Вклады»</h2>
          <p class="finquest-box__text">
            – Добрый день! Вы пришли на станцию «Вклады».
            Банковский вклад – это денежные средства, переданные их владельцем в банк для хранения и получения дохода на прописанных в договоре условиях. При выборе вклада надо учитывать не только все важные критерии, которые вы найдёте, изучив инфографику, но и то, будет ли ваш вклад защищён системой страхования вкладов. В эту систему входят все банки, работающие со вкладами населения в России, а обеспечивает её деятельность Агентство по страхованию вкладов (АСВ). Именно АСВ организует выплату возмещения по вкладам в пределах максимальной суммы при отзыве у банка лицензии. На инфографике вы также увидите формулу, которая поможет вам рассчитать размер дохода по непополняемому вкладу с простыми процентами и выполнить задание.
          </p>
          <p class="finquest-box__text"></p>
        </div>
      </div>
      <div
        class="finquest-box quest__block animationQueue2"
        :style="{opacity: questionStep >= 1 ? 1 : 0}"
      >
        <div class="finquest-box__body">
          <v-open-rollup :src="require('../../assets/images/finquest/Vkladov7/rollup.png')"></v-open-rollup>
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
            >Вклад Ивана Петровича в Банке «Первый» составляет 1 200 000 руб., за год на него было начислено 19 600 руб. в качестве процентов. Недавно Иван Петрович из новостей узнал, что у банка «Первый» Банк России отозвал лицензию.</template>
            <template
              v-else-if="curWay == 1"
            >Перед вами список правильных и неправильных критериев для выбора банка и условий открытия вклада.</template>
          </div>
          <div class="finquest-box__text">
            <template
              v-if="curWay == 0"
            >Куда следует обратиться Ивану Петровичу, чтобы вернуть деньги? Какую сумму вернут?</template>
            <template
              v-else-if="curWay == 1"
            >Определите только те критерии, которые необходимо учитывать при выборе банка и открытии вклада.</template>
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
            >Куда следует обратиться Ивану Петровичу, чтобы вернуть деньги? Какую сумму вернут?</template>
            <template
              v-else-if="curWay == 1"
            >Определите только те критерии, которые необходимо учитывать при выборе банка и открытии вклада.</template>
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
              <template v-if="curWay == 0">Выберите правильные варианты ответов:</template>
              <template
                v-else-if="curWay == 1"
              >Отметьте не менее 5 критериев, которые необходимо учитывать при выборе банка и условий открытия вклада:</template>
            </h2>
            <div class="finquest-form">
              <template v-if="curWay == 0">
                <div class="finquest-form__select-group">
                  <span
                    class="finquest-form__select-group__title"
                  >Для возврата денежных средств при отзыве лицензии у банка нужно обратиться в:</span>
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
                  >Какую сумму вернут Ивану Петровичу?</span>
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
              label: "Банк России."
            },
            {
              value: 2,
              label: "Сбербанк."
            },
            {
              value: 3,
              label: "Министерство финансов Российской Федерации."
            },
            {
              value: 4,
              label: "Агентство по страхованию вкладов.",
              isCorrect: true
            },
            {
              value: 5,
              label: "Роспотребнадзор"
            }
          ],
          q2Options: [
            {
              value: 1,
              label: "19 600 руб. "
            },
            {
              value: 2,
              label: "1 000 000 руб. "
            },
            {
              value: 3,
              label: "1 200 000 руб."
            },
            {
              value: 4,
              label: "1 219 600 руб.",
              isCorrect: true
            },
            {
              value: 5,
              label: "1 400 000 руб"
            }
          ],
          cost: {
            correct: 2,
            hint: 1,
            zeroCorrect: 1
          },
          hintText:
            "Если вам не удалось накопить до нужной суммы за прошедшие месяцы, долгожданную покупку придётся отложить.",
          correctAnswer: `<ul>
    <li>Обратиться нужно в Агентство по страхованию вкладов, а затем – в уполномоченный банк-агент, производящий выплаты.</li>
    <li>Вернут 1 200 000 + 19 600  = 1 219 600, т.к. возвращается сумма вклада с процентами, которые банк успел начислить до отзыва лицензии, если она не превышает 1 400 000 руб.</li>
</ul>`,
          showHint: false
        },
        {
          answers: {
            q1: []
          },
          q1Options: [
            {
              value: 1,
              label: "рейтинг банка;",
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
              label: "условия пополнения;",
              isCorrect: true
            },
            {
              value: 5,
              label: "условия начисления процентов;",
              isCorrect: true
            },
            {
              value: 6,
              label: "скидки клиентам банка в магазинах-партнёрах;"
            },
            {
              value: 7,
              label: "красивый офис банка;"
            },
            {
              value: 8,
              label: "срок вклада и возможность досрочного закрытия.",
              isCorrect: true
            }
          ],
          cost: {
            correct: 1,
            hint: 1,
            zeroCorrect: 1
          },
          hintText:
            "Обращайте внимание на значимые критерии выбора наиболее надёжного банка и наиболее выгодного банковского предложения, а также на те, которые в случае конфликтных ситуаций, действительно, помогут вам защитить свои права.",
          correctAnswer: `<ul>
    <li>рейтинг банка; </li>
    <li>размер процентной ставки; </li>
    <li>условия пополнения; </li>
    <li>условия начисления процентов; </li>
    <li>срок вклада и возможность досрочного закрытия. </li>
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
        answers = this.ways[1].answers.q1;
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
      this.$store.commit("setPointComplete", { point: 13, block: 1 });
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
        answers = this.ways[1].answers.q1.length >= 5;
        return answers;
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
        sum = 5 * this.ways[1].cost.correct;
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
