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
          <h2 class="finquest-box__title h2">Станция «Кредит за пять минут»</h2>
          <p class="finquest-box__text">
            – Добрый день! Вы на станции «Кредит за пять минут».
            Кредиты можно получить только в банке. Но если нам нужны деньги, мы можем получить их также в виде займов в других организациях или у других людей. Такие займы, которые дают друг другу знакомые, могут быть совсем беспроцентные или предоставлены на очень льготных условиях. А вот займы, которые выдают специальные финансовые компании (микрофинансовые организации), обычно существенно дороже банковских кредитов. Такие займы часто предлагаются на короткие сроки (от нескольких дней до нескольких недель), и напрямую сравнивать процентные ставки по ним с более длительными банковскими кредитами нельзя.
            Инфографика поможет вам разобраться, в чём отличие между займом и кредитом и в чём разница между начислением процентов в разные периоды времени.
            Вооружитесь этими знаниями!
          </p>
          <p class="finquest-box__text">Изучите инфографику и решите задачу.</p>
        </div>
      </div>
      <div
        class="finquest-box quest__block animationQueue2"
        :style="{opacity: questionStep >= 1 ? 1 : 0}"
      >
        <div class="finquest-box__body">
          <v-open-rollup :src="require('../../assets/images/finquest/Momentalnay3/rollup.png')"></v-open-rollup>
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
            >Какое предложение стоит порекомендовать Глебу своему дедушке?</template>
            <template v-if="curWay == 1">Какое предложение стоит порекомендовать Марии Сергеевне?</template>
          </div>
          <div class="finquest-box__text">
            <template
              v-if="curWay == 0"
            >Какое предложение стоит порекомендовать Глебу своему дедушке?</template>
            <template v-if="curWay == 1">Какое предложение стоит порекомендовать Марии Сергеевне?</template>
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
            >Какое предложение стоит порекомендовать Глебу своему дедушке?</template>
            <template v-if="curWay == 1">Какое предложение стоит порекомендовать Марии Сергеевне?</template>
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
                <el-table :data="ways[0].q1" style="width: 100%">
                  <el-table-column prop="info" label="Информация о кредите" width="200"></el-table-column>
                  <el-table-column label="% ставка в год будет составлять">
                    <el-table-column prop="q1_1" width="80">
                      <template slot-scope="scope">
                        <el-radio
                          :label="scope.row.q1_1"
                          :name="scope.row.q1_1.name"
                          v-model="ways[0].answers[scope.row.q1_1.name]"
                        >{{ scope.row.q1_1.value }}</el-radio>
                      </template>
                    </el-table-column>
                    <el-table-column prop="q1_2" width="80">
                      <template slot-scope="scope">
                        <el-radio
                          :label="scope.row.q1_2"
                          :name="scope.row.q1_2.name"
                          v-model="ways[0].answers[scope.row.q1_2.name]"
                        >{{ scope.row.q1_2.value }}</el-radio>
                      </template>
                    </el-table-column>
                    <el-table-column prop="q1_3" width="80">
                      <template slot-scope="scope">
                        <el-radio
                          :label="scope.row.q1_3"
                          :name="scope.row.q1_3.name"
                          v-model="ways[0].answers[scope.row.q1_3.name]"
                        >{{ scope.row.q1_3.value }}</el-radio>
                      </template>
                    </el-table-column>
                    <el-table-column prop="q1_4" width="80">
                      <template slot-scope="scope">
                        <el-radio
                          :label="scope.row.q1_4"
                          :name="scope.row.q1_4.name"
                          v-model="ways[0].answers[scope.row.q1_4.name]"
                        >{{ scope.row.q1_4.value }}</el-radio>
                      </template>
                    </el-table-column>
                    <el-table-column prop="q1_5" width="80">
                      <template slot-scope="scope">
                        <el-radio
                          :label="scope.row.q1_5"
                          :name="scope.row.q1_5.name"
                          v-model="ways[0].answers[scope.row.q1_5.name]"
                        >{{ scope.row.q1_5.value }}</el-radio>
                      </template>
                    </el-table-column>
                  </el-table-column>
                </el-table>

                <div class="finquest-form__select-group">
                  <span
                    class="finquest-form__select-group__title"
                  >Отметьте предложение, которое стоит порекомендовать Глебу своему дедушке:</span>
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
                <el-table :data="ways[1].q1" style="width: 100%">
                  <el-table-column prop="info" label="Информация о кредите "></el-table-column>
                  <el-table-column label=" ">
                    <el-table-column label="% ставка в год будет составлять">
                      <el-table-column prop="q1_1">
                        <template slot-scope="scope">
                          <el-radio
                            :label="scope.row.q1_1"
                            :name="scope.row.q1_1.name"
                            v-model="ways[1].answers[scope.row.q1_1.name]"
                          >{{ scope.row.q1_1.value }}</el-radio>
                        </template>
                      </el-table-column>
                      <el-table-column prop="q1_2">
                        <template slot-scope="scope">
                          <el-radio
                            :label="scope.row.q1_2"
                            :name="scope.row.q1_2.name"
                            v-model="ways[1].answers[scope.row.q1_2.name]"
                          >{{ scope.row.q1_2.value }}</el-radio>
                        </template>
                      </el-table-column>
                      <el-table-column prop="q1_3">
                        <template slot-scope="scope">
                          <el-radio
                            :label="scope.row.q1_3"
                            :name="scope.row.q1_3.name"
                            v-model="ways[1].answers[scope.row.q1_3.name]"
                          >{{ scope.row.q1_3.value }}</el-radio>
                        </template>
                      </el-table-column>
                      <el-table-column prop="q1_4">
                        <template slot-scope="scope">
                          <el-radio
                            :label="scope.row.q1_4"
                            :name="scope.row.q1_4.name"
                            v-model="ways[1].answers[scope.row.q1_4.name]"
                          >{{ scope.row.q1_4.value }}</el-radio>
                        </template>
                      </el-table-column>
                    </el-table-column>
                    <el-table-column prop="q1_5">
                      <template slot-scope="scope">
                        <el-radio
                          :label="scope.row.q1_5"
                          :name="scope.row.q1_5.name"
                          v-model="ways[1].answers[scope.row.q1_5.name]"
                        >{{ scope.row.q1_5.value }}</el-radio>
                      </template>
                    </el-table-column>
                  </el-table-column>
                </el-table>

                <div class="finquest-form__select-group">
                  <span
                    class="finquest-form__select-group__title"
                  >Какое предложение стоит порекомендовать Марии Сергеевне?</span>
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
            q1_1: "",
            q1_2: "",
            q1_3: "",
            q1_4: "",
            q2: ""
          },
          q1: [
            {
              info:
                "Потребительский кредит от «АБВ-банка» по ставке 18% в год.",
              q1_1: {
                value: "18%",
                name: "q1_1",
                isCorrect: true
              },
              q1_2: {
                value: "20%",
                name: "q1_1"
              },
              q1_3: {
                value: "50%",
                name: "q1_1"
              },
              q1_4: {
                value: "70%",
                name: "q1_1"
              },
              q1_5: {
                value: "180%",
                name: "q1_1"
              }
            },
            {
              info: "Заём от компании «Быстрые деньги» по ставке 0,5% в день.",
              q1_1: {
                value: "10%",
                name: "q1_2"
              },
              q1_2: {
                value: "38%",
                name: "q1_2"
              },
              q1_3: {
                value: "45%",
                name: "q1_2"
              },
              q1_4: {
                value: "182.5%",
                name: "q1_2",
                isCorrect: true
              },
              q1_5: {
                value: "120%",
                name: "q1_2"
              }
            },
            {
              info:
                "Кредит на неотложные нужды от банка «Финансы и кредит» по ставке 7% в квартал.",
              q1_1: {
                value: "28%",
                name: "q1_3",
                isCorrect: true
              },
              q1_2: {
                value: "42%",
                name: "q1_3"
              },
              q1_3: {
                value: "55%",
                name: "q1_3"
              },
              q1_4: {
                value: "70%",
                name: "q1_3"
              },
              q1_5: {
                value: "123%",
                name: "q1_3"
              }
            },
            {
              info: "Заём от компании «Деньги для вас» по ставке 10% в месяц.",
              q1_1: {
                value: "24%",
                name: "q1_4"
              },
              q1_2: {
                value: "55%",
                name: "q1_4"
              },
              q1_3: {
                value: "81%",
                name: "q1_4"
              },
              q1_4: {
                value: "95%",
                name: "q1_4"
              },
              q1_5: {
                value: "120%",
                name: "q1_4",
                isCorrect: true
              }
            }
          ],
          q2Options: [
            {
              value: 1,
              label: "АБВ-банк.",
              isCorrect: true
            },
            {
              value: 2,
              label: "Компания «Быстрые деньги»."
            },
            {
              value: 3,
              label: "Банк «Финансы и кредит»."
            },
            {
              value: 4,
              label: "Компания «Деньги для вас»"
            }
          ],
          q1Radio: [],
          cost: {
            correct: 1,
            hint: 1,
            zeroCorrect: 1
          },
          hintText:
            "Чтобы сравнивать процентные ставки, приведите их к одному формату.",
          correctAnswer: `1) Лучшие условия по разным кредитным предложениям банков:
          <div>
            <div>Потребительский кредит от «АБВ-банка», процентная ставка в год.</div>
            <div>18%</div>
          </div>

          <div>
            <div>Заём от компании «Быстрые деньги», процентная ставка в год.</div>
            <div>182,5%</div>
          </div>

          <div>
            <div>Кредит на неотложные нужды от банка «Финансы и кредит», процентная ставка в год.</div>
            <div>28%</div>
          </div>

          <div>
            <div>Заём от компании «Деньги для вас», процентная ставка в год.</div>
            <div>120%</div>
          </div>2) Глебу своему дедушке стоит порекомендовать: АБВ-банк.`,
          showHint: false
        },
        {
          answers: {
            q1_1: "",
            q1_2: "",
            q1_3: "",
            q1_4: "",
            q2: ""
          },
          q1: [
            {
              info:
                "Потребительский кредит от «Нова-банк» по ставке 11% в год. ",
              q1_1: {
                value: "11%",
                name: "q1_1",
                isCorrect: true
              },
              q1_2: {
                value: "17%",
                name: "q1_1"
              },
              q1_3: {
                value: "44%",
                name: "q1_1"
              },
              q1_4: {
                value: "88%",
                name: "q1_1"
              },
              q1_5: {
                value: "111%",
                name: "q1_1"
              }
            },
            {
              info: "Заём от компании «Молния Маней» по ставке 0,02% в день",
              q1_1: {
                value: "4%",
                name: "q1_2"
              },
              q1_2: {
                value: "15%",
                name: "q1_2"
              },
              q1_3: {
                value: "62%",
                name: "q1_2"
              },
              q1_4: {
                value: "182.5%",
                name: "q1_2",
                isCorrect: true
              },
              q1_5: {
                value: "200%",
                name: "q1_2"
              }
            },
            {
              info:
                "Кредит на неотложные нужды от банка «Финансы» по ставке 4% в квартал.",
              q1_1: {
                value: "12%",
                name: "q1_3"
              },
              q1_2: {
                value: "16%",
                name: "q1_3",
                isCorrect: true
              },
              q1_3: {
                value: "24%",
                name: "q1_3"
              },
              q1_4: {
                value: "44%",
                name: "q1_3"
              },
              q1_5: {
                value: "144%",
                name: "q1_3"
              }
            },
            {
              info: "Заём от компании «Деньги у вас» по ставке 7% в месяц.",
              q1_1: {
                value: "7%",
                name: "q1_4"
              },
              q1_2: {
                value: "14%",
                name: "q1_4"
              },
              q1_3: {
                value: "52%",
                name: "q1_4"
              },
              q1_4: {
                value: "70%",
                name: "q1_4"
              },
              q1_5: {
                value: "152%",
                name: "q1_4",
                isCorrect: true
              }
            }
          ],
          q2Options: [
            {
              value: 1,
              label: "Нова-банк",
              isCorrect: true
            },
            {
              value: 2,
              label: "Компания «Молния Маней»"
            },
            {
              value: 3,
              label: "Банк «Финансы»"
            },
            {
              value: 4,
              label: "Компания «Деньги у вас»"
            }
          ],
          q1Radio: [],
          cost: {
            correct: 1,
            hint: 1,
            zeroCorrect: 1
          },
          hintText:
            "Чтобы сравнивать процентные ставки, приведите их к одному формату.",
          correctAnswer: `1) Лучшие условия по разным кредитным предложениям банков: 
            <div>
            <div>Потребительский кредит от «Нова-банк», процентная ставка в год </div>
            <div>11% </div>
            </div>

            <div>
            <div>Заём от компании «Молния Маней», процентная ставка в год </div>
            <div>182,5% </div>
            </div>

            <div>
            <div>Кредит на неотложные нужды от банка «Финансы», процентная ставка в год </div>
            <div>16% </div>
            </div>

            <div>
            <div>Заём от компании «Деньги у вас», процентная ставка в год </div>
            <div>52% </div>
            </div>
            2) Марии Сергеевне стоит  рекомендовать предложение:  Нова-банк.  `,
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
      this.$store.commit("setPointComplete", { point: 11, block: 2 });
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

<style >
.el-table {
  margin-bottom: 30px;
}
.finquest-form {
  flex-direction: column;
  align-items: flex-start;
}
</style>