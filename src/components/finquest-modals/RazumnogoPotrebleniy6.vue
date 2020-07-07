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
          <h2 class="finquest-box__title h2">Станция «Экономь с умом»</h2>
          <p class="finquest-box__text">
            – Добрый день! Вы пришли на станцию «Экономь с умом». Познакомьтесь с 12 способами, как сократить семейные расходы на
            инфографике, и решите задачу.
          </p>
          <p class="finquest-box__text"></p>
        </div>
      </div>
      <div
        class="finquest-box quest__block animationQueue2"
        :style="{opacity: questionStep >= 1 ? 1 : 0}"
      >
        <div class="finquest-box__body">
          <v-open-rollup
            :src="require('../../assets/images/finquest/RazumnogoPotrebleniy6/rollup.png')"
          ></v-open-rollup>
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
              Катя купила в своём любимом магазине женской одежды джемпер и свитер общей стоимостью 2 700 руб. На кассе ей предложили купить
              набор носков стоимостью 300 руб., так как в магазине действовала акция: «При покупке от 3 000 рублей – скидка 10%».
            </template>
            <template v-else-if="curWay == 1">
              Коля сделал покупки в магазине на 1 800 руб. На кассе действует акция: «Купи дисконтную карту и получи скидку на покупку 5% прямо сейчас». В магазине Коля видел множество товаров со скидкой более 15% по дисконтной карте.
              Дисконтная карта стоит 50 руб. и даёт право на скидку со следующего после покупки дня. Продавец предложил приобрести её перед покупкой.
            </template>
          </div>
          <div class="finquest-box__text">
            <template
              v-if="curWay == 0"
            >Сколько Катя заплатит, если решит воспользоваться предложением на кассе? Выгодно ли это предложение для Кати?</template>
            <template v-else-if="curWay == 1">Нужно ли Коле согласиться на предложение продавца?</template>
          </div>
        </div>
      </div>
      <!-- <div
        class="finquest-box quest__block quest__block animationQueue4"
        :style="{opacity: questionStep >= 3 ? 1 : 0}"
      >
        <div class="finquest-box__body">
          <h2 class="finquest-box__title h2">Вопрос</h2>
          <div class="finquest-box__text">
            <template
              v-if="curWay == 0"
            >Сколько Катя заплатит, если решит воспользоваться предложением на кассе? Выгодно ли это предложение для Кати?</template>
            <template v-else-if="curWay == 1">Нужно ли Коле согласиться на предложение продавца?</template>
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
                  >Если Катя откажется от предложения, она заплатит:</span>
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
                  >Сумма покупки вместе с носками без учета акции составит:</span>
                  <el-select v-model="ways[0].answers.q2" placeholder="Выберите ответ">
                    <el-option
                      v-for="question in ways[0].q2Options"
                      :key="question.value"
                      :label="question.label"
                      :value="question"
                    ></el-option>
                  </el-select>
                </div>
                <div class="finquest-form__select-group">
                  <span
                    class="finquest-form__select-group__title"
                  >Скидка 10% по условиям акции для Кати составит:</span>
                  <el-select v-model="ways[0].answers.q3" placeholder="Выберите ответ">
                    <el-option
                      v-for="question in ways[0].q3Options"
                      :key="question.value"
                      :label="question.label"
                      :value="question"
                    ></el-option>
                  </el-select>
                </div>
                <div class="finquest-form__select-group">
                  <span
                    class="finquest-form__select-group__title"
                  >Если Катя воспользуется акцией, то заплатит:</span>
                  <el-select v-model="ways[0].answers.q4" placeholder="Выберите ответ">
                    <el-option
                      v-for="question in ways[0].q4Options"
                      :key="question.value"
                      :label="question.label"
                      :value="question"
                    ></el-option>
                  </el-select>
                </div>
                <div class="finquest-form__select-group">
                  <span
                    class="finquest-form__select-group__title"
                  >Выгодно ли это предложение для Кати:</span>
                  <el-select v-model="ways[0].answers.q5" placeholder="Выберите ответ">
                    <el-option
                      v-for="question in ways[0].q5Options"
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
                  >Если Коля откажется от предложения, он заплатит:</span>
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
                  >Скидка 5% по условиям дисконтной карты для Коли составит:</span>
                  <el-select v-model="ways[1].answers.q2" placeholder="Выберите ответ">
                    <el-option
                      v-for="question in ways[1].q2Options"
                      :key="question.value"
                      :label="question.label"
                      :value="question"
                    ></el-option>
                  </el-select>
                </div>
                <div class="finquest-form__select-group">
                  <span class="finquest-form__select-group__title">Сумма покупки с учётом скидки:</span>
                  <el-select v-model="ways[1].answers.q3" placeholder="Выберите ответ">
                    <el-option
                      v-for="question in ways[1].q3Options"
                      :key="question.value"
                      :label="question.label"
                      :value="question"
                    ></el-option>
                  </el-select>
                </div>
                <div class="finquest-form__select-group">
                  <span
                    class="finquest-form__select-group__title"
                  >Итоговая сумма покупки с учётом скидки и стоимости дисконтной карты:</span>
                  <el-select v-model="ways[1].answers.q4" placeholder="Выберите ответ">
                    <el-option
                      v-for="question in ways[1].q4Options"
                      :key="question.value"
                      :label="question.label"
                      :value="question"
                    ></el-option>
                  </el-select>
                </div>
                <div class="finquest-form__select-group">
                  <span class="finquest-form__select-group__title">Нужно ли Коле согласиться?</span>
                  <el-select v-model="ways[1].answers.q5" placeholder="Выберите ответ">
                    <el-option
                      v-for="question in ways[1].q5Options"
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
            q2: "",
            q3: "",
            q4: "",
            q5: ""
          },
          q1Options: [
            {
              value: 1,
              label: "2 550 руб."
            },
            {
              value: 2,
              label: "2 700 руб.",
              isCorrect: true
            },
            {
              value: 3,
              label: "3 000 руб."
            },
            {
              value: 4,
              label: "3 300 руб."
            },
            {
              value: 5,
              label: "3 700 руб."
            }
          ],
          q2Options: [
            {
              value: 1,
              label: "2 400 руб."
            },
            {
              value: 2,
              label: "2 900 руб."
            },
            {
              value: 3,
              label: "3 000 руб.",
              isCorrect: true
            },
            {
              value: 4,
              label: "3 200 руб."
            },
            {
              value: 5,
              label: "3 750 руб."
            }
          ],
          q3Options: [
            {
              value: 1,
              label: "240 руб."
            },
            {
              value: 2,
              label: "290 руб."
            },
            {
              value: 3,
              label: "300 руб.",
              isCorrect: true
            },
            {
              value: 4,
              label: "320 руб."
            },
            {
              value: 5,
              label: "375 руб."
            }
          ],
          q4Options: [
            {
              value: 1,
              label: "2 700 руб.",
              isCorrect: true
            },
            {
              value: 2,
              label: "2 850 руб."
            },
            {
              value: 3,
              label: "2 900 руб."
            },
            {
              value: 4,
              label: "3 000 руб."
            },
            {
              value: 5,
              label: "3 100 руб."
            }
          ],
          q5Options: [
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
            correct: 1,
            hint: 1,
            zeroCorrect: 1
          },
          hintText:
            "Обратите внимание, что дополнительный товар, приобретаемый во время действия акций (или скидок), может достаться вам бесплатно.",
          correctAnswer: `<ul>
    <li>Сумма покупки без носков и участия в акции: 2 700 руб.  </li>
    <li>Сумма покупки вместе с  носками без учёта акции : 3 000 руб. </li>
    <li>Скидка по условиям акции (10%): 3 000 × 0,1 = 300 руб.  </li>
    <li>Итого сумма покупки: 2 700 руб.  </li>
    <li>Предложение выгодно: набор носков за 0 руб. вместо 300 руб.; скидка составила 10%. </li>
</ul>`,
          showHint: false
        },
        {
          answers: {
            q1: "",
            q2: "",
            q3: "",
            q4: "",
            q5: ""
          },
          q1Options: [
            {
              value: 1,
              label: "1 500 руб."
            },
            {
              value: 2,
              label: "1 760 руб."
            },
            {
              value: 3,
              label: "1 800 руб.",
              isCorrect: true
            },
            {
              value: 4,
              label: "1 850 руб."
            },
            {
              value: 5,
              label: "2 000 руб."
            }
          ],
          q2Options: [
            {
              value: 1,
              label: "50 руб."
            },
            {
              value: 2,
              label: "90 руб.",
              isCorrect: true
            },
            {
              value: 3,
              label: "100 руб."
            },
            {
              value: 4,
              label: "120 руб."
            },
            {
              value: 5,
              label: "135 руб."
            }
          ],
          q3Options: [
            {
              value: 1,
              label: "1 590 руб"
            },
            {
              value: 2,
              label: "1 710 руб",
              isCorrect: true
            },
            {
              value: 3,
              label: "1 800 руб"
            },
            {
              value: 4,
              label: "1 890 руб"
            },
            {
              value: 5,
              label: "1 910 руб"
            }
          ],
          q4Options: [
            {
              value: 1,
              label: "1 640 руб."
            },
            {
              value: 2,
              label: "1 760 руб.",
              isCorrect: true
            },
            {
              value: 3,
              label: "1 850 руб."
            },
            {
              value: 4,
              label: "1 850 руб."
            },
            {
              value: 5,
              label: "1 960 руб."
            }
          ],
          q5Options: [
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
            correct: 1,
            hint: 1,
            zeroCorrect: 1
          },
          hintText:
            "Сравните стоимость покупки с дисконтом и без. Не забудьте учесть стоимость карты и то, что на неё дисконт не распространяется.",
          correctAnswer: `<ul>
    <li>Если Коля откажется от предложения, он заплатит: 1 800 руб.  </li>
    <li>Скидка 5% по условиям дисконтной карты для Коли составит: 90 руб.   </li>
    <li>Сумма покупки с учётом скидки: 1 710 руб.   </li>
    <li>Итоговая сумма покупки с учётом  скидки и стоимости дисконтной карты:  1 760 руб. 50+1 800×0,95 = 1 760 руб. нужно заплатить, если купить дисконтную карту;   </li>
    <li> 1 800 > 1760. Да, Коле стоит согласиться на это предложение.  </li>
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

      this.$store.commit("setPointComplete", { point: 5, block: 0 });
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
