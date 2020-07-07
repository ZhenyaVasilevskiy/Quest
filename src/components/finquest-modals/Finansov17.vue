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
          <h2 class="finquest-box__title h2">Станция «На работе»</h2>
          <p class="finquest-box__text">
            – Добрый день! Вы на станции «На работе». На этой станции вы узнаете о том, что в Российской Федерации можно работать с 14 лет, а также какие нормы рабочего времени существует для несовершеннолетних и как рабочий график может отличаться во время учёбы и во время каникул.
            Любое трудоустройство сопровождается подписанием трудового договора – соглашения между работодателем и работником, которое устанавливает их взаимные права и обязанности. Соблюдение ключевых положений трудового договора обязательно обеими сторонами, его подписавшими.
          </p>
          <p class="finquest-box__text">Изучите инфографику и решите задачу.</p>
        </div>
      </div>
      <div
        class="finquest-box quest__block animationQueue2"
        :style="{opacity: questionStep >= 1 ? 1 : 0}"
      >
        <div class="finquest-box__body">
          <v-open-rollup :src="require('../../assets/images/finquest/Finansov17/rollup.png')"></v-open-rollup>
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
            >Перед вами список правильных и неправильных вариантов частей, из которых состоит трудовой договор.</template>
            <template
              v-else-if="curWay == 1"
            >Диме и Ване исполнилось 14 лет, и они решили устроиться на работу. Диме предложили работать 18 часов в неделю в типографии, совмещая время работы с учёбой в школе, Ване предложили работать 20 часов в неделю в кафе во время учебных каникул.</template>
          </div>
          <div class="finquest-box__text">
            <template
              v-if="curWay == 0"
            >Выберите части, без которых не обходится ни один трудовой договор.</template>
            <template v-else-if="curWay == 1">Были ли нарушены работодателями права подростков?</template>
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
            >Выберите части, без которых не обходится ни один трудовой договор.</template>
            <template v-else-if="curWay == 1">Были ли нарушены работодателями права подростков?</template>
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
              <template v-if="curWay == 0">Отметьте правильные варианты ответа:</template>
              <template v-else-if="curWay == 1">Выберите правильные варианты ответов:</template>
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
                  >Норма рабочего времени в неделю для работников в возрасте от 14 до 16 лет в течение учебного года составляет:</span>
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
                  >Были ли нарушены работодателями права Димы и Вани?</span>
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
              label: "преамбула;",
              isCorrect: true
            },
            {
              value: 2,
              label: "контакты для экстренной связи;"
            },
            {
              value: 3,
              label: "предмет договора;",
              isCorrect: true
            },
            {
              value: 4,
              label: "права и обязанности сторон;",
              isCorrect: true
            },
            {
              value: 5,
              label: "ответственность сторон;",
              isCorrect: true
            },
            {
              value: 6,
              label: "срок действия договора;",
              isCorrect: true
            },
            {
              value: 7,
              label: "статьи закона, которыми регламентируется данный договор;"
            },
            {
              value: 8,
              label: "условия оплаты труда работника;",
              isCorrect: true
            },
            {
              value: 9,
              label: "режим рабочего времени и отдыха;",
              isCorrect: true
            },
            {
              value: 10,
              label: "прекращение договора;",
              isCorrect: true
            },
            {
              value: 11,
              label: "заключительное положение и прочие условия;",
              isCorrect: true
            },
            {
              value: 12,
              label: "фактическое место проживания сторон;"
            },
            {
              value: 13,
              label: "реквизиты и подписи сторон.",
              isCorrect: true
            }
          ],
          cost: {
            correct: 0.5,
            hint: 1,
            zeroCorrect: 1
          },
          hintText:
            "Законодательством Российской Федерации предусмотрено не только заключение трудового договора в письменной форме, но и его структура (содержание).",
          correctAnswer: `<ul>
                <li>преамбула;</li>
                <li>предмет договора;</li>
                <li>права и обязанности сторон;</li>
                <li>ответственность сторон;</li>
                <li>срок действия договора;</li>
                <li>условия оплаты труда работника;</li>
                <li>режим рабочего времени и отдыха;</li>
                <li>прекращение договора;</li>
                <li>заключительное положение и прочие условия;</li>
                <li>реквизиты и подписи сторон</li>
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
              label: "До 24 часов в неделю."
            },
            {
              value: 2,
              label: "До 17,5 часов в неделю."
            },
            {
              value: 3,
              label: "До 40 часов в неделю."
            },
            {
              value: 4,
              label: "До 36 часов в неделю."
            },
            {
              value: 5,
              label: "До 12 часов в неделю",
              isCorrect: true
            }
          ],
          q2Options: [
            {
              value: 1,
              label: "Димы да, Вани да."
            },
            {
              value: 2,
              label: "Димы да, Вани нет.",
              isCorrect: true
            },
            {
              value: 3,
              label: "Димы нет, Вани да."
            },
            {
              value: 4,
              label: "Димы нет, Вани нет."
            }
          ],
          cost: {
            correct: 1,
            hint: 1,
            zeroCorrect: 1
          },
          hintText:
            "Норма часов для несовершеннолетних варьируется в зависимости от возраста и занятости в период учебного года либо каникул.",
          correctAnswer: `<ul>
                <li>Норма рабочего времени в неделю для работников в возрасте от 14 до 16 лет в течение учебного года составляет: до 12 часов в неделю. </li>
                <li>Да, были нарушены работодателем права Димы, а Вани нет. </li>
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
      let answers, correctAnswers, correctCost, newPoints, answersCount;
      if (this.curWay == 0) {
        answers = this.ways[0].answers.q1;
        answersCount = this.ways[0].q1Options.filter(item => {
          return !!item.isCorrect;
        }).length;
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
        // this.$store.commit("setLastQuestionAll", answersCount);
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

      this.$store.commit("setPointComplete", { point: 2, block: 3 });
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
        sum = 10 * this.ways[0].cost.correct;
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

<style>
.el-checkbox-group {
  display: flex;
  flex-direction: column;
}
</style>
