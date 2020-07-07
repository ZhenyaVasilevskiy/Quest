<template>
  <el-row class="finquest-modal-inner" type="flex" justify="space-around">
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
        ref="animationQueue1"
      >
        <div class="finquest-box__body">
          <h2 class="finquest-box__title h2" v-html="gameStep.stationName"></h2>
          <p class="finquest-box__text" v-html="gameStep.stationDescription"></p>
          <p class="finquest-box__text" v-html="gameStep.stationText"></p>
        </div>
      </div>
      <div
        class="finquest-box quest__block animationQueue2"
        :style="{opacity: questionStep >= 1 ? 1 : 0}"
      >
        <div class="finquest-box__body">
          <v-open-rollup
            :src="require(`../../assets/images/finquest/${gameStep.stationId}/rollup.png`)"
          ></v-open-rollup>
          <!-- <v-open-rollup :src="require(`../../assets/images/finquest/Domashny1/rollup.png`)"></v-open-rollup> -->
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
            <slot name="task"></slot>
          </div>
        </div>
      </div>
      <div
        class="finquest-box quest__block animationQueue4"
        :style="{opacity: questionStep >= 3 ? 1 : 0}"
      >
        <div class="finquest-box__body">
          <h2 class="finquest-box__title h2">Вопрос</h2>
          <div class="finquest-box__text">
            <slot name="question"></slot>
          </div>
        </div>
      </div>
    </el-col>
    <el-col
      :sm="{span:17, push: 3}"
      :lg="{span: 8, push: 0}"
      :style="{opacity: questionStep >= 4 ? 1 : 0}"
    >
      <el-col class="finquest-box-col" :class="{ 'is-active': step === 3 }">
        <div class="finquest-box finquest-box--question animationQueue5">
          <div class="finquest-box__header"></div>
          <div class="finquest-box__body">
            <h2 class="finquest-box__title h2">
              <slot name="question_tip"></slot>
            </h2>
            <div class="finquest-form">
              <slot name="question_body"></slot>
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

              <button class="finquest-box__hint" @click="openHint" v-if="showHintBtn">
                <img src="../../assets/images/finquest/question-sm.png" alt="hint" />
                <span class="finquest-box__hint__name">Нужна подсказка?</span>
              </button>
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
    <button
      class="button--green button button--xs buttonStep"
      ref="nextButton"
      @click="questionStep++"
      v-show="questionStep < 4"
    >Далее</button>
  </el-row>
</template>

