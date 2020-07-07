<template>
  <section class="choose-game">
    <h1 class="h1">Выберите игру</h1>
    <div class="choose-game-inner">
      <v-choose-game-block
        v-for="(gameBlock, index) in gamesArr"
        :key="`block-`+index"
        :gameBlock="gameBlock"
      ></v-choose-game-block>
    </div>
  </section>
</template>

<script>
export default {
  name: "choose-game",
  data() {
    return {
      gamesArr: [
        {
          icon: "pig",
          name: "Финквест",
          plan: "индивидуальный",
          range: "7-9 класс",
          list: [
            "Архангельск",
            "Рязань",
            "Краснодар",
            "Владивосток",
            "Новосибирск",
            "Нижний Новгород"
          ],
          to: { name: "finquest-welcome" },
          questName: "finquest"
        },
        {
          icon: "locat",
          name: "Финансовый навигатор",
          plan: "команда",
          range: "9-11 класс",
          list: [
            "Архангельск",
            "Рязань",
            "Краснодар",
            "Владивосток",
            "Новосибирск",
            "Нижний Новгород"
          ],
          to: { name: "finquest-navigator" },
          questName: "finnavigator"
        },
        {
          icon: "building",
          name: "Финансовый регулятор",
          plan: "команда",
          range: "10-11 класс",
          list: ["Владивосток", "Новосибирск", "Нижний Новгород"],
          to: { name: "finquest-regulator" },
          questName: "finregulator"
        },
        {
          icon: "leave",
          name: "Финансовые истории",
          plan: "команда",
          range: "8-9 класс",
          list: ["Нижний Новгород"],
          to: { name: "finquest-history" },
          questName: "finhistory"
        }
      ]
    };
  }
};
</script>
