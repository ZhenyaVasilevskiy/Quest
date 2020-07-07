<template>
  <div>
    <div v-html="questionInfo.questionText"></div>
    <img
      v-for="(item, itemKey) in questionInfo.items"
      :key="'item' + itemKey"
      :src="item.img"
      class="littleImg"
      @click="openItemModal(item)"
    />
    <el-select v-model="curField" placeholder="Выберите ответ">
      <el-option
        v-for="(item, itemKey) in questionInfo.items"
        :key="'questionHoverItems' + itemKey"
        :label="item.title"
        :value="item"
      ></el-option>
    </el-select>
    <div v-html="questionInfo.afterQuestionText"></div>
  </div>
</template>

<script>
/*
    1) Событие что все поля заполнены или не заполнены
    2) Событие что ответ правильный или неправильный
*/
export default {
  props: ["questionInfo"],
  name: "question-hover-items",
  data: function() {
    return {
      allFieldsFilled: false,
      answerIsCorrect: undefined
    };
  },
  computed: {
    shopName() {
      return this.$store.getters.getFinnavigator[
        this.$store.getters.getFinnavigator.curCity
      ].gameSteps[
        this.$store.getters.getFinnavigator[
          this.$store.getters.getFinnavigator.curCity
        ].gameStep
      ].stationName == "Магазин №1"
        ? "shop1"
        : "shop2";
    },
    curField: {
      get: function() {
        return this.$store.getters.getFinnavigator[
          this.$store.getters.getFinnavigator.curCity
        ].shopList.shops[this.shopName][this.questionInfo.productType].title;
      },
      set: function(newValue) {
        let field = this.$store.getters.getFinnavigator[
          this.$store.getters.getFinnavigator.curCity
        ].shopList.shops[this.shopName][this.questionInfo.productType];
        field.title = newValue.title;
        field.weight = newValue.weight;
        field.price = newValue.price;
      }
    }
  },
  methods: {
    openItemModal(item) {
      let fieldsNames = {
        cocolateType: "Тип шоколада",
        package: "Упаковка",
        brand: "Бренд",
        country: "Страна",
        weight: "Вес",
        raw: "Сырье",
        taste: "Начинка/вкус",
        cocoaPercent: "Содержание какао",
        features: "Особенности",
        type: "Тип продукта",
        breakfastType: "Вид сухого завтрака",
        flakesType: "Вид хлопьев"
      };
      let message = "";
      Object.entries(fieldsNames).forEach(elem => {
        let fieldName = elem[0];
        let fieldValue = elem[1];
        if (item[fieldName]) {
          message += `<p><strong>${fieldValue}: </strong>${item[fieldName]}</p>`;
        }
      });
      let price = "";
      if (item.discount) {
        price += `<p>${item.price} Р</p><p>${item.discount} Р</p>`;
      } else {
        price += `<p>${item.price} Р</p>`;
      }
      this.$alert(
        `<div>
            <img src="${item.img}" style="width: 50%">
            <div style="width: 50%">
                <div>
                    <h3>${item.title} ${item.weight} г.</h3>
                    ${price}
                </div>
                </div>
                    Характеристики
                    ${message}
                </div>
            </div>
        </div>`,
        "",
        {
          confirmButtonText: "OK",
          customClass: "fin-modal",
          dangerouslyUseHTMLString: true,
          showClose: false,
          confirmButtonText: "Далее",
          confirmButtonClass: "button--green",
          callback: () => {}
        }
      );
    }
  },
  watch: {
    curField: function(newValue, oldValue) {
      let allFieldsFilled = !!this.curField;
      if (allFieldsFilled != this.allFieldsFilled) {
        this.allFieldsFilled = allFieldsFilled;
        this.$emit(
          "allFieldsFilled",
          allFieldsFilled, // все поля заполнены или нет
          this.questionInfo.correctAnswer == this.curField, // новый ответ првильный или нет
          this.answerIsCorrect // старый ответ правильный или нет
        );
        this.answerIsCorrect = this.questionInfo.correctAnswer == this.curField;
      }
    }
  }
};
</script>

<style scoped>
.littleImg {
  width: 80px;
  margin: 5px;
}
.littleImg:hover {
  cursor: pointer;
}
</style>