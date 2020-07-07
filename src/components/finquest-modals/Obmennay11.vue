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
          <h2 class="finquest-box__title h2">Станция «Обмен Валюты»</h2>
          <p class="finquest-box__text">
            – Добрый день! Вы пришли на станцию «Обмен Валюты». Обмен валюты – это сделки по продаже или покупке у банков денежных единиц
            одной страны за денежные единицы другой страны по установленным банками ценам (курсам). Задача человека – выбрать банк с
            выгодными условиями покупки или продажи валюты в определённое время, поскольку в течение дня они могут меняться. Часто
            иностранная валюта нужна для поездки за границу. Знание валютных курсов и трендов их изменения важно также, поскольку многие
            товары, которые продаются в Российской Федерации, закупаются компаниями-импортёрами за рубежом за иностранную валюту, как
            правило, доллар США или евро. Если стоимость иностранной валюты растёт, то может вырасти и стоимость этих товаров в России.
          </p>
          <p class="finquest-box__text"></p>
        </div>
      </div>
      <div
        class="finquest-box quest__block animationQueue2"
        :style="{opacity: questionStep >= 1 ? 1 : 0}"
      >
        <div class="finquest-box__body">
          <v-open-rollup :src="require('../../assets/images/finquest/Obmennay11/rollup.png')"></v-open-rollup>
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
            <template v-if="curWay == 0">
              Насте нужно обменять 15 000 руб. на евро в одном из 3 банков поблизости. Направьте Настю в тот банк, обмен в котором будет
              наиболее выгоден для неё.
              выгодный.
            </template>
            <template
              v-else-if="curWay == 1"
            >Перед вами Артём, которому нужно срочно обменять 15 000 руб. на доллары США в одном из банков поблизости. Направьте Артёма в тот банк, обмен в котором будет наиболее выгоден для него.</template>
          </div>
          <div class="finquest-box__text">
            <template v-if="curWay == 0">
              Проанализируйте предложения банков и выберите тот курс, по которому обмен для Насти будет самый
              выгодный.
              <br />
              <h3>Желтый банк</h3>
              <ul>
                <li>Покупка: 63.70 руб. за 1$</li>
                <li>Продажа: 64.70 руб. за 1$</li>
              </ul>
              <h3>Белый банк</h3>
              <ul>
                <li>Покупка: 63.10 руб. за 1$</li>
                <li>Продажа: 65.10 руб. за 1$</li>
              </ul>
              <h3>Красный банк</h3>
              <ul>
                <li>Покупка: 63.20 руб. за 1$</li>
                <li>Продажа: 67.50 руб. за 1$</li>
              </ul>
            </template>
            <template v-else-if="curWay == 1">
              Проанализируйте предложения банков и выберите тот курс обмена, который для Артёма будет самый выгодный.
              <h3>Желтый банк</h3>
              <ul>
                <li>Покупка: 63.70 руб. за 1$</li>
                <li>Продажа: 64.70 руб. за 1$</li>
              </ul>
              <h3>Белый банк</h3>
              <ul>
                <li>Покупка: 63.10 руб. за 1$</li>
                <li>Продажа: 65.10 руб. за 1$</li>
              </ul>
              <h3>Красный банк</h3>
              <ul>
                <li>Покупка: 63.20 руб. за 1$</li>
                <li>Продажа: 67.50 руб. за 1$</li>
              </ul>
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
            <template v-if="curWay == 0">
              Проанализируйте предложения банков и выберите тот курс, по которому обмен для Насти будет самый
              выгодный.
              <br />
              <h3>Желтый банк</h3>
              <ul>
                <li>Покупка: 63.70 руб. за 1$</li>
                <li>Продажа: 64.70 руб. за 1$</li>
              </ul>
              <h3>Белый банк</h3>
              <ul>
                <li>Покупка: 63.10 руб. за 1$</li>
                <li>Продажа: 65.10 руб. за 1$</li>
              </ul>
              <h3>Красный банк</h3>
              <ul>
                <li>Покупка: 63.20 руб. за 1$</li>
                <li>Продажа: 67.50 руб. за 1$</li>
              </ul>
            </template>
            <template v-else-if="curWay == 1">
              Проанализируйте предложения банков и выберите тот курс обмена, который для Артёма будет самый выгодный.
              <h3>Желтый банк</h3>
              <ul>
                <li>Покупка: 63.70 руб. за 1$</li>
                <li>Продажа: 64.70 руб. за 1$</li>
              </ul>
              <h3>Белый банк</h3>
              <ul>
                <li>Покупка: 63.10 руб. за 1$</li>
                <li>Продажа: 65.10 руб. за 1$</li>
              </ul>
              <h3>Красный банк</h3>
              <ul>
                <li>Покупка: 63.20 руб. за 1$</li>
                <li>Продажа: 67.50 руб. за 1$</li>
              </ul>
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
              >Направьте Настю в банк с самым выгодным для неё курсом обмена:</template>
              <template
                v-else-if="curWay == 1"
              >Направьте Артёма в банк с самым выгодным для него курсом обмена.</template>
            </h2>
            <div class="finquest-form">
              <template v-if="curWay == 0">
                <div class="banks" style="overflow: auto; width: 100%">
                  <div class="finquest-form__select-group">
                    <span class="finquest-form__select-group__title">Самый выгодный банк::</span>
                    <el-select v-model="ways[0].answers.q1" placeholder="Выберите ответ">
                      <el-option
                        v-for="question in ways[0].q1Options"
                        :key="question.value"
                        :label="question.label"
                        :value="question"
                      ></el-option>
                    </el-select>
                  </div>

                  <!-- <div class="bankWrapper" style="width: 792px;height: 282px;">
                    <img
                      src="../../assets/images/finquest/Obmennay11/bank1.png"
                      alt
                      class="bank bank--red"
                      :class="ways[0].answers.q1 == 'bankRed' ? 'active' : ''"
                      :style="this.ways[0].style.bankRed"
                      @click="setActiveBank('bankRed')"
                    />
                    <img
                      src="../../assets/images/finquest/Obmennay11/bank2.png"
                      alt
                      class="bank bank--yellow"
                      :class="ways[0].answers.q1 == 'bankYellow' ? 'active' : ''"
                      :style="this.ways[0].style.bankYellow"
                      @click="setActiveBank('bankYellow')"
                    />
                    <img
                      src="../../assets/images/finquest/Obmennay11/bank3.png"
                      alt
                      class="bank bank--gray"
                      :class="ways[0].answers.q1 == 'bankGray' ? 'active' : ''"
                      :style="this.ways[0].style.bankGray"
                      @click="setActiveBank('bankGray')"
                    />
                    <img
                      src="../../assets/images/finquest/Obmennay11/player.png"
                      alt
                      class="player"
                      :style="this.ways[0].style.player"
                    />
                    <img
                      src="../../assets/images/finquest/Obmennay11/q1p1.png"
                      class="q1p1-img"
                      alt
                    />
                  </div>-->
                </div>
              </template>
              <template v-else-if="curWay == 1">
                <div class="finquest-form__select-group">
                  <span class="finquest-form__select-group__title">Самый выгодный банк::</span>
                  <el-select v-model="ways[1].answers.q1" placeholder="Выберите ответ">
                    <el-option
                      v-for="question in ways[1].q1Options"
                      :key="question.value"
                      :label="question.label"
                      :value="question"
                    ></el-option>
                  </el-select>
                </div>
                <!-- <div class="banks" style="overflow: auto; width: 100%">
                  <div class="bankWrapper" style="width: 792px;height: 283px;">
                    <img
                      src="../../assets/images/finquest/Obmennay11/bank4.png"
                      alt
                      class="bank bank--yellow"
                      :class="ways[1].answers.q1 == 'bankYellow' ? 'active' : ''"
                      :style="this.ways[1].style.bankYellow"
                      @click="setActiveBank('bankYellow')"
                    />
                    <img
                      src="../../assets/images/finquest/Obmennay11/bank5.png"
                      alt
                      class="bank bank--white"
                      :class="ways[1].answers.q1 == 'bankWhite' ? 'active' : ''"
                      :style="this.ways[1].style.bankWhite"
                      @click="setActiveBank('bankWhite')"
                    />
                    <img
                      src="../../assets/images/finquest/Obmennay11/bank6.png"
                      alt
                      class="bank bank--red"
                      :class="ways[1].answers.q1 == 'bankRed' ? 'active' : ''"
                      :style="this.ways[1].style.bankRed"
                      @click="setActiveBank('bankRed')"
                    />
                    <img
                      src="../../assets/images/finquest/Obmennay11/player.png"
                      alt
                      class="player"
                      :style="this.ways[1].style.player"
                    />
                    <img
                      src="../../assets/images/finquest/Obmennay11/q1p2.png"
                      class="q1p1-img"
                      alt
                    />
                  </div>
                </div>-->
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
              label: "Желтый банк",
              isCorrect: true
            },
            {
              value: 2,
              label: "Белый банк"
            },
            {
              value: 3,
              label: "Красный банк"
            }
          ],
          cost: {
            correct: 1,
            hint: 1,
            zeroCorrect: 1
          },
          hintText:
            "Не забывайте, что если для Артема это покупка валюты, то для банка – продажа.",
          correctAnswer: `Самый выгодный курс – 64,70 руб. за доллар США в банке «Жёлтый».`,
          showHint: false
        },
        {
          answers: {
            q1: ""
          },
          q1Options: [
            {
              value: 1,
              label: "Желтый банк",
              isCorrect: true
            },
            {
              value: 2,
              label: "Белый банк"
            },
            {
              value: 3,
              label: "Красный банк"
            }
          ],
          cost: {
            correct: 1,
            hint: 1,
            zeroCorrect: 1
          },
          hintText:
            "Не забывайте, что если для Артема это покупка валюты, то для банка – продажа.",
          correctAnswer: `Самый выгодный курс – 64,70 руб. за доллар США в банке «Жёлтый».`,
          showHint: false
        }
        // {
        //   answers: {
        //     q1: ""
        //   },
        //   correctAnswer: {
        //     q1: "bankGray"
        //   },
        //   cost: {
        //     correct: 4,
        //     hint: 2,
        //     zeroCorrect: 1
        //   },
        //   style: {
        //     bankRed: {
        //       top: "9%",
        //       left: "9%"
        //     },
        //     bankYellow: {
        //       top: "55%",
        //       left: "30%"
        //     },
        //     bankGray: {
        //       top: "31%",
        //       left: "65%"
        //     },
        //     player: {
        //       top: "15%",
        //       left: "43%"
        //     }
        //   },
        //   hintText:
        //     "Не забывайте, что если для Насти это покупка валюты, то для банка – продажа.",
        //   correctAnswer:
        //     "Самый выгодный курс – 72,29 руб. за евро в банке «Серый».",
        //   showHint: false
        // },
        // {
        //   answers: {
        //     q1: ""
        //   },
        //   correctAnswer: {
        //     q1: "bankYellow"
        //   },
        //   cost: {
        //     correct: 5,
        //     hint: 2,
        //     zeroCorrect: 1
        //   },
        //   style: {
        //     bankRed: {
        //       top: "27%",
        //       left: "67%"
        //     },
        //     bankYellow: {
        //       top: "9%",
        //       left: "9%"
        //     },
        //     bankWhite: {
        //       top: "35%",
        //       left: "35%"
        //     },
        //     player: {
        //       top: "80%",
        //       left: "60%"
        //     }
        //   },
        //   hintText:
        //     "Не забывайте, что если для Артема это покупка валюты, то для банка – продажа.",
        //   correctAnswer:
        //     "Самый выгодный курс – 64,70 руб. за доллар США в банке «Жёлтый». ",
        //   showHint: false
        // }
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
    validateBeforeSubmit() {
      this.$validator.validateAll("questForm").then(result => {
        if (result) {
          this.closeFinquestModal();
          this.$store.dispatch("initChangePoint", false);
          this.openCongratulationModal("CongratulationPhilanthropist");
        }
      });
    },
    // setAnswer() {
    //   let answers, answersCount, correctAnswers, correctCost, newPoints;
    //   if (this.curWay == 0) {
    //     answers = this.ways[0].answers;
    //     answersCount = Object.keys(answers).length;
    //     correctAnswers = answers.q1 == this.ways[0].correctAnswer.q1 ? 1 : 0;
    //     correctCost = this.ways[0].cost.correct;
    //     this.closeFinquestModal();
    //     if (correctAnswers * correctCost > 0) {
    //       newPoints = correctAnswers * correctCost;
    //     } else {
    //       newPoints = this.ways[0].cost.zeroCorrect;
    //     }
    //     this.$store.dispatch("initChangePoint", false);
    //     // this.$store.commit("setLastQuestionCorrect", correctAnswers);
    //     // this.$store.commit("setLastQuestionAll", answersCount);
    //     // this.$store.commit("setLastQuestionCost", newPoints);

    //     this.$store.commit("setLastQuestion", {
    //       cost: newPoints,
    //       allCount: answersCount,
    //       correctCount: correctAnswers,
    //       correctAnswer: this.ways[0].correctAnswer,
    //       hint: this.ways[0].hintText
    //     });

    //     this.$store.commit("addPointsCount", newPoints);
    //     this.openCongratulationModal("FinquestQuestionResult");
    //   } else if (this.curWay == 1) {
    //     answers = this.ways[1].answers;
    //     answersCount = Object.keys(answers).length;
    //     correctAnswers = answers.q1 == this.ways[1].correctAnswer.q1 ? 1 : 0;
    //     correctCost = this.ways[1].cost.correct;
    //     this.closeFinquestModal();
    //     if (correctAnswers * correctCost > 0) {
    //       newPoints = correctAnswers * correctCost;
    //     } else {
    //       newPoints = this.ways[1].cost.zeroCorrect;
    //     }
    //     this.$store.dispatch("initChangePoint", false);
    //     // this.$store.commit("setLastQuestionCorrect", correctAnswers);
    //     // this.$store.commit("setLastQuestionAll", answersCount);
    //     // this.$store.commit("setLastQuestionCost", newPoints);

    //     this.$store.commit("setLastQuestion", {
    //       cost: newPoints,
    //       allCount: answersCount,
    //       correctCount: correctAnswers,
    //       correctAnswer: this.ways[1].correctAnswer,
    //       hint: this.ways[1].hintText
    //     });

    //     this.$store.commit("addPointsCount", newPoints);
    //     this.openCongratulationModal("FinquestQuestionResult");
    //   }
    //   this.$store.commit("setPointComplete", { point: 12, block: 1 });
    // },

    setAnswer() {
      let answers, correctAnswers, correctCost, newPoints;
      //   if (this.curWay == 0) {
      answers = Object.values(this.ways[this.curWay].answers);
      correctAnswers = answers.filter(item => {
        return !!item.isCorrect;
      }).length;
      correctCost = this.ways[this.curWay].cost.correct;
      this.closeFinquestModal();
      if (correctAnswers * correctCost > 0) {
        newPoints = correctAnswers * correctCost;
      } else {
        newPoints = this.ways[this.curWay].cost.zeroCorrect;
      }
      this.$store.dispatch("initChangePoint", false);
      // this.$store.commit("setLastQuestionCorrect", correctAnswers);
      // this.$store.commit("setLastQuestionAll", answers.length);
      // this.$store.commit("setLastQuestionCost", newPoints);
      this.$store.commit("setLastQuestion", {
        cost: newPoints,
        allCount: answers.length,
        correctCount: correctAnswers,
        correctAnswer: this.ways[this.curWay].correctAnswer,
        hint: this.ways[this.curWay].hintText
      });

      this.$store.commit("addPointsCount", newPoints);
      this.openCongratulationModal("FinquestQuestionResult");
      //   }

      this.$store.commit("setPointComplete", { point: 12, block: 1 });
    },
    setActiveBank(bank) {
      this.ways[this.curWay].answers.q1 = bank;
      this.ways[this.curWay].style.player = this.ways[this.curWay].style[bank];
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
      if (this.curWay == 0) {
        return !!this.ways[0].answers.q1;
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

<style>
.q1p1-img {
  width: 100% !important;
}
.bankWrapper {
  position: relative;
  width: 100%;
}
.bank {
  position: absolute;
  transition: 0.3s;
}

.bank--red:hover,
.bank--red.active {
  outline: 3px solid red;
}

.bank--yellow:hover,
.bank--yellow.active {
  outline: 3px solid yellow;
}

.bank--gray:hover,
.bank--gray.active {
  outline: 3px solid gray;
}

.bank--white:hover,
.bank--white.active {
  outline: 3px solid white;
}

.bank:hover {
  cursor: pointer;
}

.player {
  position: absolute;
  transition: 0.3s;
}
</style>
