<template>
  <div class="finhistory-quest-inner">
    <el-row class="q" type="flex">
      <el-col :md="{span: 18}" :lg="{span: 8}" class="q__block q__block--1" v-show="canShowStep(1)">
        <div class="q__block-inner">
          <img src="../../assets/images/finnavigator/npc.png" class="npc npc--q" />
          <h1 class="q__title">Cтраховая</h1>
          <div
            class="q__text"
          >Здравствуйте! Мой друг поедет кататься на лыжах в Австрию. Подскажите, какие вы можете предложить варианты страховых полисов для него?</div>
          <div
            class="q__text"
            style="margin-top: 15px;"
          >Здравствуйте! У нас есть предложения от трёх компаний. Ознакомьтесь, пожалуйста, с ними.</div>
          <el-button
            class="readTheoryBtn"
            icon="el-icon-view"
            type="info"
            target="_blank"
            v-if="!rollUpIsOpen"
            @click="rollUpIsOpen = true"
          >Читать теорию</el-button>
          <div class="theoryText" v-if="rollUpIsOpen">
            <div class="theoryText__inner">
              <div>
                <a
                  href="https://drive.google.com/open?id=12tonzepA6ySpnNLZoHrS7-rsG56E1sc6"
                  target="_blank"
                >Страховка 1</a>
              </div>
              <div>
                <a
                  href="https://drive.google.com/open?id=1-1W9kiLoPFDNqd35V2wPOTBqDFqVzRgf"
                  target="_blank"
                >Страховка 2</a>
              </div>
              <div>
                <a
                  href="https://drive.google.com/open?id=1hbXpwBLDVDH1lsE21xZDPbZInri_PySa"
                  target="_blank"
                >Страховка 3</a>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :md="{span: 18}" :lg="{span: 7}" class="q__block q__block--3" v-show="canShowStep(2)">
        <div class="q__block-inner">
          <h1 class="q__title">Задание</h1>
          <div
            class="q__text"
          >Выбирая страховку, необходимо оценить её по нескольким параметрам. Заполню для начала таблицу, чтобы было удобнее их сравнивать, а затем выберу самую подходящую для моего друга!</div>
          <div class="q__text"></div>
          <div class="q__text" style="margin-top: 15px;">
            <strong></strong>
          </div>
        </div>
      </el-col>
      <el-col :md="{span: 18}" :lg="{span: 8}" class="q__block q__block--5" v-show="canShowStep(3)">
        <div class="q__block-inner">
          <strong class="questionText" style="font-syle: normal !important;"></strong>
          <!-- :key="'questionTitle' + questionIndex" -->
          <!-- СЮДА ВСТАВИТЬ КОМПОНЕНТ ВОПРОСА-->
          <el-table :data="getData" style="width: 100%" v-if="answerStep == 0">
            <!-- <el-table-column label="Выбрать" width="180">
            <template slot-scope="scope">
            <el-checkbox
                v-model="shopList.finalChecked[scope.row.type]"
                true-label="shop2"
                false-label="shop1"
                :checked="shopList.finalChecked[scope.row.type] == 'shop2'"
            >Выбрать</el-checkbox>
            </template>
            </el-table-column>-->
            <el-table-column prop="title" label="Название компании" width="180"></el-table-column>
            <el-table-column label="Количество дней" width="180">
              <template slot-scope="scope">
                <el-select
                  v-model="questions[scope.row.strahovayaName + 'q1'].answer"
                  placeholder="Выберите ответ"
                >
                  <el-option
                    v-for="question in questions.s1q1.selectOptions"
                    :key="'questionSelect' + question.value"
                    :label="question.label"
                    :value="question.value"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="Страны, где действует страховка" width="180">
              <template slot-scope="scope">
                <el-input
                  v-model="questions[scope.row.strahovayaName + 'q2'].answer"
                  :maxlength="6"
                  :show-word-limit="true"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="Активности, включенные в страхование" width="180">
              <template slot-scope="scope">
                <el-select
                  v-model="questions[scope.row.strahovayaName + 'q3'].answer"
                  placeholder="Выберите ответ"
                >
                  <el-option
                    v-for="question in questions.s1q3.selectOptions"
                    :key="'questionSelect' + question.value"
                    :label="question.label"
                    :value="question.value"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="Сумма покрытия" width="180">
              <template slot-scope="scope">
                <el-select
                  v-model="questions[scope.row.strahovayaName + 'q4'].answer"
                  placeholder="Выберите ответ"
                >
                  <el-option
                    v-for="question in questions.s1q4.selectOptions"
                    :key="'questionSelect' + question.value"
                    :label="question.label"
                    :value="question.value"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="Стоимость страхования" width="180">
              <template slot-scope="scope">
                <el-input
                  v-model="questions[scope.row.strahovayaName + 'q5'].answer"
                  :maxlength="6"
                  :show-word-limit="true"
                ></el-input>
                <el-select
                  v-model="questions[scope.row.strahovayaName + 'q6'].answer"
                  placeholder="Выберите ответ"
                >
                  <el-option
                    v-for="question in questions.s1q6.selectOptions"
                    :key="'questionSelect' + question.value"
                    :label="question.label"
                    :value="question.value"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
          </el-table>
          <template v-else-if="answerStep == 1">
            <p>Какая страховка самая выгодная?</p>
            <el-select v-model="finalQuestion.answer" placeholder="Выберите ответ">
              <el-option
                v-for="question in finalQuestion.selectOptions"
                :key="'questionSelect' + question.value"
                :label="question.label"
                :value="question.value"
              ></el-option>
            </el-select>
          </template>

          <button
            v-if="answerStep == 0"
            class="finhistory-quest-nextButton"
            :disabled="isDisabledAnswerButton"
            :class="{
                    'nextButton--allowed': !isDisabledAnswerButton,
                    'nextButton--notallowed': isDisabledAnswerButton
                }"
            @click="answerStep = 1"
          >
            <span>Далее</span>
          </button>
          <button
            v-if="answerStep == 1"
            class="nextButton--allowed finhistory-quest-nextButton"
            @click="answerStep = 0"
          >
            <span>Назад</span>
          </button>
          <button
            v-if="answerStep == 1"
            class="finhistory-quest-nextButton"
            :disabled="isDisabledAnswerButton"
            :class="{
                    'nextButton--allowed': !isDisabledAnswerButton,
                    'nextButton--notallowed': isDisabledAnswerButton
                }"
            @click="setAnswer"
          >
            <span>Ответить</span>
          </button>
          <p v-if="isDisabledAnswerButton" class="form-error-message">Дайте ответ на все вопросы</p>
          <button class="finquest-box__hint" @click="openHint">
            <!-- <img src="../../assets/images/finhistory/question-sm.png" alt="hint" /> -->
            <span class="finquest-box__hint__name">
              <!-- <template>Нужна подсказка?</template> -->
              <template v-if="!tipIsGetting">Нужна подсказка?</template>
              <template v-else-if="tipIsGetting">Прочитать подсказку</template>
            </span>
          </button>
        </div>
      </el-col>
      <ul class="finquest-steps-list h-reset-list" ref="t">
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
  </div>