<script>
export default {
  name: "finquest-quest",
  props: ["gameStep"],
  data() {
    return {
      step: 1,
      questionStep: 0,
      questionStepStyle: [
        { top: 0, left: 0 },
        { top: 0, left: 0 },
        { top: 0, left: 0 },
        { top: 0, left: 0 }
      ],
      selected: {}
    };
  },
  methods: {
    nextStep() {
      if (this.step + 1 <= 3) {
        this.step++;
      }
    },
    optionIsDisabled(option) {
      return (
        this.ways[1].answers.q1.map(item => item.label).includes(option) ||
        this.ways[1].answers.q2.map(item => item.label).includes(option)
      );
    },
    setNextBtnStyle() {
      //   debugger;
      let nextBtn = document.getElementsByClassName("buttonStep")[0];
      if (!nextBtn) return;
      let topPosition, leftPosition;
      let block = document.getElementsByClassName(
        "animationQueue" + this.questionStep
      )[0];
      topPosition = block.offsetTop - 50 + "px";
      leftPosition = block.offsetLeft - 186 + "px";
      return {
        top: topPosition,
        left: leftPosition
      };
    },
    openHint() {
      if (this.showHintBtn) {
        this.$store.dispatch("initHintCost", this.ways[this.curWay].cost.hint);
        this.openHintModal("HintModalActivate");
      }
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
        let correct = [
          "Заработная плата",
          "Пенсии",
          "Доходы от приусадебного хозяйства",
          "Арендный доход",
          "Премии",
          "Доходы от ценных бумаг. Процентный доход.",
          "Материнский капитал",
          "Наследство",
          "Выигрыш в лотерею"
        ];
        let q1 = this.ways[1].answers.q1;
        let q2 = this.ways[1].answers.q2;
        answers = Object.values(this.ways[0].answers);
        let correctAnswers1 = q1.filter(
          (item, itemKey) => item.label == correct[itemKey]
        ).length;
        let correctAnswers2 = q2.filter(
          (item, itemKey) => item.label == correct[itemKey]
        ).length;
        correctAnswers = correctAnswers1 + correctAnswers2;
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

      this.$store.commit("setPointComplete", { point: 0, block: 0 });
    },
    closeModal() {
      return this.$store.commit("setShowHint", false);
    },
    drag(ev) {
      ev.dataTransfer.setData("text", ev.target.innerText);
    },
    allowDrop(ev) {
      ev.preventDefault();
    },
    drop(ev, disabled) {
      ev.preventDefault();
      if (disabled) return;
      let text = ev.dataTransfer.getData("text");
      let question = ev.currentTarget.dataset.question;
      let index = ev.currentTarget.dataset.index;
      //   this.ways[1].answers[question][index].label = text;
      this.$set(this.ways[1].answers[question][index], "label", text);

      //   let q1 = this.ways[1].answers.q1;
      //   let q2 = this.ways[1].answers.q2;
      //   // Не должно быть пустых
      //   console.log(q1.filter(item => item.label == ""));
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
        let q1 = this.ways[1].answers.q1;
        let q2 = this.ways[1].answers.q2;
        answers = Object.values(this.ways[1].answers);
        // Не должно быть пустых
        return (
          q1.filter(item => item.label == "").length == 0 &&
          q2.filter(item => item.label == "").length == 0
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
      } else if (this.curWay == 0) {
        sum = 5;
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
.diagramma {
  position: relative;
}
.diagramma__input {
  position: absolute;
  width: 70px;
  height: 40px;
  overflow-wrap: break-word;
  resize: none;
  font-size: 10px;
  border: none;
}

.diagramma__input1 {
  top: 10%;
  left: 30%;
}
.diagramma__input2 {
  top: 10%;
  left: 56%;
}
.diagramma__input3 {
  top: 36%;
  left: 66%;
  width: 100px;
  padding: 0;
  overflow: hidden;
}
.diagramma__input4 {
  top: 57%;
  left: 73%;
}
.diagramma__input5 {
  top: 76%;
  left: 53%;
}
.diagramma__input6 {
  top: 73%;
  left: 20%;
  width: 100px;
  padding: 0;
  overflow: hidden;
}
.diagramma__input7 {
  top: 57%;
  left: 7%;
  width: 80px;
  padding: 0;
  overflow: hidden;
}
.diagramma__input8 {
  top: 42%;
  left: 4%;
}
.diagramma__input9 {
  top: 25%;
  left: 11%;
}
.q2_answer {
  padding: 5px;
  border: 1px solid gray;
  display: inline-block;
  border-radius: 4px;
  margin-right: 5px;
  margin-bottom: 5px;
}

.diagramma__input1_2 {
  top: 80%;
  left: 62%;
  padding: 0;
  overflow: hidden;
}
.diagramma__input2_2 {
  top: 70%;
  left: 46%;
  padding: 0;
  overflow: hidden;
}
.diagramma__input3_2 {
  top: 76%;
  left: 19%;
}
.diagramma__input4_2 {
  top: 57%;
  left: 7%;
}
.diagramma__input5_2 {
  top: 42%;
  left: 3%;
}
.diagramma__input6_2 {
  top: 23%;
  left: 8%;
}
.diagramma__input7_2 {
  top: 7%;
  left: 19%;
  width: 80px;
  padding: 0;
  overflow: hidden;
}
.diagramma__input8_2 {
  top: 20%;
  left: 38%;
}
.diagramma__input9_2 {
  top: 11%;
  left: 58%;
}
.diagramma__input10_2 {
  top: 33%;
  left: 68%;
  width: 100px;
  height: 60px;
  padding: 0;
  overflow: hidden;
}
.diagramma__input11_2 {
  top: 55%;
  left: 78%;
}
.diagramma__input12_2 {
  top: 67%;
  left: 68%;
}
.animationQueue3 {
  /* height: auto; */
}
</style>