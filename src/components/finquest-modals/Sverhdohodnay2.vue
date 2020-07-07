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
          <h2 class="finquest-box__title h2">Станция «Финансовая безопасность»</h2>
          <p class="finquest-box__text">
            – Добрый день! Вы пришли на станцию «Финансовая безопасность».
            На этой станции вы узнаете, как отличить добросовестную финансовую организацию от финансовой пирамиды.
            Финансовые пирамиды – это организации, которые под видом добросовестных компаний совершают мошеннические действия по привлечению средств населения в обмен на пустые обещания.
            Распознать финансовые пирамиды непросто, но главное, что должно настораживать, – это обещание высокого дохода и неизвестность фирмы, отсутствие у неё доступной отчётности и договора.
            На инфографике вы видите перечень критериев, которые нужно помнить, чтобы не попасть в ситуацию, когда ваши деньги будут инвестированы в неблагонадёжную компанию.
          </p>
          <p class="finquest-box__text">Изучите их и выполните задание.</p>
        </div>
      </div>
      <div
        class="finquest-box quest__block animationQueue2"
        :style="{opacity: questionStep >= 1 ? 1 : 0}"
      >
        <div class="finquest-box__body">
          <v-open-rollup :src="require('../../assets/images/finquest/Sverhdohodnay2/rollup.png')"></v-open-rollup>
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
            >Перед вами список правильных и неправильных признаков финансовых пирамид.</template>
            <template
              v-else-if="curWay == 1"
            >Сергей Иванович на юбилей получил подарок от родственников и друзей в размере 55 000 руб. Он решил не тратить, а сохранить и приумножить эти деньги. Способ накопления он ещё не выбрал.</template>
          </div>
          <div class="finquest-box__text">
            <template
              v-if="curWay == 0"
            >Выберите признаки, которые характерны для финансовых пирамид.</template>
            <template v-else-if="curWay == 1">
              Ознакомьтесь с предложениями от фонда «ПДП – 2020» и ООО «Орандж Банк» и решите, стоит ли Сергею Ивановичу относить свои накопления в одну из этих финансовых организаций.
              <img
                src="../../assets/images/finquest/Sverhdohodnay2/1.png"
              />
              <img src="../../assets/images/finquest/Sverhdohodnay2/2.png" />
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
            >Выберите признаки, которые характерны для финансовых пирамид.</template>
            <template v-else-if="curWay == 1">
              Ознакомьтесь с предложениями от фонда «ПДП – 2020» и ООО «Орандж Банк» и решите, стоит ли Сергею Ивановичу относить свои накопления в одну из этих финансовых организаций.
              <img
                src="../../assets/images/finquest/Sverhdohodnay2/1.png"
              />
              <img src="../../assets/images/finquest/Sverhdohodnay2/2.png" />
            </template>
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
              <template
                v-if="curWay == 0"
              >Отметьте не менее 4 признаков, которые характерны для финансовых пирамид.</template>
              <template v-else-if="curWay == 1">Направьте Сергея Ивановича в одну из организаций.</template>
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
                <el-radio
                  v-for="(radio, radioKey) in ways[1].q1Options"
                  :key="'radio' + radioKey"
                  :label="radio"
                  v-model="ways[1].answers.q1"
                >{{ radio.label }}</el-radio>
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
              label: "Доход гарантирован.",
              isCorrect: true
            },
            {
              value: 2,
              label: "Величина обещанного дохода равна/ниже рыночной."
            },
            {
              value: 3,
              label: "Финансовая отчётность доступна клиентам."
            },
            {
              value: 4,
              label: "Источник выплат клиентам – взносы новых вкладчиков.",
              isCorrect: true
            },
            {
              value: 5,
              label: "Доход не гарантирован."
            },
            {
              value: 6,
              label: "Величина обещанного дохода заметно выше рыночной.",
              isCorrect: true
            },
            {
              value: 7,
              label: "Финансовая отчётность скрыта от клиентов.",
              isCorrect: true
            },
            {
              value: 8,
              label:
                "Источник выплат клиентам – основная деятельность компании."
            }
          ],
          cost: {
            correct: 1,
            hint: 1,
            zeroCorrect: 1
          },
          hintText:
            "Помните, что любой сверхдоход подозрителен. Привлечение средств населения по ставкам выше рыночных не может быть выгодным для добросовестной организации. Также компания не будет скрывать информацию о себе, а надёжным источником её дохода может быть только реальная деятельность.",
          correctAnswer: `<ul>
    <li>Доход гарантирован. </li>
    <li>Источник выплат клиентам – взносы новых вкладчиков. </li>
    <li>Величина обещанного дохода заметно выше рыночной. </li>
    <li>Финансовая отчётность скрыта от клиентов. </li>
</ul>`,
          showHint: false
        },
        {
          answers: {
            q1: ""
          },
          q1Options: [
            {
              value: 1,
              label: "Фонд «ПДП – 2020»"
            },
            {
              value: 2,
              label: "ООО «Орандж Банк»",
              isCorrect: true
            }
          ],
          cost: {
            correct: 5,
            hint: 1,
            zeroCorrect: 1
          },
          hintText:
            "Помните, что любой сверхдоход подозрителен. Привлечение средств населения по ставкам выше рыночных не может быть выгодным для добросовестной организации. Также компания не будет скрывать информацию о себе и своём финансовом положении, лицензия будет в открытом доступе. Только реальная деятельность компании может быть надёжным источником дохода.",
          correctAnswer: "Сергею Ивановичу стоит выбрать ООО «Орандж Банк».",
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

      this.$store.commit("setPointComplete", { point: 9, block: 1 });
    }
  },
  computed: {
    showHintBtn() {
      return this.$store.getters.getPointStatus;
    },
    allFieldsFilled() {
      let answers;
      if (this.curWay == 0) {
        answers = this.ways[0].answers.q1.length >= 4;
        return answers;
      } else if (this.curWay == 1) {
        return !!this.ways[1].answers.q1;
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
        sum = 1 * this.ways[1].cost.correct;
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