</template>

<script>
import questionInputText from "../questionsType/questionInputText.vue";
import questionSelect from "../questionsType/questionSelect.vue";
export default {
  name: "finnavigator-question-strahovay",
  data: function() {
    return {
      questionStep: 0,
      answerStep: 0,
      tipIsGetting: false,
      step: 1,
      rollUpIsOpen: false,
      showQuestionHint: false,
      showStepHint: false,
      filledFieldCount: 0,
      correctAnswersCount: 0,
      incorrectAnswersCount: 0,
      showShoplistTable: false,
      showBankQuestion1: false,
      questions: {
        s1q1: {
          type: "select",
          maxLength: 1,
          correctAnswer: 7,
          selectOptions: [
            {
              label: "1",
              value: 1
            },
            {
              label: "2",
              value: 2
            },
            {
              label: "3",
              value: 3
            },
            {
              label: "4",
              value: 4
            },
            {
              label: "5",
              value: 5
            },
            {
              label: "6",
              value: 6
            },
            {
              label: "7",
              value: 7
            }
          ],
          answer: "",
          questionText: "<strong>Количество дней</strong>",
          afterQuestionText: "",
          answer: ""
        },
        s1q2: {
          type: "inputText",
          maxLength: 6,
          correctAnswer: "шенген",
          answer: "",
          questionText: "<strong>Страны, где действует страховка</strong>",
          answer: ""
        },
        s1q3: {
          type: "select",
          maxLength: 1,
          correctAnswer: 1,
          selectOptions: [
            {
              label: "прыжки с парашютом",
              value: 1
            },
            {
              label: "горнолыжный спорт",
              value: 2
            },
            {
              label: "альпинизм",
              value: 3
            },
            {
              label: "трекинг",
              value: 4
            },
            {
              label: "не включены",
              value: 5
            }
          ],
          answer: "",
          questionText: "<strong>Активности, включенные в страхование</strong>",
          afterQuestionText: "",
          answer: ""
        },
        s1q4: {
          type: "select",
          maxLength: 1,
          correctAnswer: 2,
          selectOptions: [
            {
              label: "30 000 €",
              value: 1
            },
            {
              label: "35 000 €",
              value: 2
            },
            {
              label: "50 000 €",
              value: 3
            },
            {
              label: "30 000 $",
              value: 4
            },
            {
              label: "35 000 $",
              value: 5
            }
          ],
          answer: "",
          questionText: "<strong>Сумма покрытия</strong>",
          afterQuestionText: "",
          answer: ""
        },
        s1q5: {
          type: "inputText",
          maxLength: 6,
          correctAnswer: "10,64",
          answer: "",
          questionText: "<strong>Стоимость страхования</strong>",
          answer: ""
        },
        s1q6: {
          type: "select",
          maxLength: 1,
          correctAnswer: 3,
          selectOptions: [
            {
              label: "руб.",
              value: 1
            },
            {
              label: "долл. США",
              value: 2
            },
            {
              label: "евро",
              value: 3
            }
          ],
          answer: "",
          questionText: "<strong>В какой валюте стоимость страховки</strong>",
          afterQuestionText: "",
          answer: ""
        },
        s2q1: {
          type: "select",
          maxLength: 1,
          correctAnswer: 3,
          selectOptions: [
            {
              label: "1",
              value: 1
            },
            {
              label: "2",
              value: 2
            },
            {
              label: "3",
              value: 3
            },
            {
              label: "4",
              value: 4
            },
            {
              label: "5",
              value: 5
            },
            {
              label: "6",
              value: 6
            },
            {
              label: "7",
              value: 7
            }
          ],
          answer: "",
          questionText: "<strong>Количество дней</strong>",
          afterQuestionText: "",
          answer: ""
        },
        s2q2: {
          type: "inputText",
          maxLength: 6,
          correctAnswer: "шенген",
          answer: "",
          questionText: "<strong>Страны, где действует страховка</strong>",
          answer: ""
        },
        s2q3: {
          type: "select",
          maxLength: 1,
          correctAnswer: 2,
          selectOptions: [
            {
              label: "прыжки с парашютом",
              value: 1
            },
            {
              label: "горнолыжный спорт",
              value: 2
            },
            {
              label: "альпинизм",
              value: 3
            },
            {
              label: "трекинг",
              value: 4
            },
            {
              label: "не включены",
              value: 5
            }
          ],
          answer: "",
          questionText: "<strong>Активности, включенные в страхование</strong>",
          afterQuestionText: "",
          answer: ""
        },
        s2q4: {
          type: "select",
          maxLength: 1,
          correctAnswer: 3,
          selectOptions: [
            {
              label: "30 000 €",
              value: 1
            },
            {
              label: "35 000 €",
              value: 2
            },
            {
              label: "50 000 €",
              value: 3
            },
            {
              label: "30 000 $",
              value: 4
            },
            {
              label: "35 000 $",
              value: 5
            }
          ],
          answer: "",
          questionText: "<strong>Сумма покрытия</strong>",
          afterQuestionText: "",
          answer: ""
        },
        s2q5: {
          type: "inputText",
          maxLength: 6,
          correctAnswer: "352,27",
          answer: "",
          questionText: "<strong>Стоимость страхования</strong>",
          answer: ""
        },
        s2q6: {
          type: "select",
          maxLength: 1,
          correctAnswer: 1,
          selectOptions: [
            {
              label: "руб.",
              value: 1
            },
            {
              label: "долл. США",
              value: 2
            },
            {
              label: "евро",
              value: 3
            }
          ],
          answer: "",
          questionText: "<strong>В какой валюте стоимость страховки</strong>",
          afterQuestionText: "",
          answer: ""
        },
        s3q1: {
          type: "select",
          maxLength: 1,
          correctAnswer: 7,
          selectOptions: [
            {
              label: "1",
              value: 1
            },
            {
              label: "2",
              value: 2
            },
            {
              label: "3",
              value: 3
            },
            {
              label: "4",
              value: 4
            },
            {
              label: "5",
              value: 5
            },
            {
              label: "6",
              value: 6
            },
            {
              label: "7",
              value: 7
            }
          ],
          answer: "",
          questionText: "<strong>Количество дней</strong>",
          afterQuestionText: "",
          answer: ""
        },
        s3q2: {
          type: "inputText",
          maxLength: 6,
          correctAnswer: "шенген",
          answer: "",
          questionText: "<strong>Страны, где действует страховка</strong>",
          answer: ""
        },
        s3q3: {
          type: "select",
          maxLength: 1,
          correctAnswer: 5,
          selectOptions: [
            {
              label: "прыжки с парашютом",
              value: 1
            },
            {
              label: "горнолыжный спорт",
              value: 2
            },
            {
              label: "альпинизм",
              value: 3
            },
            {
              label: "трекинг",
              value: 4
            },
            {
              label: "не включены",
              value: 5
            }
          ],
          answer: "",
          questionText: "<strong>Активности, включенные в страхование</strong>",
          afterQuestionText: "",
          answer: ""
        },
        s3q4: {
          type: "select",
          maxLength: 1,
          correctAnswer: 3,
          selectOptions: [
            {
              label: "30 000 €",
              value: 1
            },
            {
              label: "35 000 €",
              value: 2
            },
            {
              label: "50 000 €",
              value: 3
            },
            {
              label: "30 000 $",
              value: 4
            },
            {
              label: "35 000 $",
              value: 5
            }
          ],
          answer: "",
          questionText: "<strong>Сумма покрытия</strong>",
          afterQuestionText: "",
          answer: ""
        },
        s3q5: {
          type: "inputText",
          maxLength: 6,
          correctAnswer: "638,00",
          answer: "",
          questionText: "<strong>Стоимость страхования</strong>",
          answer: ""
        },
        s3q6: {
          type: "select",
          maxLength: 1,
          correctAnswer: 1,
          selectOptions: [
            {
              label: "руб.",
              value: 1
            },
            {
              label: "долл. США",
              value: 2
            },
            {
              label: "евро",
              value: 3
            }
          ],
          answer: "",
          questionText: "<strong>В какой валюте стоимость страховки</strong>",
          afterQuestionText: "",
          answer: ""
        }
      },
      finalQuestion: {
        maxLength: 1,
        correctAnswer: 1,
        selectOptions: [
          {
            label: "Страховая 1",
            value: 1
          },
          {
            label: "Страховая 2",
            value: 2
          },
          {
            label: "Страховая 3",
            value: 3
          }
        ],
        answer: ""
      },
      rewards: {
        correct: 1,
        zeroCorrect: 0
      },
      questionTip:
        "При выборе страхового полиса внимательно изучите все условия страхования (стоимость, сумма страхового покрытия) и какие именно затраты компания готова будет покрыть. Также важно, чтобы полис действовал на протяжении всей поездки на необходимой территории",
      hintCost: 10,
      timeLimit: 72000,
      correctAnswer: "1 страховка"
    };
  },
  components: {
    questionInputText,
    questionSelect
  },
  mounted: function() {
    this.$nextTick(() => {});
  },
  methods: {
    getFinnavigator() {
      return this.$store.getters.getFinnavigator[this.getCurCity];
    },
    getCurCity() {
      return this.$store.getters.getFinnavigator.curCity;
    },
    setAnswer() {
      let correctCount = 0;
      let incorrectCount = 0;
      Object.values(this.questions).forEach(question => {
        if (question.answer == question.correctAnswer) {
          correctCount++;
        } else {
          incorrectCount++;
        }
      });
      let newPoints;
      let correctCost = this.rewards.correct;
      if (correctCount * correctCost > 0) {
        newPoints = correctCount * correctCost;
      } else {
        newPoints = this.rewards.zeroCorrect;
      }
      if (this.finalQuestion.answer == this.finalQuestion.correctAnswer) {
        newPoints += 5;
        correctCount++;
      }
      this.$store.dispatch("initChangePoint", false); // закрываю окно с заданием
      this.questionStep = 0; // обнуляю шаги внутри квеста
      this.answerStep = 0; // обнуляю шаги внутри квеста
      this.$store.commit("addPointsCount", newPoints); // Добавляю баллы
      this.$store.commit("addFinnavigatorPointsReward", newPoints); // Увеличиваем количество баллов, которые были получены именно за прохождение заданий
      this.$alert(
        `
        <h3 class="fin-modal-title">Набрано баллов: <strong>${newPoints}</strong></h3>
        <h3 class="fin-modal-title">Правильных ответов: <strong>${correctCount}</strong></h3>
        <h3 class="fin-modal-title">Неправильных ответов: <strong>${incorrectCount}</strong></h3>
        <div style="margin: 10px 0;">
            <h5>Правильный ответ:</h5>
            ${this.correctAnswer}
        </div>
        <div>
            <h5>Подсказка:</h5>
            ${this.questionTip}
        </div>
      `,
        "",
        {
          confirmButtonText: "OK",
          customClass: "fin-modal",
          dangerouslyUseHTMLString: true,
          showClose: false,
          confirmButtonText: "Далее",
          confirmButtonClass: "button--green",
          callback: () => {
            this.showQuestionHint = false;
            this.showStepHint = false;
            this.rollUpIsOpen = false;
            let curStep = this.$store.getters.getFinnavigator[
              this.$store.getters.getFinnavigator.curCity
            ];
            this.$store.commit("setFinnavigatorGameStep", curStep.gameStep + 1);
          }
        }
      );
      this.$emit("complete");
    },
    openHint() {
      //   this.getTip();
      if (this.tipIsGetting) {
        this.readTip();
      } else {
        this.getTip();
      }
    },
    readTip() {
      this.$alert(
        `<div class="q__text">${this.questionTip}</div>`,
        `Подсказка`,
        {
          confirmButtonText: "OK",
          customClass: "fin-modal",
          confirmButtonClass: "button--green",
          dangerouslyUseHTMLString: true,
          showClose: false,
          confirmButtonText: "Далее"
        }
      );
    },
    getTip() {
      let tipCost = this.hintCost;
      let tipTitle = `Подсказка стоит баллов: ${tipCost} `;
      this.$confirm(``, tipTitle, {
        confirmButtonText: "Активировать подсказку",
        cancelButtonText: "Отклонить",
        customClass: "fin-modal",
        dangerouslyUseHTMLString: true,
        showClose: false,
        cancelButtonClass: "button--red",
        confirmButtonClass: "button--green"
      }).then(() => {
        this.tipIsGetting = true;
        this.showQuestionHint = true;
        this.$store.commit("minusPointsCount", tipCost);
        this.readTip();
      });
    },
    canShowStep(step) {
      let screenWidth = screen.width;
      let canShow = false;
      if (screenWidth >= 1200) {
        canShow = true;
      } else {
        if (this.step == step) {
          canShow = true;
        } else [(canShow = false)];
      }

      return canShow;
    }
  },
  computed: {
    isDisabledAnswerButton() {
      let isDisabled = true;
      if (this.answerStep == 0) {
        isDisabled =
          Object.values(this.questions).filter(
            question => question.answer == ""
          ).length > 0;
      } else if (this.answerStep == 1) {
        isDisabled = this.finalQuestion.answer == "";
      }
      return isDisabled;
    },
    getData() {
      return [
        {
          title: "Страховка 1",
          days: this.questions.s1q1.answer,
          country: this.questions.s1q2.answer,
          activity: this.questions.s1q3.answer,
          sum: this.questions.s1q4.answer,
          price: `${this.questions.s1q5.answer} ${this.questions.s1q6.answer}`,
          answer: "",
          strahovayaName: "s1"
        },
        {
          title: "Страховка 2",
          days: this.questions.s2q1.answer,
          country: this.questions.s2q2.answer,
          activity: this.questions.s2q3.answer,
          sum: this.questions.s2q4.answer,

          price: `${this.questions.s2q5.answer} ${this.questions.s2q6.answer}`,
          answer: "",
          strahovayaName: "s2"
        },
        {
          title: "Страховка 3",
          days: this.questions.s3q1.answer,
          country: this.questions.s3q2.answer,
          activity: this.questions.s3q3.answer,
          sum: this.questions.s3q4.answer,
          price: `${this.questions.s3q5.answer} ${this.questions.s3q6.answer}`,
          answer: "",
          strahovayaName: "s3"
        }
      ];
    }
  },
  watch: {},
  destroyed: function() {}
};
</script>

