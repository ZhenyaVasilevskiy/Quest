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
          <h2 class="finquest-box__title h2">Станция «Дома на семейном совете»</h2>
          <p class="finquest-box__text">
            Добрый день! Вы попали на станцию «Дома на семейном совете». Перед вами структура доходов и расходов одной из семей вашего
            города. Если мы напишем плановые или фактические суммы этих доходов и расходов, то получим бюджет семьи.
            <br />Бюджет – это запись доходов и расходов человека, семьи, организации или государства в целом за определённый период
            времени. Основная задача ведения семейного бюджета состоит в том, чтобы рационально (грамотно) распоряжаться денежными
            средствами, которыми располагает семья. Часто чтобы позволить себе достаточно дорогую вещь, следует в течение нескольких
            месяцев специально откладывать на её покупку сэкономленную часть бюджета. Если скорость накопления вас не устраивает,
            возможно, от части расходов стоит отказаться или пересмотреть их размер. Поэтому ведение бюджета – это не только запись
            фактических и планируемых доходов и расходов, но ещё и их анализ. Так становится понятно, на что тратится слишком много денег,
            какие расходы можно сократить, чтобы достичь финансовой цели. При разделении расходов на обязательные и необязательные можно
            выделить те статьи, на которых можно сэкономить, тем самым давая себе возможность купить что-то более ценное и нужное.
          </p>
          <p
            class="finquest-box__text"
          >Изучите внимательно представленную инфографику и выполните задание.</p>
        </div>
      </div>
      <div
        class="finquest-box quest__block animationQueue2"
        :style="{opacity: questionStep >= 1 ? 1 : 0}"
      >
        <div class="finquest-box__body">
          <v-open-rollup :src="require('../../assets/images/finquest/Domashny1/rollup.png')"></v-open-rollup>
        </div>
      </div>
    </el-col>
    <el-col
      class="finquest-box-col quest"
      :class="{ 'is-active': step === 2 }"
      :sm="{span:17, push: 3}"
      :lg="{span: 7, push: 0}"
      style="height: 100%"
    >
      <div
        class="finquest-box quest__block animationQueue3"
        :style="{opacity: questionStep >= 2 ? 1 : 0}"
        style="height: 98%"
      >
        <div class="finquest-box__body">
          <h2 class="finquest-box__title h2">Задание</h2>
          <div class="finquest-box__text">
            <template v-if="curWay == 0">
              Перед вами месячный бюджет семьи Ивановых:
              <ul>
                <li>Зарплата мамы: 30 000 руб. после вычета налогов;</li>
                <li>Зарплата папы: 50 000 руб. после вычета налогов;</li>
                <li>Сын-студент подрабатывает курьером, получая ежемесячно 12 000 руб. после вычета налогов;</li>
                <li>Обязательные траты в среднем составляют 55 000 руб. в месяц;</li>
                <li>Необязательные траты в среднем составляют 10 000 руб. в месяц.</li>
              </ul>Сын просит родителей купить ему для учёбы ноутбук стоимостью 60 000 руб. Посчитайте совокупный ежемесячный доход семьи и
              совокупные расходы семьи.
            </template>
            <template
              v-else-if="curWay == 1"
            >Перед вами диаграммы доходов и расходов и список недостающих элементов</template>
          </div>
          <!-- <h2 class="finquest-box__title h2">Вопрос</h2> -->
          <div class="finquest-box__text">
            <template v-if="curWay == 0">
              За сколько полных месяцев Ивановым удастся накопить на ноутбук при условии, если
              семья не откажется от необязательных трат? За сколько месяцев Ивановы смогут купить ноутбук, если откажутся от необязательных
              трат?
            </template>
            <template v-else-if="curWay == 1">
              Заполните недостающими элементами пропуски в диаграммах доходов и расходов семьи.
              <div class="q2__answers">
                <div
                  @drop="drop"
                  @dragover="allowDrop"
                  @dragstart="drag"
                  data-question="q1"
                  :class="{optionIsDisabled: optionIsDisabled(answer.label)}"
                  :draggable="!optionIsDisabled(answer.label)"
                  v-for="(answer, answerKey) in ways[1].q1Options"
                  :key="'q1' + answerKey"
                  class="q2_answer"
                >{{answer.label}}</div>
              </div>
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
              За сколько полных месяцев Ивановым удастся накопить на ноутбук при условии, если
              семья не откажется от необязательных трат? За сколько месяцев Ивановы смогут купить ноутбук, если откажутся от необязательных
              трат?
            </template>
            <template v-else-if="curWay == 1">
              Заполните недостающими элементами пропуски в диаграммах доходов и расходов семьи.
              <div class="q2__answers">
                <div
                  @drop="drop"
                  @dragover="allowDrop"
                  @dragstart="drag"
                  data-question="q1"
                  :class="{optionIsDisabled: optionIsDisabled(answer.label)}"
                  :draggable="!optionIsDisabled(answer.label)"
                  v-for="(answer, answerKey) in ways[1].q1Options"
                  :key="'q1' + answerKey"
                  class="q2_answer"
                >{{answer.label}}</div>
              </div>
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
              <template v-if="curWay == 0">Выберите правильные варианты ответов из списка:</template>
              <template
                v-else-if="curWay == 1"
              >Перетяните в пропуски недостающие элементы в диаграммы.</template>
            </h2>
            <div class="finquest-form">
              <template v-if="curWay == 0">
                <div class="finquest-form__select-group">
                  <span
                    class="finquest-form__select-group__title"
                  >Ирине лучше всего в качестве организационно-правовой формы выбрать:</span>
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
                  >Совокупные ежемесячные расходы семьи:</span>
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
                  >Ивановым удастся накопить на ноутбук:</span>
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
                  >За сколько месяцев Ивановы смогут купить ноутбук, если откажутся от необязательных трат?:</span>
                  <el-select v-model="ways[0].answers.q4" placeholder="Выберите ответ">
                    <el-option
                      v-for="question in ways[0].q4Options"
                      :key="question.value"
                      :label="question.label"
                      :value="question"
                    ></el-option>
                  </el-select>
                </div>
              </template>
              <template v-else-if="curWay == 1">
                <div style="display: flex; flex-wrap: wrap;">
                  <!-- <div> -->
                  <div class="q2 q2_1" style="width: 100%;">
                    <div class="diagramma">
                      <textarea
                        type="text"
                        readonly
                        class="diagramma__input"
                        :class="'diagramma__input' + n"
                        @drop="drop($event, ways[1].answers.q1[n-1].disabled)"
                        @dragover="allowDrop"
                        :data-index="n-1 "
                        data-question="q1"
                        v-model="ways[1].answers.q1[n-1].label"
                        v-for="n in 9"
                        :disabled="ways[1].answers.q1[n-1].disabled"
                        :key="'answer' + n"
                      ></textarea>
                      <img
                        src="../../assets/images/finquest/Domashny1/q2_1.png"
                        style="width: 380px; height: 380px"
                      />
                    </div>
                  </div>
                  <div class="q2 q2_2" style="width: 100%;">
                    <div class="diagramma">
                      <textarea
                        type="text"
                        readonly
                        class="diagramma__input"
                        :class="'diagramma__input' + n + '_2'"
                        @drop="drop($event, ways[1].answers.q2[n-1].disabled)"
                        @dragover="allowDrop"
                        :data-index="n-1 "
                        data-question="q2"
                        v-model="ways[1].answers.q2[n-1].label"
                        v-for="n in 12"
                        :disabled="ways[1].answers.q2[n-1].disabled"
                        :key="'answer' + n"
                      ></textarea>
                      <img
                        src="../../assets/images/finquest/Domashny1/q2_2.png"
                        alt
                        style="width: 380px; height: 380px"
                      />
                    </div>
                  </div>
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
            <div class="hint-box__title">
              <img src="../../assets/images/finquest/finquest-dog.png" alt="dog" />
              <h2 class="h2">Подсказка</h2>
            </div>
            <p>{{ getHintText }}</p>
            <button class="button--green button button--xs" ref="nextButton" @click="closeModal">
              Далее
              <!-- :style="questionStepStyle[questionStep]" -->
            </button>
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
      v-show="questionStep < 3"
    >
      Далее
      <!-- :style="questionStepStyle[questionStep]" -->
    </button>
  </el-row>
