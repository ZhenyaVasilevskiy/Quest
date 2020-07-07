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
          <v-open-rollup :src="require('../../assets/images/finquest/Controly12/rollup.png')"></v-open-rollup>
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
            >Нестор Петрович запутался в своих налогах и налоговых ставках, по которым они рассчитываются.</template>
            <template
              v-else-if="curWay == 1"
            >Перед вами перечни предметов налогообложения, названий и видов налогов.</template>
          </div>
          <div class="finquest-box__text">
            <template v-if="curWay == 0">
              Помогите Нестору Петровичу
              разобраться, в какой ситуации какой налог и по какой ставке нужно платить, переместив карточки в таблицу в правильной
              последовательности.
              <!-- <div class="taxTypeContainer">
                <h3>Вид налога</h3>
                <draggable
                  v-model="ways[0].q1Options"
                  :group="{ name: 'q1', pull: 'clone', put: false }"
                  v-bind="dragOptions"
                  class="list-group taxType"
                  @start="isDrag = true"
                  @end="isDrag = false"
                >
                  <transition-group type="transition" :name="!isDrag ? 'flip-list' : null">
                    <div
                      v-for="element in ways[0].q1Options"
                      :key="element.key"
                      class="list-group-item"
                    >{{ element.label }}</div>
                  </transition-group>
                </draggable>
              </div>
              <div class="taxRateContainer">
                <h3>Налоговая ставка</h3>
                <draggable
                  v-model="ways[0].q2Options"
                  :group="{ name: 'q2', pull: 'clone', put: false }"
                  v-bind="dragOptions"
                  class="list-group taxRate"
                  @start="isDrag = true"
                  @end="isDrag = false"
                >
                  <transition-group type="transition" :name="!isDrag ? 'flip-list' : null">
                    <div
                      v-for="element in ways[0].q2Options"
                      :key="element.key"
                      class="list-group-item"
                    >{{ element.label }}</div>
                  </transition-group>
                </draggable>
              </div>-->
            </template>
            <template v-else-if="curWay == 1">
              Определите для каждого налога предмет налогообложения и вид.
              <br />Вид налога:
              <br />
              <div
                @drop="drop"
                @dragover="allowDrop"
                @dragstart="drag"
                data-column="3"
                data-index="-1"
                class="answer"
                draggable
              >Прямой налог</div>
              <div
                @drop="drop"
                @dragover="allowDrop"
                @dragstart="drag"
                data-column="3"
                data-index="-1"
                class="answer"
                draggable
              >Косвенный налог</div>
            </template>
          </div>
        </div>
      </div>
      <div
        class="finquest-box quest__block animationQueue4"
        :style="{opacity: questionStep >= 3 ? 1 : 0}"
      >
        <!-- <div class="finquest-box__body">
          <h2 class="finquest-box__title h2">Вопрос</h2>
          <div class="finquest-box__text">
            <template v-if="curWay == 0">
              Помогите Нестору Петровичу
              разобраться, в какой ситуации какой налог и по какой ставке нужно платить, переместив карточки в таблицу в правильной
        последовательности.-->
        <!-- <div class="taxTypeContainer">
                <h3>Вид налога</h3>
                <draggable
                  v-model="ways[0].q1Options"
                  :group="{ name: 'q1', pull: 'clone', put: false }"
                  v-bind="dragOptions"
                  class="list-group taxType"
                  @start="isDrag = true"
                  @end="isDrag = false"
                >
                  <transition-group type="transition" :name="!isDrag ? 'flip-list' : null">
                    <div
                      v-for="element in ways[0].q1Options"
                      :key="element.key"
                      class="list-group-item"
                    >{{ element.label }}</div>
                  </transition-group>
                </draggable>
              </div>
              <div class="taxRateContainer">
                <h3>Налоговая ставка</h3>
                <draggable
                  v-model="ways[0].q2Options"
                  :group="{ name: 'q2', pull: 'clone', put: false }"
                  v-bind="dragOptions"
                  class="list-group taxRate"
                  @start="isDrag = true"
                  @end="isDrag = false"
                >
                  <transition-group type="transition" :name="!isDrag ? 'flip-list' : null">
                    <div
                      v-for="element in ways[0].q2Options"
                      :key="element.key"
                      class="list-group-item"
                    >{{ element.label }}</div>
                  </transition-group>
                </draggable>
        </div>-->
        <!--</template>
            <template v-else-if="curWay == 1">
              Определите для каждого налога предмет налогообложения и вид.
              <br />Вид налога:
              <br />
              <div
                @drop="drop"
                @dragover="allowDrop"
                @dragstart="drag"
                data-column="3"
                data-index="-1"
                class="answer"
                draggable
              >Прямой налог</div>
              <div
                @drop="drop"
                @dragover="allowDrop"
                @dragstart="drag"
                data-column="3"
                data-index="-1"
                class="answer"
                draggable
              >Косвенный налог</div>
            </template>
          </div>
        </div>-->
      </div>
    </el-col>
    <!-- <el-col :sm="{span:17, push: 3}" :lg="{span: 14, push: 0}" style="margin-left: -79%"> -->
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
              <template v-if="curWay == 0">Перетащите надписи в нужные места в таблице:</template>
              <template v-else-if="curWay == 1">Сопоставте и перетащите элементы этих трёх перечней</template>
            </h2>
            <div style="overflow: auto">
              <template v-if="curWay == 0">
                <!-- <div class="answers" style="width: 700px"> -->
                <div class="answers finquest-box__body--rotate">
                  <!-- <div class="list-group answerq1">
                    <div
                      v-for="element in ways[0].q0Options"
                      class="list-group-item"
                      :class="element.key"
                      :key="element.key"
                    >{{ element.label }}</div>
                  </div>-->
                  <el-table :data="ways[0].q1" border>
                    <el-table-column prop="field1" label="Ситуация" width="230"></el-table-column>
                    <el-table-column prop="field2" label="Вид налога" width="160">
                      <template slot-scope="scope">
                        <el-select
                          v-model="ways[0].answers[scope.row.answer]"
                          placeholder="Выберите ответ"
                        >
                          <el-option
                            v-for="question in ways[0].q1_field2Options"
                            :key="question.value"
                            :label="question.label"
                            :value="question"
                          ></el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column prop="field3" label="Налоговая ставка" width="160">
                      <template slot-scope="scope">
                        <el-select
                          v-model="ways[0].answers[scope.row.answer2]"
                          placeholder="Выберите ответ"
                        >
                          <el-option
                            v-for="question in ways[0].q1_field3Options"
                            :key="question.value"
                            :label="question.label"
                            :value="question"
                          ></el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                  </el-table>
                  <!-- <draggable
                    v-model="ways[0].q0_1Options"
                    group="q1"
                    v-bind="dragOptions"
                    class="list-group answerq1"
                    @start="isDrag = true"
                    @end="isDrag = false"
                    @add="removeFieldFromQ0_1"
                  >
                    <transition-group type="transition" :name="!isDrag ? 'flip-list' : null">
                      <div
                        v-for="(element, elementKey) in ways[0].q0_1Options"
                        :key="element.key"
                        class="list-group-item"
                        :style="{ height: getCellHeight('q0_' + elementKey) + 'px' }"
                      >
                        {{ element.label }}
                      </div>
                    </transition-group>
                  </draggable>-->
                  <!-- <draggable
                    v-model="ways[0].q0_2Options"
                    group="q2"
                    v-bind="dragOptions"
                    class="list-group answerq1"
                    @start="isDrag = true"
                    @end="isDrag = false"
                    @add="removeFieldFromQ0_2"
                  >
                    <transition-group type="transition" :name="!isDrag ? 'flip-list' : null">
                      <div
                        v-for="(element, elementKey) in ways[0].q0_2Options"
                        :key="element.key"
                        :style="{ height: getCellHeight('q0_' + elementKey) + 'px' }"
                        class="list-group-item"
                      >{{ element.label }}</div>
                    </transition-group>
                  </draggable>-->
                </div>
              </template>
              <template v-else-if="curWay == 1">
                <el-table :data="ways[1].q1" border style="width: 100%">
                  <el-table-column prop="field1" label="Предмет налогообложения">
                    <template slot-scope="scope">
                      <div
                        @drop="drop"
                        @dragover="allowDrop"
                        @dragstart="drag"
                        data-column="1"
                        draggable
                        :data-index="scope.row.index"
                      >{{ scope.row.field1 }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="field2" label="Название налога">
                    <template slot-scope="scope">
                      <div
                        @drop="drop"
                        @dragover="allowDrop"
                        @dragstart="drag"
                        data-column="2"
                        draggable
                        :data-index="scope.row.index"
                      >{{ scope.row.field2 }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="field3" label="Вид налога">
                    <template slot-scope="scope">
                      <div
                        @drop="drop"
                        @dragover="allowDrop"
                        @dragstart="drag"
                        data-column="3"
                        draggable
                        style="min-height: 60px;height: 100%;width: 100%;padding: 0;margin: 0 -10px -12px -10px;"
                        :data-index="scope.row.index"
                      >{{ scope.row.field3 }}</div>
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
          q1: [
            {
              field1:
                "Нестор Петрович купил билет государственной лотереи «100 к 20» и выиграл приз 5 000 рублей.",
              field2: "",
              field3: "",
              answer: "q1",
              answer2: "q2"
            },
            {
              field1:
                "Нестор Петрович получил в течение года от арендатора квартиры, которая досталась ему в наследство от бабушки, 240 000 рублей.",
              field2: "",
              field3: "",
              answer: "q3",
              answer2: "q4"
            },
            {
              field1:
                "Нестор Петрович является собственником квартиры, которая досталась ему в наследство от бабушки.",
              field2: "",
              field3: "",
              answer: "q5",
              answer2: "q6"
            },
            {
              field1: "Нестор Петрович является владельцем земельного участка.",
              field2: "",
              field3: "",
              answer: "q7",
              answer2: "q8"
            },
            {
              field1:
                "Нестор Петрович полгода назад купил автомобиль LADA Vesta.",
              field2: "",
              field3: "",
              answer: "q9",
              answer2: "q10"
            },
            {
              field1:
                "Нестор Петрович участвовал в беспроигрышной рекламной лотерее в торговом центре и выиграл планшет стоимостью 40 000 рублей.",
              field2: "",
              field3: "",
              answer: "q11",
              answer2: "q12"
            },
            {
              field1:
                "Зарплата Нестора Петровича на мебельной фабрике составляет 75 000 рублей в месяц.",
              field2: "",
              field3: "",
              answer: "q13",
              answer2: "q14"
            }
          ],
          q1_field2Options: [
            {
              value: 1,
              label: "Земельный налог"
            },
            {
              value: 2,
              label: "Имущественный налог"
            },
            {
              value: 3,
              label: "Налог на доходы физических лиц "
            },
            {
              value: 4,
              label: "Транспортный налог"
            }
          ],
          q1_field3Options: [
            {
              value: 1,
              label:
                "Размер налога зависит от кадастровой стоимости и ставки налога в районе, где находится земля."
            },
            {
              value: 2,
              label: "35%"
            },
            {
              value: 3,
              label:
                "Размер налога зависит от мощности автомобиля и ставки налога в регионе."
            },
            {
              value: 4,
              label: "13%"
            },
            {
              value: 5,
              label:
                "Размер налога зависит от кадастровой стоимости и ставки налога в районе, где находится имущество. "
            }
          ],
          answers: {
            q1: "",
            q2: "",
            q3: "",
            q4: "",
            q5: "",
            q6: "",
            q7: "",
            q8: "",
            q9: "",
            q10: "",
            q11: "",
            q12: "",
            q13: "",
            q14: ""
          },
          q0Options: [
            {
              label:
                "Нестор Петрович купил билет государственной лотереи «100 к 20» и выиграл приз 5 000 рублей.",
              key: "q0_0"
            },
            {
              label:
                "Нестор Петрович получил в течение года от арендатора квартиры, которая досталась ему в наследство от бабушки, 240 000 рублей.",
              key: "q0_1"
            },
            {
              label:
                "Нестор Петрович является собственником квартиры, которая досталась ему в наследство от бабушки.",
              key: "q0_2"
            },
            {
              label: "Нестор Петрович является владельцем земельного участка.",
              key: "q0_3"
            },
            {
              label:
                "Нестор Петрович полгода назад купил автомобиль LADA Vesta.",
              key: "q0_4"
            },
            {
              label:
                "Нестор Петрович участвовал в беспроигрышной рекламной лотерее в торговом центре и выиграл планшет стоимостью 40 000 рублей.",
              key: "q0_5"
            },
            {
              label:
                "Зарплата Нестора Петровича на мебельной фабрике составляет 75 000 рублей в месяц.",
              key: "q0_6"
            }
          ],
          q0_1Options: [
            {
              label: " ",
              key: "q0_1_0"
            },
            {
              label: " ",
              key: "q0_1_1"
            },
            {
              label: " ",
              key: "q0_1_2"
            },
            {
              label: " ",
              key: "q0_1_3"
            },
            {
              label: " ",
              key: "q0_1_4"
            },
            {
              label: " ",
              key: "q0_1_5"
            },
            {
              label: " ",
              key: "q0_1_6"
            }
          ],
          q0_2Options: [
            {
              label: " ",
              key: "q0_2_0"
            },
            {
              label: " ",
              key: "q0_2_1"
            },
            {
              label: " ",
              key: "q0_2_2"
            },
            {
              label: " ",
              key: "q0_2_3"
            },
            {
              label: " ",
              key: "q0_2_4"
            },
            {
              label: " ",
              key: "q0_2_5"
            },
            {
              label: " ",
              key: "q0_2_6"
            }
          ],
          q1Options: [
            {
              label: "Земельный налог",
              key: "q1_0",
              answer: 1
            },
            {
              label: "Имущественный налог",
              key: "q1_1",
              answer: 2
            },
            {
              label: "Налог на доходы физических лиц",
              key: "q1_2",
              answer: 3
            },
            {
              label: "Транспортный налог",
              key: "q1_3",
              answer: 3
            }
          ],
          q2Options: [
            {
              label:
                "Размер налога зависит от кадастровой стоимости и ставки налога в районе, где находится земля. ",
              key: "q2_0",
              answer: 1
            },
            {
              label: "35%",
              key: "q2_1",
              answer: 2
            },
            {
              label:
                "Размер налога зависит от мощности автомобиля и ставки налога в регионе",
              key: "q2_2",
              answer: 3
            },
            {
              label: "13%",
              key: "q2_3",
              answer: 4
            },
            {
              label:
                "Размер налога зависит от кадастровой стоимости и ставки налога в районе, где находится имущество.",
              key: "q2_4",
              answer: 5
            }
          ],
          cost: {
            correct: 1,
            hint: 1,
            zeroCorrect: 1
          },
          hintText:
            "Налог на доходы физических лиц во многих случаях взимается по одной и той же ставке, однако для рекламных акций, участие в которых не связано с риском потерять свои деньги, налоговая ставка существенно выше, чем выигрыш в лотереях, связанных с финансовым риском (покупка билета – это уже финансовый риск). А ставки налогов на имущество, как правило, зависят от характеристик имущества. ",
          correctAnswer: `
                <table class="el-table">
            <thead>
              <th>Ситуация</th>
              <th>Вид налога</th>
              <th>Налоговая ставка</th>
            </thead>
            <tbody>
              <tr>
                <td>Нестор Петрович купил билет государственной лотереи «100 к 20» и выиграл приз 5 000 рублей.</td>
                <td>Налог на доходы физических лиц</td>
                <td>13%</td>
              </tr>
              <tr>
                <td>Нестор Петрович получил в течение года от арендатора квартиры, которая досталась ему в наследство от бабушки, 240 000 рублей.</td>
                <td>Налог на доходы физических лиц</td>
                <td>13%</td>
              </tr>
              <tr>
                <td>Нестор Петрович является собственником квартиры, которая досталась ему в наследство от бабушки.</td>
                <td>Имущественный налог</td>
                <td>Размер налога зависит от кадастровой стоимости и ставки налога в районе, где находится имущество </td>
              </tr>
              <tr>
                <td>Нестор Петрович является владельцем земельного участка.</td>
                <td>Земельный налог</td>
                <td>Размер налога зависит от кадастровой стоимости и ставки налога в районе, где находится земля</td>
              </tr>
              <tr>
                <td>Нестор Петрович полгода назад купил автомобиль LADA Vesta.</td>
                <td>Транспортный налог</td>
                <td>Размер налога зависит от мощности автомобиля  и ставки налога в регионе</td>
              </tr>
              <tr>
                <td>Нестор Петрович участвовал в беспроигрышной рекламной лотерее в торговом центре и выиграл планшет стоимостью 40 000 рублей.</td>
                <td>Налог на доходы физических лиц</td>
                <td>35%</td>
              </tr>
              <tr>
                <td>Зарплата Нестора Петровича на мебельной фабрике составляет 75 000 рублей в месяц.</td>
                <td>Налог на доходы физических лиц</td>
                <td>13%</td>
              </tr>
            </tbody>
          </table>
            
            `,
          showHint: false
        },
        // {
        //   answers: {
        //     q1: [
        //       {
        //         q0_1: 3,
        //         q0_2: 4
        //       },
        //       {
        //         q0_1: 3,
        //         q0_2: 4
        //       },
        //       {
        //         q0_1: 2,
        //         q0_2: 5
        //       },
        //       {
        //         q0_1: 1,
        //         q0_2: 1
        //       },
        //       {
        //         q0_1: 4,
        //         q0_2: 3
        //       },
        //       {
        //         q0_1: 3,
        //         q0_2: 2
        //       },
        //       {
        //         q0_1: 3,
        //         q0_2: 4
        //       }
        //     ]
        //   },
        //   q0Options: [
        //     {
        //       label:
        //         "Нестор Петрович купил билет государственной лотереи «100 к 20» и выиграл приз 5 000 рублей.",
        //       key: "q0_0"
        //     },
        //     {
        //       label:
        //         "Нестор Петрович получил в течение года от арендатора квартиры, которая досталась ему в наследство от бабушки, 240 000 рублей.",
        //       key: "q0_1"
        //     },
        //     {
        //       label:
        //         "Нестор Петрович является собственником квартиры, которая досталась ему в наследство от бабушки.",
        //       key: "q0_2"
        //     },
        //     {
        //       label: "Нестор Петрович является владельцем земельного участка.",
        //       key: "q0_3"
        //     },
        //     {
        //       label:
        //         "Нестор Петрович полгода назад купил автомобиль LADA Vesta.",
        //       key: "q0_4"
        //     },
        //     {
        //       label:
        //         "Нестор Петрович участвовал в беспроигрышной рекламной лотерее в торговом центре и выиграл планшет стоимостью 40 000 рублей.",
        //       key: "q0_5"
        //     },
        //     {
        //       label:
        //         "Зарплата Нестора Петровича на мебельной фабрике составляет 75 000 рублей в месяц.",
        //       key: "q0_6"
        //     }
        //   ],
        //   q0_1Options: [
        //     {
        //       label: " ",
        //       key: "q0_1_0"
        //     },
        //     {
        //       label: " ",
        //       key: "q0_1_1"
        //     },
        //     {
        //       label: " ",
        //       key: "q0_1_2"
        //     },
        //     {
        //       label: " ",
        //       key: "q0_1_3"
        //     },
        //     {
        //       label: " ",
        //       key: "q0_1_4"
        //     },
        //     {
        //       label: " ",
        //       key: "q0_1_5"
        //     },
        //     {
        //       label: " ",
        //       key: "q0_1_6"
        //     }
        //   ],
        //   q0_2Options: [
        //     {
        //       label: " ",
        //       key: "q0_2_0"
        //     },
        //     {
        //       label: " ",
        //       key: "q0_2_1"
        //     },
        //     {
        //       label: " ",
        //       key: "q0_2_2"
        //     },
        //     {
        //       label: " ",
        //       key: "q0_2_3"
        //     },
        //     {
        //       label: " ",
        //       key: "q0_2_4"
        //     },
        //     {
        //       label: " ",
        //       key: "q0_2_5"
        //     },
        //     {
        //       label: " ",
        //       key: "q0_2_6"
        //     }
        //   ],
        //   q1Options: [
        //     {
        //       label: "Земельный налог",
        //       key: "q1_0",
        //       answer: 1
        //     },
        //     {
        //       label: "Имущественный налог",
        //       key: "q1_1",
        //       answer: 2
        //     },
        //     {
        //       label: "Налог на доходы физических лиц",
        //       key: "q1_2",
        //       answer: 3
        //     },
        //     {
        //       label: "Транспортный налог",
        //       key: "q1_3",
        //       answer: 3
        //     }
        //   ],
        //   q2Options: [
        //     {
        //       label:
        //         "Размер налога зависит от кадастровой стоимости и ставки налога в районе, где находится земля. ",
        //       key: "q2_0",
        //       answer: 1
        //     },
        //     {
        //       label: "35%",
        //       key: "q2_1",
        //       answer: 2
        //     },
        //     {
        //       label:
        //         "Размер налога зависит от мощности автомобиля и ставки налога в регионе",
        //       key: "q2_2",
        //       answer: 3
        //     },
        //     {
        //       label: "13%",
        //       key: "q2_3",
        //       answer: 4
        //     },
        //     {
        //       label:
        //         "Размер налога зависит от кадастровой стоимости и ставки налога в районе, где находится имущество.",
        //       key: "q2_4",
        //       answer: 5
        //     }
        //   ],
        //   cost: {
        //     correct: 1,
        //     hint: 1,
        //     zeroCorrect: 1
        //   },
        //   hintText:
        //     "Налог на доходы физических лиц во многих случаях взимается по одной и той же ставке, однако для рекламных акций, участие в которых не связано с риском потерять свои деньги, налоговая ставка существенно выше, чем выигрыш в лотереях, связанных с финансовым риском (покупка билета – это уже финансовый риск). А ставки налогов на имущество, как правило, зависят от характеристик имущества. ",
        //   correctAnswer: `
        //         <table class="el-table">
        //     <thead>
        //       <th>Ситуация</th>
        //       <th>Вид налога</th>
        //       <th>Налоговая ставка</th>
        //     </thead>
        //     <tbody>
        //       <tr>
        //         <td>Нестор Петрович купил билет государственной лотереи «100 к 20» и выиграл приз 5 000 рублей.</td>
        //         <td>Налог на доходы физических лиц</td>
        //         <td>13%</td>
        //       </tr>
        //       <tr>
        //         <td>Нестор Петрович получил в течение года от арендатора квартиры, которая досталась ему в наследство от бабушки, 240 000 рублей.</td>
        //         <td>Налог на доходы физических лиц</td>
        //         <td>13%</td>
        //       </tr>
        //       <tr>
        //         <td>Нестор Петрович является собственником квартиры, которая досталась ему в наследство от бабушки.</td>
        //         <td>Имущественный налог</td>
        //         <td>Размер налога зависит от кадастровой стоимости и ставки налога в районе, где находится имущество </td>
        //       </tr>
        //       <tr>
        //         <td>Нестор Петрович является владельцем земельного участка.</td>
        //         <td>Земельный налог</td>
        //         <td>Размер налога зависит от кадастровой стоимости и ставки налога в районе, где находится земля</td>
        //       </tr>
        //       <tr>
        //         <td>Нестор Петрович полгода назад купил автомобиль LADA Vesta.</td>
        //         <td>Транспортный налог</td>
        //         <td>Размер налога зависит от мощности автомобиля  и ставки налога в регионе</td>
        //       </tr>
        //       <tr>
        //         <td>Нестор Петрович участвовал в беспроигрышной рекламной лотерее в торговом центре и выиграл планшет стоимостью 40 000 рублей.</td>
        //         <td>Налог на доходы физических лиц</td>
        //         <td>35%</td>
        //       </tr>
        //       <tr>
        //         <td>Зарплата Нестора Петровича на мебельной фабрике составляет 75 000 рублей в месяц.</td>
        //         <td>Налог на доходы физических лиц</td>
        //         <td>13%</td>
        //       </tr>
        //     </tbody>
        //   </table>

        //     `,
        //   showHint: false
        // },
        {
          answers: {
            q1: [
              {
                q0_1: 3,
                q0_2: 4
              },
              {
                q0_1: 3,
                q0_2: 4
              },
              {
                q0_1: 2,
                q0_2: 5
              },
              {
                q0_1: 1,
                q0_2: 1
              },
              {
                q0_1: 4,
                q0_2: 3
              },
              {
                q0_1: 3,
                q0_2: 2
              },
              {
                q0_1: 3,
                q0_2: 4
              }
            ]
          },
          q1: [
            {
              field1: "Автомобиль",
              field2: "НДС",
              field3: "",
              index: 0
            },
            {
              field1: "Добавленная стоимость",
              field2: "НДФЛ",
              field3: "",
              index: 1
            },
            {
              field1: "Земельный участок",
              field2: "Акцизы",
              field3: "",
              index: 2
            },
            {
              field1: "Доходы физического лица",
              field2: "Транспортный налог ",
              field3: "",
              index: 3
            },
            {
              field1: "Квартира",
              field2: "Налог на имущество",
              field3: "",
              index: 4
            },
            {
              field1: "Плата за покупку алкогольной, табачной продукции",
              field2: "Земельный налог",
              field3: "",
              index: 5
            }
          ],
          cost: {
            correct: 1,
            hint: 1,
            zeroCorrect: 1
          },
          hintText:
            "Название налога обычно указывает на предмет налогообложения",
          correctAnswer: `
                <table class="el-table">
            <thead>
              <th>Предмет налогообложения </th>
              <th>Название налога </th>
              <th>Вид налога </th>
            </thead>
            <tbody>
              <tr>
                <td>Автомобиль</td>
                <td>Транспортный налог</td>
                <td>Прямой налог</td>
              </tr>
              <tr>
                <td>Добавленная стоимость</td>
                <td>НДС</td>
                <td>Косвенный налог</td>
              </tr>
              <tr>
                <td>Земельный участок</td>
                <td>Земельный налог</td>
                <td>Прямой налог</td>
              </tr>
              <tr>
                <td>Доходы физического лица</td>
                <td>НДФЛ</td>
                <td>Прямой налог</td>
              </tr>
              <tr>
                <td>Квартира</td>
                <td>Налог на имущество</td>
                <td>Прямой налог </td>
              </tr>
              <tr>
                <td>Плата за покупку алкогольной, табачной продукции</td>
                <td>Акцизы</td>
                <td>Косвенный налог </td>
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
      if (this.curWay == 0) {
        answers = Object.values(this.ways[0].answers);
        answersCount = answers.length;
        let correctAnswer = [3, 4, 3, 4, 2, 5, 1, 1, 4, 3, 3, 2, 3, 4];
        correctAnswers = answers.filter(
          (item, itemPosition) => item.value == correctAnswer[itemPosition]
        ).length;
        correctCost = this.ways[0].cost.correct;
        this.closeFinquestModal();
        if (correctAnswers * correctCost > 0) {
          newPoints = correctAnswers * correctCost;
        } else {
          newPoints = this.ways[0].cost.zeroCorrect;
        }
      } else if (this.curWay == 1) {
        let correct = [
          {
            field1: "Автомобиль",
            field2: "Транспортный налог",
            field3: "Прямой налог"
          },
          {
            field1: "Добавленная стоимость",
            field2: "НДС",
            field3: "Косвенный налог"
          },
          {
            field1: "Земельный участок",
            field2: "Земельный налог",
            field3: "Прямой налог"
          },
          {
            field1: "Доходы физического лица",
            field2: "НДФЛ",
            field3: "Прямой налог"
          },
          {
            field1: "Квартира",
            field2: "Налог на имущество",
            field3: "Прямой налог "
          },
          {
            field1: "Плата за покупку алкогольной, табачной продукции",
            field2: "Акцизы",
            field3: "Косвенный налог "
          }
        ];
        answers = this.ways[1].answers.q1;
        answersCount = 6;
        correctAnswers = this.ways[1].q1.filter(item => {
          return (
            item.field1 == correct[item.index].field1 &&
            item.field2 == correct[item.index].field2 &&
            item.field3 == correct[item.index].field3
          );
        }).length;
        correctCost = this.ways[1].cost.correct;
        this.closeFinquestModal();
        if (correctAnswers * correctCost > 0) {
          newPoints = correctAnswers * correctCost;
        } else {
          newPoints = this.ways[1].cost.zeroCorrect;
        }
      }
      this.$store.dispatch("initChangePoint", false);

      this.$store.commit("setLastQuestion", {
        cost: newPoints,
        allCount: answersCount,
        correctCount: correctAnswers,
        correctAnswer: this.ways[1].correctAnswer,
        hint: this.ways[1].hintText
      });
      this.$store.commit("addPointsCount", newPoints);
      this.openCongratulationModal("FinquestQuestionResult");
      this.$store.commit("setPointComplete", { point: 3, block: 0 });
    },
    // setAnswer() {
    //   let answers, answersCount, correctAnswers, correctCost, newPoints;
    //   if (this.curWay == 0) {
    //     answers = this.ways[0].answers.q1;
    //     let q1answers = this.ways[0].q0_1Options.map((item, itemPosition) => {
    //       return item.answer;
    //     });
    //     let q2answers = this.ways[0].q0_2Options.map((item, itemPosition) => {
    //       return item.answer;
    //     });
    //     answersCount = q1answers.length;
    //     correctAnswers = answers.filter((item, itemPosition) => {
    //       return (
    //         item.q0_1 == q1answers[itemPosition] &&
    //         item.q0_2 == q2answers[itemPosition]
    //       );
    //     }).length;
    //     correctCost = this.ways[0].cost.correct;
    //     this.closeFinquestModal();
    //     if (correctAnswers * correctCost > 0) {
    //       newPoints = correctAnswers * correctCost;
    //     } else {
    //       newPoints = this.ways[0].cost.zeroCorrect;
    //     }
    //   } else if (this.curWay == 1) {
    //     let correct = [
    //       {
    //         field1: "Автомобиль",
    //         field2: "Транспортный налог",
    //         field3: "Прямой налог"
    //       },
    //       {
    //         field1: "Добавленная стоимость",
    //         field2: "НДС",
    //         field3: "Косвенный налог"
    //       },
    //       {
    //         field1: "Земельный участок",
    //         field2: "Земельный налог",
    //         field3: "Прямой налог"
    //       },
    //       {
    //         field1: "Доходы физического лица",
    //         field2: "НДФЛ",
    //         field3: "Прямой налог"
    //       },
    //       {
    //         field1: "Квартира",
    //         field2: "Налог на имущество",
    //         field3: "Прямой налог "
    //       },
    //       {
    //         field1: "Плата за покупку алкогольной, табачной продукции",
    //         field2: "Акцизы",
    //         field3: "Косвенный налог "
    //       }
    //     ];
    //     answers = this.ways[1].answers.q1;
    //     answersCount = 6;
    //     correctAnswers = this.ways[1].q1.filter(item => {
    //       return (
    //         item.field1 == correct[item.index].field1 &&
    //         item.field2 == correct[item.index].field2 &&
    //         item.field3 == correct[item.index].field3
    //       );
    //     }).length;
    //     correctCost = this.ways[1].cost.correct;
    //     this.closeFinquestModal();
    //     if (correctAnswers * correctCost > 0) {
    //       newPoints = correctAnswers * correctCost;
    //     } else {
    //       newPoints = this.ways[1].cost.zeroCorrect;
    //     }
    //   }
    //   this.$store.dispatch("initChangePoint", false);

    //   this.$store.commit("setLastQuestion", {
    //     cost: newPoints,
    //     allCount: answersCount,
    //     correctCount: correctAnswers,
    //     correctAnswer: this.ways[1].correctAnswer,
    //     hint: this.ways[1].hintText
    //   });
    //   this.$store.commit("addPointsCount", newPoints);
    //   this.openCongratulationModal("FinquestQuestionResult");
    //   this.$store.commit("setPointComplete", { point: 3, block: 0 });
    // },
    getCellHeight(key) {
      let element = document.getElementsByClassName(key)[0];
      if (element && element.offsetHeight > 0) {
        return element.offsetHeight;
      } else {
      }
    },
    q0OnStart() {
      // console.log(arguments);
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
      // console.log(this.ways[0].q0_1Options[elementPosition].label);
    },
    closeModal() {
      return this.$store.commit("setShowHint", false);
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
      let column = ev.dataTransfer.getData("column");
      let curColumn = ev.currentTarget.dataset.column;
      let indexFrom = ev.dataTransfer.getData("indexFrom");
      if (indexFrom != -1 && curColumn != column) return;
      let textFrom = ev.dataTransfer.getData("textFrom");
      let index = ev.currentTarget.dataset.index;
      let text = ev.currentTarget.innerText;
      this.$set(this.ways[1].q1[index], "field" + column, textFrom);
      if (indexFrom != -1) {
        this.$set(this.ways[1].q1[indexFrom], "field" + column, text);
      }
    }
  },
  computed: {
    showHintBtn() {
      return this.$store.getters.getPointStatus;
    },
    allFieldsFilled() {
      if (this.curWay == 0) {
        return (
          Object.values(this.ways[0].answers).filter(item => item.length == 0)
            .length == 0
        );
        // let q0_1Length = this.ways[0].q0_1Options.filter(item => {
        //   return item.label == " ";
        // }).length;
        // let q0_2Length = this.ways[0].q0_2Options.filter(item => {
        //   return item.label == " ";
        // }).length;

        // return q0_1Length == 0 && q0_2Length == 0;
      } else if (this.curWay == 1) {
        return this.ways[1].q1.filter(item => item.field3 == "").length == 0;
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
        sum = this.ways[0].q0Options.length * this.ways[0].cost.correct;
      } else if (this.curWay == 1) {
        return 6;
      }
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
.finquest-form {
  display: flex;
  flex-wrap: wrap;
}

.answer {
  width: 33% !important;
}

.taxType,
.taxRate {
  padding: 0;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.125);
  width: 100% !important;
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
.answers {
  display: flex;
}
.answer:not(.answerq1) {
  padding: 5px;
  border: 1px solid gray;
  display: inline-block;
  border-radius: 4px;
  margin-right: 5px;
  margin-bottom: 5px;
}
</style>

<style scoped>
table {
  width: 100% !important;
}
>>> .el-table--border td:first-child .cell {
  font-size: 12px !important;
  line-height: 12px !important;
}
.finquest-box__body--rotate {
}
.finquest-box__body--rotate >>> .el-table__body-wrapper {
  transform: rotateX(180deg);
}
.finquest-box__body--rotate >>> .el-table {
  /* transform: rotateX(180deg); */
  display: flex;
  flex-direction: column;
}
.finquest-box__body--rotate >>> .el-table__body {
  transform: rotateX(180deg);
}
</style>