<style scoped>
>>> .theoryText__title {
  font-size: 20px;
}
>>> .theoryText__ul {
  margin-top: 10px;
  margin-bottom: 10px;
}
>>> .theoryText__li {
  margin-top: 10px;
  margin-bottom: 10px;
}
>>> .theoryText__table {
  width: 100%;
}
>>> .theoryText__table thead {
  text-align: center;
  border: 1px solid;
}
>>> .theoryText__table td {
  width: 50%;
  border: 1px solid;
  padding: 5px;
}
>>> .theoryText__formula {
  width: 100%;
  display: flex;
}
>>> .theoryText__formula-main {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.theoryText__formula-top {
  font-size: 13px;
  border-bottom: 1px solid;
}
.finhistory-quest-inner {
  font-family: "Times New Roman", cursive;
  font-style: italic;
  padding: 10px;
  height: 90%;
  overflow: auto;
}
.finhistory-quest-title {
  font-size: 24px;
  color: #000;
}
.finhistory-quest-text {
  font-size: 17px;
  color: #000;
  line-height: 1.2;
}
.finhistory-quest-tip {
  line-height: 16px;
  font-weight: 600;
  font-size: 16px;
  margin: 15px 0;
  width: 90%;
  color: #000;
  padding: 10px;
  border: 1px solid transparent;
  border-image-slice: 10 15 10 15;
  border-image-width: 7px;
  border-image-outset: 0px 0px 0px 0px;
  border-image-repeat: round round;
  border-image-source: url("data:image/png;base64,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");
}
.finhistory-quest-nextButton {
  margin-top: 10px;
  font-family: "Times New Roman", cursive;
  font-style: italic;
  font-weight: 600;
  color: #000;
  border: 1px solid;
  background-color: transparent;
  border-image-slice: 42 42 42 42;
  border-image-width: 42px 42px 42px 42px;
  border-image-outset: 0px 0px 0px 0px;
  border-image-repeat: round round;
  border-image-source: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL4AAAA+CAMAAACiGlF3AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAUdQTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzQoxCwAAAG10Uk5T/wkFAAGZAw8sKHrlUBmPf8EGBwzNEXY8v5vxtiMUiVvtFQoTaB1tYTJpCAI7zzoW+yUQKWYbNYYq2LUNGiAkQUlfoCdFSEOx79SpvAsEEroXNtajYB9VPSEOSzOcMINHJjEr4VrEHnVl8zdYNMQUSagAAAJUSURBVHic7dpZV9NAGIDhbxaS1mprBurCUgRM6UKtFRVKaSkuxSVB3NBWVMQNl/9/7cy0cJAcFeeC76Rn3oukzDTJc4a0vQkAoYxxwkcYY46bgL+XPHhxJjKVgrPnIJ057zmCjDIGY1kPLly8ROEyH++/Y2JSbqbUJXLTeuDKzKxH6dzgBFd9yOsXvt7OF4r/wKhKkl5ekBdYKPPZyYoeu9afmj/B4b9VvV6TW3rDK/HFm7fgNgArAHiJKbIkx5drtcH76v1dHkYFXaHpwejh0hzMnyTB5UrpGoxTWAWoQLO1DLDWbjX/x64V61XXrVEqWPLO3XsZcPh9AHlWaHagED1kY1EuPn0ADx8dHW0//tMl3OgQDUIW0zR/dQ2bYZriO3wTm2Ga4ifZE2yGaYq/FQI2wzTF92ccbIZpiv/U5dgM0xSfFGN98wjxDJthmubDc2yGafpnixBshmmK/+Kli80wTfG3IdYfXUj72AzTlL7+KovNME3xU6+72AzT9L3Ti/W9n4j5R9fykVL2Nxux5sd89S0fq2HgT+9gM0zT/PF4r34u3vy38eZvL2EzTBuGbx7LR8ryMbN8zCwfM8vHzPIxs3zMLB8zy8fM8jGzfMwsH7Ph4J9yW0G3o540rUNG/70DjTInAqAYMsbLEHheSAL/+GHveqcNjfRebRok2M3JfepDVj95226px9H4ygQVzepeSAmlZU+IMTn18cixOQTv8ToA+S580gv5+Uvyq9rvb4ZCOM5cyHt7Xthyd7+VKHWa9Luca/9Q/6FK5DyFn/t6/ws54aaCA4tKhQAAAABJRU5ErkJggg==");
  background-size: contain;
  width: 120px;
  height: 42px;
}
.finhistory-quest-nextButton:focus,
.finhistory-quest-nextButton:hover:not(.nextButton--notallowed) {
  color: #000;
  background-color: #3dc479;
  cursor: pointer;
}
.nextBtn--allowed {
  background-color: #3dc479;
}
.nextButton--notallowed {
  opacity: 0.5;
  background-color: #fa4848;
}
>>> .finhistory-quest-answer.el-checkbox-group {
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
>>> .finhistory-quest-answer .el-checkbox__input {
  display: none;
}
>>> .finhistory-quest-answer
  .el-checkbox__input.is-checked
  + .el-checkbox__label {
  color: #000 !important;
}
>>> .finhistory-quest-answer .el-checkbox__label {
  padding: 0 5px !important;
}
>>> .finhistory-quest-answer .el-checkbox {
  margin: 0;
  margin-bottom: 5px;
  color: #000;
  white-space: normal;
  border: 1px solid;
  background-color: transparent;
  border-image-slice: 42 42 42 42;
  border-image-width: 42px 42px 42px 42px;
  border-image-outset: 0px 0px 0px 0px;
  border-image-repeat: round round;
  border-image-source: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL4AAAA+CAMAAACiGlF3AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAUdQTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzQoxCwAAAG10Uk5T/wkFAAGZAw8sKHrlUBmPf8EGBwzNEXY8v5vxtiMUiVvtFQoTaB1tYTJpCAI7zzoW+yUQKWYbNYYq2LUNGiAkQUlfoCdFSEOx79SpvAsEEroXNtajYB9VPSEOSzOcMINHJjEr4VrEHnVl8zdYNMQUSagAAAJUSURBVHic7dpZV9NAGIDhbxaS1mprBurCUgRM6UKtFRVKaSkuxSVB3NBWVMQNl/9/7cy0cJAcFeeC76Rn3oukzDTJc4a0vQkAoYxxwkcYY46bgL+XPHhxJjKVgrPnIJ057zmCjDIGY1kPLly8ROEyH++/Y2JSbqbUJXLTeuDKzKxH6dzgBFd9yOsXvt7OF4r/wKhKkl5ekBdYKPPZyYoeu9afmj/B4b9VvV6TW3rDK/HFm7fgNgArAHiJKbIkx5drtcH76v1dHkYFXaHpwejh0hzMnyTB5UrpGoxTWAWoQLO1DLDWbjX/x64V61XXrVEqWPLO3XsZcPh9AHlWaHagED1kY1EuPn0ADx8dHW0//tMl3OgQDUIW0zR/dQ2bYZriO3wTm2Ga4ifZE2yGaYq/FQI2wzTF92ccbIZpiv/U5dgM0xSfFGN98wjxDJthmubDc2yGafpnixBshmmK/+Kli80wTfG3IdYfXUj72AzTlL7+KovNME3xU6+72AzT9L3Ti/W9n4j5R9fykVL2Nxux5sd89S0fq2HgT+9gM0zT/PF4r34u3vy38eZvL2EzTBuGbx7LR8ryMbN8zCwfM8vHzPIxs3zMLB8zy8fM8jGzfMwsH7Ph4J9yW0G3o540rUNG/70DjTInAqAYMsbLEHheSAL/+GHveqcNjfRebRok2M3JfepDVj95226px9H4ygQVzepeSAmlZU+IMTn18cixOQTv8ToA+S580gv5+Uvyq9rvb4ZCOM5cyHt7Xthyd7+VKHWa9Luca/9Q/6FK5DyFn/t6/ws54aaCA4tKhQAAAABJRU5ErkJggg==");
  background-size: contain;
}
.finhistory-quest-answer .el-checkbox.is-checked::after {
  content: "";
  background-image: url(../../assets/images/finhistory/checked.png);
  position: absolute;
  top: -40%;
  left: 0;
  width: 100%;
  height: 200%;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.6;
}
.npc {
  width: 50%;
  float: left;
  padding-right: 15px;
}
.npc--q {
  width: 150px;
}
.q {
  position: fixed;
  height: 90vh;
  bottom: 0;
  right: -1rem;
  width: calc(100% - 11rem);
  /* flex-direction: column; */
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: stretch;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.5);
}
.q__block {
  box-shadow: 2px 0 8px #dceffa;
  background-color: #fff;
  height: 98%;
  padding: 6% 3% 3% 3%;
  /* background-image: url("../../assets/images/finhistory/questBg.png"); */
  /* background-size: contain; */
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.q__block-inner {
  height: 91%;
  overflow-x: hidden;
  overflow-y: auto;
}
.q__block--3 .q__block-inner {
  overflow-x: auto;
}
.q__block--5 {
  height: 98%;
}
.q__title {
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #324b59;
  /* font-style: normal; */
  font-family: "Times New Roman", cursive;
  /* font-family: "product-sans", sans-serif; */
  line-height: 1.2;
}
.q__text {
  /* font-style: normal; */
  font-size: 1.3rem;
  font-weight: 400;
  color: #324b59;
  line-height: 1.66;
  /* font-family: "product-sans", sans-serif; */
}
.q__checkbox {
  /* font-style: normal; */
  font-size: 1.3rem;
  font-weight: 400;
  color: #324b59;
  line-height: 1.66;
  /* font-family: "product-sans", sans-serif; */
  max-width: 60%;
  word-wrap: break-word;
  display: flex;
  margin-bottom: 15px;
  padding: 0;
}
.q__checkbox .el-checkbox__label {
  white-space: normal;
}
.button {
  font-style: italic;
  /* font-family: "product-sans", sans-serif; */
}
.form-error-message {
  /* font-family: "product-sans", sans-serif; */
  /* font-style: normal; */
}
.finquest-steps-list {
  display: none;
}
.finquest-steps-list__item {
  /* font-style: normal; */
  /* font-family: "product-sans", sans-serif; */
}
.readTheoryBtn {
  font-size: 20px;
  font-weight: 600;
  padding: 5px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid #000;
  margin-bottom: 5px;
  font-style: italic;
  /* font-family: "product-sans", sans-serif; */
  color: #324b59 !important;
  white-space: normal;
  margin-top: 15px;
  width: 90%;
}
.finquest-box__hint {
  background-color: transparent;
  right: -5%;
  bottom: 3%;
}
.finquest-box__hint__name {
  color: #324b59 !important;
  font-style: italic;
}
.theoryText__inner {
  margin: 15px 15px 15px 0;
  padding: 15px;
  border: 1px solid #000;
}
@media (max-width: 1200px) {
  .q {
    flex-direction: row;
    justify-content: flex-end;
  }
  .q__block {
    margin-right: 3rem;
  }
  .finquest-steps-list {
    display: block;
  }
}
</style>
<style>
/* .fin-modal { */
.el-message-box__wrapper {
  background-color: rgba(149, 155, 238, 0.8);
}
.fin-modal .el-message-box__btns {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}
.fin-modal .el-message-box__btns .el-button span {
  color: #fff;
  /* font-family: "product-sans", sans-serif; */
  font-size: 1.6rem;
}
.fin-modal .el-message-box__btns .el-button {
  padding: 0 2rem;
  min-width: 18.6rem;
  height: 5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  outline: none;
  box-shadow: none;
  border-radius: 6px;
  font-weight: 700;
  color: #fff !important;
  transition: background-color 0.3s ease;
  outline: none;
  box-shadow: none;
  border: none;
}
.fin-modal .el-message-box__title {
  font-weight: 700;
  z-index: 321;
  color: #324b59;
  font-size: 1.5rem;
  text-align: center;
}
.fin-modal {
  width: 40%;
  max-width: 600px;
  box-shadow: 2px 0 8px #dceffa;
  padding: 3.5rem;
}
.fin-modal-title {
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.4;
  color: #000;
  text-align: center;
}
.shopListMsg {
  width: 90vw;
}
</style>