</template>

<script>
import hintBtn from "../main/hintBtn.vue";
export default {
  name: "modal-job-application",
  data() {
    return {
      hintIsGetting: false,
      step: 1,
      questionStep: 0,
      questionStepStyle: [
        { top: 0, left: 0 },
        { top: 0, left: 0 },
        { top: 0, left: 0 },
        { top: 0, left: 0 }
      ],
      ways: [
        {
          answers: {
            q1: "",
            q2: "",
            q3: "",
            q4: ""
          },
          q1Options: [
            {
              value: 1,
              label: "80 000 руб."
            },
            {
              value: 2,
              label: "82 000 руб."
            },
            {
              value: 3,
              label: "92 000 руб",
              isCorrect: true
            },
            {
              value: 4,
              label: "102 000 руб"
            },
            {
              value: 5,
              label: "105 747 руб"
            }
          ],
          q2Options: [
            {
              value: 1,
              label: "50 000 руб."
            },
            {
              value: 2,
              label: "55 000 руб."
            },
            {
              value: 3,
              label: "65 000 руб.",
              isCorrect: true
            },
            {
              value: 4,
              label: "69 000 руб."
            },
            {
              value: 5,
              label: "80 000 руб."
            }
          ],
          q3Options: [
            {
              value: 1,
              label: "За 2 полных месяца."
            },
            {
              value: 2,
              label: "За 3 полных месяца.",
              isCorrect: true
            },
            {
              value: 3,
              label: "За 5 полных месяцев."
            },
            {
              value: 4,
              label: "За 6 полных месяцев."
            },
            {
              value: 5,
              label:
                "Ивановым не нужно копить на ноутбук, они смогут купить его сразу."
            }
          ],
          q4Options: [
            {
              value: 1,
              label: "За 2 полных месяца.",
              isCorrect: true
            },
            {
              value: 2,
              label: "За 3 полных месяца."
            },
            {
              value: 3,
              label: "За 5 полных месяцев."
            },
            {
              value: 4,
              label: "За 6 полных месяцев."
            },
            {
              value: 5,
              label:
                "Ивановым не нужно копить на ноутбук, они смогут купить его сразу."
            }
          ],
          cost: {
            correct: 1,
            hint: 1,
            zeroCorrect: 1
          },
          hintText:
            "Если вам не удалось накопить до нужной суммы за прошедшие месяцы, долгожданную покупку придётся отложить.",
          correctAnswer: `<ol>
            <li>Совокупный ежемесячный доход семьи: 30 000+50 000+12 000 = 92 000 руб.  </li>
            <li>Совокупные ежемесячные расходы семьи: 55 000+10 000 = 65 000 руб.  </li>
            <li>Остаток на конец месяца: 92 000-65 000 = 27 000 руб. 60 000/27 000 = 2,2 месяца (За 3 полных месяца Ивановым удастся накопить на ноутбук).</li>
            <li>За 2 полных месяца Ивановы смогут купить ноутбук, если откажутся от необязательных трат.</li>
            `,
          showHint: false
        },
        {
          answers: {
            q1: [
              {
                label: "Заработная плата",
                disabled: true
              },
              {
                label: "",
                disabled: false
              },
              {
                label: "Доходы от приусадебного хозяйства",
                disabled: true
              },
              {
                label: "",
                disabled: false
              },
              {
                label: "",
                disabled: false
              },
              {
                label: "Доходы от ценных бумаг. Процентный доход.",
                disabled: true
              },
              {
                label: "Материнский капитал",
                disabled: true
              },
              {
                label: "Наследство",
                disabled: true
              },
              {
                label: "",
                disabled: false
              }
            ],
            q2: [
              {
                label: "Траты на досуг",
                disabled: true
              },
              {
                label: "Покупка электроники, техники, мебели",
                disabled: true
              },
              {
                label: "",
                disabled: false
              },
              {
                label: "",
                disabled: false
              },
              {
                label: "",
                disabled: false
              },
              {
                label: "",
                disabled: false
              },
              {
                label: "Оплата проезда",
                disabled: true
              },
              {
                label: "",
                disabled: false
              },
              {
                label: "Платежи по кредитам",
                disabled: true
              },
              {
                label: "Плата за коммунальные услуги и/или аренду жилья",
                disabled: true
              },
              {
                label: "",
                disabled: false
              },
              {
                label: "",
                disabled: false
              }
            ]
          },
          q1Options: [
            {
              value: 1,
              label: "Покупка одежды"
            },
            {
              value: 2,
              label: "Выигрыш в лотерею"
            },
            {
              value: 3,
              label: "Налоги",
              isCorrect: true
            },
            {
              value: 4,
              label: "Покупка еды"
            },
            {
              value: 5,
              label: "Оплата связи"
            },
            {
              value: 6,
              label: "Пенсия"
            },
            {
              value: 7,
              label: "Арендный доход"
            },
            {
              value: 8,
              label: "Траты на путешествия"
            },
            {
              value: 9,
              label: "Плата за детский сад"
            },
            {
              value: 10,
              label: "Премии"
            }
          ],
          q2Options: [
            {
              value: 1,
              label: "50 000 руб."
            },
            {
              value: 2,
              label: "55 000 руб."
            },
            {
              value: 3,
              label: "65 000 руб.",
              isCorrect: true
            },
            {
              value: 4,
              label: "69 000 руб."
            },
            {
              value: 5,
              label: "80 000 руб."
            }
          ],
          cost: {
            correct: 0.5,
            hint: 1,
            zeroCorrect: 1
          },
          hintText:
            "Подумайте, получение каких доходов можно ожидать с уверенностью, а какие являются приятной неожиданностью. Расходы являются обязательными, если они  необходимы для поддержания жизни или если, сэкономив на них, мы больше заплатим в будущем.",
          correctAnswer: ``,
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
  mounted: function() {
    console.log(this.$refs);
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
      //   this.openCongratulationModal("CongratulationEcologist");
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
</style>