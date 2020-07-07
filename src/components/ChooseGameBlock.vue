<template>
  <div class="choose-game-col">
    <div class="choose-game-block">
      <div class="choose-game-block__icon">
        <v-icons :name="gameBlock.icon"></v-icons>
      </div>
      <div class="choose-game-block__content">
        <div class="choose-game-block__name">
          <h2 class="h2">{{gameBlock.name}}</h2>
        </div>
        <span class="choose-game-block__plan">{{gameBlock.plan}}</span>
        <div class="choose-game-block__range">
          <div class="button button--violet button--sm">{{gameBlock.range}}</div>
        </div>
        <div class="choose-game-block__list-wrap">
          <button type="button" class="choose-game-block__list-trigger">
            <v-icons name="pin"></v-icons>
            <span>Список городов</span>
          </button>
          <ul class="choose-game-block__list h-reset-list">
            <li v-for="(listItem, index) in gameBlock.list" :key="`citiesList-`+index">
              <v-icons name="pin"></v-icons>
              <span>{{listItem}}</span>
            </li>
          </ul>
        </div>
        <div
          class="choose-game-block__start-game"
          v-if="!$store.state[gameBlock.questName].isComplete"
        >
          <router-link :to="gameBlock.to" class="button button--green button--md">
            <span>Начать игру</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "choose-game-block",
  props: {
    gameBlock: {}
  },
  computed: {},
  data() {
    return {};
  }
};
</script>