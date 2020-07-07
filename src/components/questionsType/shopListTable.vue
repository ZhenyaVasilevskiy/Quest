<template>
  <div style="display: flex;" class="qwe">
    <el-table :data="shopList.shops.shop1" style="width: 50%">
      <el-table-column label="Выбрать" width="180">
        <template slot-scope="scope">
          <el-checkbox
            v-model="shopList.finalChecked[scope.row.type]"
            true-label="shop1"
            false-label="shop2"
            :checked="shopList.finalChecked[scope.row.type] == 'shop1'"
          >Выбрать</el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="Наименование" width="180"></el-table-column>
      <el-table-column prop="weight" label="Масса" width="180"></el-table-column>
      <el-table-column prop="price" label="Цена" width="180"></el-table-column>
    </el-table>
    <el-table :data="shopList.shops.shop2" style="width: 50%">
      <el-table-column label="Выбрать" width="180">
        <template slot-scope="scope">
          <el-checkbox
            v-model="shopList.finalChecked[scope.row.type]"
            true-label="shop2"
            false-label="shop1"
            :checked="shopList.finalChecked[scope.row.type] == 'shop2'"
          >Выбрать</el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="Наименование" width="180"></el-table-column>
      <el-table-column prop="weight" label="Масса" width="180"></el-table-column>
      <el-table-column prop="price" label="Цена" width="180"></el-table-column>
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
  name: "shop-list-table",
  data: function() {
    return {};
  },
  mounted: function() {
    this.$nextTick(() => {});
  },
  computed: {}
};
</script>

<style scoped>
</style>