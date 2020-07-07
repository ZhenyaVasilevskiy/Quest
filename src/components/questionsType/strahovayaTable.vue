<template>
  <div>
    <el-table :data="getData" style="width: 100%">
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
      <el-table-column prop="days" label="Количество дней" width="180"></el-table-column>
      <el-table-column prop="country" label="Страны, где действует страховка" width="180"></el-table-column>
      <el-table-column prop="activity" label="Активности, включенные в страхование" width="180"></el-table-column>
      <el-table-column prop="sum" label="Сумма покрытия" width="180"></el-table-column>
      <el-table-column prop="price" label="Стоимость страхования" width="180"></el-table-column>
    </el-table>
  </div>
</template>

<script>
/*
    1) Событие что все поля заполнены или не заполнены
    2) Событие что ответ правильный или неправильный
*/
export default {
  props: ["shopList"],
  name: "table-result",
  data: function() {
    return {};
  },
  mounted: function() {
    this.$nextTick(() => {});
  },
  computed: {
    getData() {
      let curCity = this.$store.getters.getFinnavigator[
        this.$store.getters.getFinnavigator.curCity
      ];
      let questions = curCity.gameSteps[curCity.gameStep].questions.filter(
        question => question.isStrahovay
      );

      return [
        {
          title: "Страховка 1",
          days: questions[0].answer,
          country: questions[1].answer,
          activity: questions[2].answer,
          sum: questions[3].answer,
          price: `${questions[4].answer} ${questions[5].answer}`
        },
        {
          title: "Страховка 2",
          days: questions[6].answer,
          country: questions[7].answer,
          activity: questions[8].answer,
          sum: questions[9].answer,

          price: `${questions[10].answer} ${questions[11].answer}`
        },
        {
          title: "Страховка 3",
          days: questions[12].answer,
          country: questions[13].answer,
          activity: questions[14].answer,
          sum: questions[15].answer,
          price: `${questions[16].answer} ${questions[17].answer}`
        }
      ];
    }
  }
};
</script>

<style scoped>
</style>