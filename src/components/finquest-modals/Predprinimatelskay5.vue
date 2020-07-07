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
          <h2 class="finquest-box__title h2">Станция «В Налоговой инспекции»</h2>
          <p class="finquest-box__text">
            – Добрый день! Вы пришли на станцию «В Налоговой инспекции». На этой станции вам предстоит узнать о четырёх видах прямых
            налогов, которые взимаются с граждан Российской Федерации, и о двух видах косвенных налогов, которые мы платим, если покупаем
            товар или услугу, в стоимость которого заложен этот налог. При этом знать налоговую ставку по прямым налогам нам важнее, чем
            по косвенным, потому что часто мы должны их платить самостоятельно, а платёж по косвенным налогам уже автоматически добавлен к
            стоимости наших покупок. Именно за счёт налогов финансируется бо́льшая часть благ, предоставляемых государством: услуги
            здравоохранения, наука, культура, искусство, деятельность федеральных, региональных и местных органов власти, Вооружённые силы
            России.
          </p>
          <p class="finquest-box__text">
            Изучите информацию на инфографике, там отражены налоговые ставки, предметы налогообложения и названия налога, а также описаны
            основные различия прямых и косвенных налогов, выполните задание.
          </p>
        </div>
      </div>
      <div
        class="finquest-box quest__block animationQueue2"
        :style="{opacity: questionStep >= 1 ? 1 : 0}"
      >
        <div class="finquest-box__body">
          <v-open-rollup
            :src="require('../../assets/images/finquest/Predprinimatelskay5/rollup.png')"
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
            <template
              v-if="curWay == 0"
            >Перед вами алгоритм запуска собственного бизнеса и список недостающих элементов.</template>
            <template
              v-else-if="curWay == 1"
            >Перед вами алгоритм запуска собственного бизнеса и список недостающих элементов.</template>
          </div>
          <div class="finquest-box__text">
            <template v-if="curWay == 0">
              Определите последовательность действий в алгоритме запуска собственного бизнеса, заполнив пропущенные шаги.
              <!-- <div style="displey: flex; flex-wrap: wrap">
                <div
                  v-for="(option, optionKey) in ways[0].q1Options"
                  :key="'option'+optionKey"
                  @drop="drop"
                  @dragover="allowDrop"
                  @dragstart="drag"
                  data-column="3"
                  data-index="-1"
                  class="answer q1"
                  :class="{optionIsDisabled: optionIsDisabled(option)}"
                  :draggable="!optionIsDisabled(option)"
                >{{option}}</div>
              </div>-->
            </template>
            <template v-else-if="curWay == 1">
              Определите последовательность действий в алгоритме запуска собственного бизнеса, заполнив пропущенные шаги.
              <!-- <div style="displey: flex; flex-wrap: wrap">
                <div
                  @drop="drop"
                  @dragover="allowDrop"
                  @dragstart="drag"
                  data-column="3"
                  data-index="-1"
                  class="answer q1"
                  :class="{optionIsDisabled: optionIsDisabled(option)}"
                  :draggable="!optionIsDisabled(option)"
                  v-for="(option, optionKey) in ways[1].q1Options"
                  :key="'option'+optionKey"
                >{{option}}</div>
              </div>-->
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
      Определите последовательность действий в алгоритме запуска собственного бизнеса, заполнив пропущенные шаги.-->
      <!-- <div style="displey: flex; flex-wrap: wrap">
                <div
                  v-for="(option, optionKey) in ways[0].q1Options"
                  :key="'option'+optionKey"
                  @drop="drop"
                  @dragover="allowDrop"
                  @dragstart="drag"
                  data-column="3"
                  data-index="-1"
                  class="answer q1"
                  :class="{optionIsDisabled: optionIsDisabled(option)}"
                  :draggable="!optionIsDisabled(option)"
                >{{option}}</div>
      </div>-->
      <!--</template>
            <template v-else-if="curWay == 1">
      Определите последовательность действий в алгоритме запуска собственного бизнеса, заполнив пропущенные шаги.-->
      <!-- <div style="displey: flex; flex-wrap: wrap">
                <div
                  @drop="drop"
                  @dragover="allowDrop"
                  @dragstart="drag"
                  data-column="3"
                  data-index="-1"
                  class="answer q1"
                  :class="{optionIsDisabled: optionIsDisabled(option)}"
                  :draggable="!optionIsDisabled(option)"
                  v-for="(option, optionKey) in ways[1].q1Options"
                  :key="'option'+optionKey"
                >{{option}}</div>
      </div>-->
      <!--</template>
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
              <template v-if="curWay == 0">
                <!-- Перетащите недостающие элементы на соответствующие места в алгоритме действий по запуску бизнеса. -->
                Выберите недостающие элементы в алгоритме действий по запуску бизнеса.
              </template>
              <template v-else-if="curWay == 1">
                Выберите недостающие элементы в алгоритме действий по запуску бизнеса.
                <!-- Перетащите недостающие элементы на соответствующие места в алгоритме действий по запуску бизнеса. -->
              </template>
            </h2>
            <div class="finquest-form">
              <template v-if="curWay == 0">
                <!-- <el-table :data="ways[0].q1" border style="width: 100%">
                  <el-table-column prop="field1" label="Пункты:">
                    <template slot-scope="scope">
                      <div
                        @drop="drop"
                        @dragover="allowDrop"
                        :data-index="scope.row.index"
                        v-if="!scope.row.disabled"
                        style="height:20px"
                      >{{ scope.row.field1 }}</div>
                      <span v-else>{{ scope.row.field1 }}</span>
                    </template>
                  </el-table-column>
                </el-table>-->
                <el-table :data="ways[0].q1" border style="width: 100%">
                  <el-table-column prop="field1" label="Пункты:">
                    <template slot-scope="scope">
                      <template v-if="scope.row.isSelect">
                        <el-select
                          v-model="ways[0].q1answers[scope.row.answer]"
                          placeholder="Выберите ответ"
                        >
                          <el-option
                            v-for="question in ways[0].q1Options"
                            :key="question.value"
                            :label="question.label"
                            :value="question"
                          ></el-option>
                        </el-select>
                      </template>
                      <span v-else>{{scope.row.field1}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
              <template v-else-if="curWay == 1">
                <el-table :data="ways[1].q1" border style="width: 100%">
                  <el-table-column prop="field1" label="Пункты:">
                    <template slot-scope="scope">
                      <div
                        @drop="drop"
                        @dragover="allowDrop"
                        :data-index="scope.row.index"
                        v-if="!scope.row.disabled"
                        style="height:20px"
                      >{{ scope.row.field1 }}</div>
                      <span v-else>{{ scope.row.field1 }}</span>
                    </template>
                  </el-table-column>
                </el-table>
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
import draggable from "vuedraggable";
import hintBtn from "../main/hintBtn.vue";
export default {
  name: "modal-job-application",
  components: {
    draggable,
    hintBtn
  },
  data() {
    return {
      step: 1,
      questionStep: 0,
      ways: [
        {
          answer: [],
          q1: [
            {
              field1: "Придумать идею для бизнеса. ",
              index: 0,
              disabled: true
            },
            {
              field1: "",
              index: 1,
              isSelect: true,
              answer: 0
            },
            {
              field1: "Изучить цены конкурентов. ",
              index: 2,
              disabled: true
            },
            {
              field1: "",
              index: 3,
              isSelect: true,
              answer: 1
            },
            {
              field1: "Найти денежные средства для открытия компании. ",
              index: 4,
              disabled: true
            },
            {
              field1: "",
              index: 5,
              isSelect: true,
              answer: 2
            },
            {
              field1: "Протестировать идею на первой пробной партии. ",
              index: 6,
              disabled: true
            },
            {
              field1: "",
              index: 7,
              isSelect: true,
              answer: 3
            },
            {
              field1: "",
              index: 8,
              isSelect: true,
              answer: 4
            },
            {
              field1: "Запустить бизнес! ",
              index: 9,
              disabled: true
            }
          ],
          q1answers: ["", "", "", "", ""],
          q1CorrectAnswers: [4, 3, 2, 5, 1],
          q1Options: [
            {
              value: 1,
              label: "Найти инвесторов/привлечь заёмные средства."
            },
            {
              value: 2,
              label: "Выбрать организационно-правовую форму."
            },
            {
              value: 3,
              label: "Написать бизнес-план."
            },
            {
              value: 4,
              label:
                "Определить группу людей, которые будут заинтересованы покупать продукт компании."
            },
            {
              value: 5,
              label:
                "Проанализировать, сколько потратили и получили от продажи первой партии."
            }
          ],
          cost: {
            correct: 1,
            hint: 1,
            zeroCorrect: 1
          },
          hintText:
            "От появления идеи бизнеса до её реализации нужно совершить ещё 8 конкретных шагов, причём сделать это в определённой последовательности.",
          correctAnswer: `
                <table class="el-table">
            <tbody>
              <tr>
                <td>Придумать идею для бизнеса.</td>
              </tr>
              <tr>
                <td>Определить группу людей, которые будут заинтересованы покупать продукт компании.</td>
              </tr>
              <tr>
                <td>Изучить цены конкурентов.</td>
              </tr>
              <tr>
                <td>Написать бизнес-план.</td>
              </tr>
              <tr>
                <td>Найти денежные средства для открытия компании.</td>
              </tr>
              <tr>
                <td>Выбрать организационно-правовую форму.</td>
              </tr>
              <tr>
                <td>Протестировать идею на первой пробной партии.</td>
              </tr>
              <tr>
                <td>Проанализировать, сколько потратили и получили от продажи первой партии.</td>
              </tr>
              <tr>
                <td>Найти инвесторов/привлечь заёмные средства.</td>
              </tr>
              <tr>
                <td>Запустить бизнес!</td>
              </tr>
            </tbody>
          </table>
            
            `,
          showHint: false
        },
        // {
        //   answer: [],
        //   q1: [
        //     {
        //       field1: "Придумать идею для бизнеса. ",
        //       index: 0,
        //       disabled: true
        //     },
        //     {
        //       field1: "",
        //       index: 1,
        //       isSelect: true
        //     },
        //     {
        //       field1: "Изучить цены конкурентов. ",
        //       index: 2,
        //       disabled: true
        //     },
        //     {
        //       field1: "",
        //       index: 3,
        //       isSelect: true
        //     },
        //     {
        //       field1: "Найти денежные средства для открытия компании. ",
        //       index: 4,
        //       disabled: true
        //     },
        //     {
        //       field1: "",
        //       index: 5,
        //       isSelect: true
        //     },
        //     {
        //       field1: "Протестировать идею на первой пробной партии. ",
        //       index: 6,
        //       disabled: true
        //     },
        //     {
        //       field1: "",
        //       index: 7,
        //       isSelect: true
        //     },
        //     {
        //       field1: "",
        //       index: 8,
        //       isSelect: true
        //     },
        //     {
        //       field1: "Запустить бизнес! ",
        //       index: 9,
        //       disabled: true
        //     }
        //   ],
        //   q1Options: [
        //     "Найти инвесторов/привлечь заёмные средства.",
        //     "Выбрать организационно-правовую форму.",
        //     "Написать бизнес-план.",
        //     "Определить группу людей, которые будут заинтересованы покупать продукт компании.",
        //     "Проанализировать, сколько потратили и получили от продажи первой партии."
        //   ],
        //   cost: {
        //     correct: 1,
        //     hint: 1,
        //     zeroCorrect: 1
        //   },
        //   hintText:
        //     "От появления идеи бизнеса до её реализации нужно совершить ещё 8 конкретных шагов, причём сделать это в определённой последовательности.",
        //   correctAnswer: `
        //         <table class="el-table">
        //     <tbody>
        //       <tr>
        //         <td>Придумать идею для бизнеса.</td>
        //       </tr>
        //       <tr>
        //         <td>Определить группу людей, которые будут заинтересованы покупать продукт компании.</td>
        //       </tr>
        //       <tr>
        //         <td>Изучить цены конкурентов.</td>
        //       </tr>
        //       <tr>
        //         <td>Написать бизнес-план.</td>
        //       </tr>
        //       <tr>
        //         <td>Найти денежные средства для открытия компании.</td>
        //       </tr>
        //       <tr>
        //         <td>Выбрать организационно-правовую форму.</td>
        //       </tr>
        //       <tr>
        //         <td>Протестировать идею на первой пробной партии.</td>
        //       </tr>
        //       <tr>
        //         <td>Проанализировать, сколько потратили и получили от продажи первой партии.</td>
        //       </tr>
        //       <tr>
        //         <td>Найти инвесторов/привлечь заёмные средства.</td>
        //       </tr>
        //       <tr>
        //         <td>Запустить бизнес!</td>
        //       </tr>
        //     </tbody>
        //   </table>

        //     `,
        //   showHint: false
        // },
        {
          answer: [],
          q1: [
            {
              field1: "Придумать идею для бизнеса. ",
              index: 0,
              disabled: true
            },
            {
              field1:
                "Определить группу людей, которые будут заинтересованы покупать продукт компании. ",
              index: 1,
              disabled: true
            },
            {
              field1: "",
              index: 2
            },
            {
              field1: "Написать бизнес-план. ",
              index: 3,
              disabled: true
            },
            {
              field1: "",
              index: 4
            },
            {
              field1: "Выбрать организационно-правовую форму.",
              index: 5,
              disabled: true
            },
            {
              field1: "",
              index: 6
            },
            {
              field1: "",
              index: 7
            },
            {
              field1: "Найти инвесторов/привлечь заёмные средства. ",
              index: 8,
              disabled: true
            },
            {
              field1: "Запустить бизнес!",
              index: 9,
              disabled: true
            }
          ],
          q1Options: [
            "Протестировать идею на первой пробной партии.",
            "Найти денежные средства для открытия компании.",
            "Изучить цены конкурентов.",
            "Проанализировать, сколько потратили и получили от продажи первой партии."
          ],
          cost: {
            correct: 1,
            hint: 1,
            zeroCorrect: 1
          },
          hintText:
            "От появления идеи бизнеса до её реализации нужно совершить ещё 8 конкретных шагов, причём сделать это в определённой последовательности. ",
          correctAnswer: `
                <table class="el-table">
            <tbody>
              <tr>
                <td>Придумать идею для бизнеса.</td>
              </tr>
              <tr>
                <td>Определить группу людей, которые будут заинтересованы покупать продукт компании.</td>
              </tr>
              <tr>
                <td>Изучить цены конкурентов.</td>
              </tr>
              <tr>
                <td>Написать бизнес-план.</td>
              </tr>
              <tr>
                <td>Найти денежные средства для открытия компании.</td>
              </tr>
              <tr>
                <td>Выбрать организационно-правовую форму.</td>
              </tr>
              <tr>
                <td>Протестировать идею на первой пробной партии.</td>
              </tr>
              <tr>
                <td>Проанализировать, сколько потратили и получили от продажи первой партии.</td>
              </tr>
              <tr>
                <td>Найти инвесторов/привлечь заёмные средства.</td>
              </tr>
              <tr>
                <td>Запустить бизнес!</td>
              </tr>
            </tbody>
          </table>
            
            `,
          showHint: false
        }
      ],
      selected: {},
      isDrag: false
    };
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
      let answers, answersCount, correctAnswers, correctCost, newPoints;
      //   if (this.curWay == 0) {
      //   let correct = [
      //     {
      //       field1: "Придумать идею для бизнеса."
      //     },
      //     {
      //       field1:
      //         "Определить группу людей, которые будут заинтересованы покупать продукт компании."
      //     },
      //     {
      //       field1: "Изучить цены конкурентов."
      //     },
      //     {
      //       field1: "Написать бизнес-план."
      //     },
      //     {
      //       field1: "Найти денежные средства для открытия компании."
      //     },
      //     {
      //       field1: "Выбрать организационно-правовую форму."
      //     },
      //     {
      //       field1: "Протестировать идею на первой пробной партии."
      //     },
      //     {
      //       field1:
      //         "Проанализировать, сколько потратили и получили от продажи первой партии."
      //     },
      //     {
      //       field1: "Найти инвесторов/привлечь заёмные средства."
      //     },
      //     {
      //       field1: "Запустить бизнес!"
      //     }
      //   ];

      answersCount = 5;
      //   correctAnswers = this.ways[this.curWay].q1.filter(item => {
      //     return item.field1 == correct[item.index].field1;
      //   }).length;
      correctAnswers = this.ways[this.curWay].q1answers.filter(
        (item, itemKey) =>
          item.value == this.ways[this.curWay].q1CorrectAnswers[itemKey]
      ).length;
      correctCost = this.ways[this.curWay].cost.correct;
      this.closeFinquestModal();
      if (correctAnswers * correctCost > 0) {
        newPoints = correctAnswers * correctCost;
      } else {
        newPoints = this.ways[this.curWay].cost.zeroCorrect;
      }
      //   }
      this.$store.dispatch("initChangePoint", false);

      this.$store.commit("setLastQuestion", {
        cost: newPoints,
        allCount: answersCount,
        correctCount: correctAnswers,
        correctAnswer: this.ways[this.curWay].correctAnswer,
        hint: this.ways[this.curWay].hintText
      });
      this.$store.commit("addPointsCount", newPoints);
      this.openCongratulationModal("FinquestQuestionResult");

      this.$store.commit("setPointComplete", { point: 6, block: 0 });
    },
    getCellHeight(key) {
      let element = document.getElementsByClassName(key)[0];
      if (element && element.offsetHeight > 0) {
        return element.offsetHeight;
      } else {
        // console.log(key);
      }
    },
    q0OnStart() {
      //   console.log(arguments);
    },
    removeFieldFromQ0_1(event) {
      let listWithPosition = this.ways[0].q0_1Options.map((item, itemKey) => {
        return { key: item.key, label: item.label, position: itemKey };
      });
      let emptyElements = listWithPosition.filter(item => {
        return item.label == " ";
      });
      if (emptyElements.length > 0) {
        let nextElement = this.ways[0].q0_1Options[event.newDraggableIndex + 1];
        if (nextElement) {
          let removedElement, newKey, removedPosition;
          let isDelete = false;
          if (nextElement.label == " ") {
            // удаляю элемнт под новым
            removedElement = listWithPosition.filter(item => {
              return (
                item.label == " " &&
                item.position == event.newDraggableIndex + 1
              );
            })[0];
            removedPosition = event.newDraggableIndex + 1;
            isDelete = true;
          } else {
            // удаляю ближайший пустой
            isDelete = true;
            removedElement = emptyElements[0];
            removedPosition = removedElement.position;
          }

          if (isDelete) {
            newKey = removedElement.key;
            this.ways[0].q0_1Options.splice(removedPosition, 1);
            this.ways[0].q0_1Options[event.newDraggableIndex] = {
              key: newKey,
              label: event.item.innerText,
              answer: this.ways[0].q0_1Options[event.newDraggableIndex].answer
            };
          }
        }
      } else {
        //добавили элементов больше, чем можно
        this.ways[0].q0_1Options.splice(event.newDraggableIndex, 1);
      }
    },
    removeFieldFromQ0_2(event) {
      let listWithPosition = this.ways[0].q0_2Options.map((item, itemKey) => {
        return { key: item.key, label: item.label, position: itemKey };
      });
      let emptyElements = listWithPosition.filter(item => {
        return item.label == " ";
      });
      if (emptyElements.length > 0) {
        let nextElement = this.ways[0].q0_2Options[event.newDraggableIndex + 1];
        if (nextElement) {
          let removedElement, newKey, removedPosition;
          let isDelete = false;
          if (nextElement.label == " ") {
            // удаляю элемнт под новым
            removedElement = listWithPosition.filter(item => {
              return (
                item.label == " " &&
                item.position == event.newDraggableIndex + 1
              );
            })[0];
            removedPosition = event.newDraggableIndex + 1;
            isDelete = true;
          } else {
            // удаляю ближайший пустой
            isDelete = true;
            removedElement = emptyElements[0];
            removedPosition = removedElement.position;
          }

          if (isDelete) {
            newKey = removedElement.key;
            this.ways[0].q0_2Options.splice(removedPosition, 1);
            this.ways[0].q0_2Options[event.newDraggableIndex] = {
              key: newKey,
              label: event.item.innerText,
              answer: this.ways[0].q0_2Options[event.newDraggableIndex].answer
            };
          }
        }
      } else {
        //добавили элементов больше, чем можно
        this.ways[0].q0_2Options.splice(event.newDraggableIndex, 1);
      }
    },
    clearElement(elementPosition) {
      // console.log(this.ways[0].q0_1Options[elementPosition].label);
      // console.log(document.getElementsByClassName(this.ways[0].q0_1Options[elementPosition].key));
      let tempQ0_1Options = this.ways[0].q0_1Options;
      tempQ0_1Options[elementPosition].label = " ";
      // this.ways[0].q0_1Options = tempQ0_1Options;
      this.$set(this.ways[0].q0_1Options[elementPosition], "label", " ");
      //   console.log(this.ways[0].q0_1Options[elementPosition].label);
    },
    drag(ev) {
      ev.dataTransfer.setData("textFrom", ev.target.innerText);
      ev.dataTransfer.setData("column", ev.target.dataset.column);
      ev.dataTransfer.setData("indexFrom", ev.target.dataset.index);
    },
    allowDrop(ev) {
      ev.preventDefault();
    },
    drop(ev) {
      ev.preventDefault();
      let textFrom = ev.dataTransfer.getData("textFrom");
      let index = ev.currentTarget.dataset.index;
      this.$set(this.ways[this.curWay].q1[index], "field1", textFrom);
    },
    optionIsDisabled(option) {
      return this.ways[this.curWay].q1
        .map(item => item.field1)
        .includes(option);
    }
  },
  computed: {
    showHintBtn() {
      return this.$store.getters.getPointStatus;
    },
    allFieldsFilled() {
      return (
        // this.ways[this.curWay].q1.filter(item => item.field1 == "").length == 0
        this.ways[this.curWay].q1answers.filter(item => item == "").length == 0
      );
    },
    getHintText() {
      return this.ways[this.curWay].hintText;
    },
    getShowHint() {
      return this.$store.getters.getShowHint;
    },
    getSumCost() {
      let sum;
      //   if (this.curWay == 0) {
      // sum = this.ways[0].q0Options.length * this.ways[0].cost.correct;
      //   }
      sum = 5;
      return sum;
    },
    dragOptions() {
      return {
        animation: 200,
        group: "q1",
        disabled: false,
        ghostClass: "ghost"
      };
    },
    curWay() {
      return this.$store.getters.getCurWay;
    }
    // getWays0q0_2Options() {
    //     return this.ways[0].q0_2Options;
    // }
  },
  watch: {
    getShowHint(newValue, oldValue) {
      let hintCost;
      hintCost = this.ways[this.curWay].cost.hint;

      if (newValue == true) {
        this.$store.commit("minusPointsCount", hintCost);
      }
    },
    answer() {
      console.log(arguments);
    }
    // getWays0q0_2Options(newValue) {
    //     console.log(newValue);
    // }
  }
};
</script>

<style>
.finquest-form {
  display: flex;
  flex-wrap: wrap;
}

.answer {
  width: 33% !important;
}

.answer.q1 {
  width: auto !important;
}

.taxType,
.taxRate {
  padding: 0;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.125);
}
.taxType span,
.taxRate span {
  display: flex;
  flex-wrap: wrap;
}
.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.optionIsDisabled {
  opacity: 0.5;
}
</style>
