<template>
  <div class="top-section">
    <header class="header">
      <div class="header__side" style="width: 100%">
        <router-link to="/" class="header__logo" style="display: flex; align-items: center">
          <img src="../assets/images/logo.png" alt="logo" />
          <h3 style="color: #fff; margin-left: 15px">Финансовые квесты</h3>
        </router-link>
        <div class="header__links">
          <div class="header__links__item">
            <v-icons name="pig"></v-icons>
          </div>
          <div class="header__links__item">
            <v-icons name="locat"></v-icons>
          </div>
          <div class="header__links__item">
            <v-icons name="building"></v-icons>
          </div>
          <div class="header__links__item">
            <v-icons name="leave"></v-icons>
          </div>
        </div>
        <!-- <el-switch
          v-model="curWay"
          active-text="Второй вариант заданий"
          inactive-text="Первый вариант заданий"
          active-color="#3dc479"
          v-if="this.$router.currentRoute.name == 'finquest-map-points'"
        ></el-switch>-->
        <div style="display: flex; margin-left: auto;">
          <router-link to="/finquest-zayavka" >
            <p style="color: #fff" >Подать заявку</p>
          </router-link>
          <router-link to="/registration">
            <p style="color: #fff; margin-left:15px">Регистрация</p>
          </router-link>
          <router-link to="/enter">
            <p style="color: #fff; margin-left: 15px">Вход</p>
          </router-link>
          <router-link to="/cab">
            <p style="color: #fff; margin-left: 15px">Личный кабинет</p>
          </router-link>
        </div>
      </div>
      <div class="header__side">
        <div class="aside-block-points">
          <span class="aside-block-points__count">{{ getPointsCount }}</span>
          <span class="aside-block-points__text">баллов</span>
        </div>
        <div
          class="hamburger-icon"
          :class="{'hamburger-open': headerOpen}"
          @click="headerOpen = !headerOpen"
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
    <aside class="aside-block" :class="{'is-visible': headerOpen}">
      <div class="aside-block-points">
        <span class="aside-block-points__count">{{ getPointsCount }}</span>
        <span class="aside-block-points__text">баллов</span>
        <v-stopwatch></v-stopwatch>
      </div>
      <ul class="aside-block-list h-reset-list">
        <!-- <li class="aside-block-list__item">
          <router-link :to="{name: 'home'}" class="aside-block-list__item__link">
            <div class="aside-block-list__icon">
              <img src="../assets/images/nav/checklist.png" alt="checklist" />
            </div>
            <span class="aside-block-list__name">Задание</span>
          </router-link>
        </li>-->
        <li class="aside-block-list__item">
          <!-- <router-link :to="{name: 'chat'}" class="aside-block-list__item__link">
            <div class="aside-block-list__icon">
              <img src="../assets/images/nav/chat.png" alt="checklist" />
            </div>
            <span class="aside-block-list__name">Чат</span>
          </router-link>-->
        </li>
        <li class="aside-block-list__item">
          <!-- <router-link :to="{name: 'home'}" class="aside-block-list__item__link">
            <div class="aside-block-list__icon">
              <img src="../assets/images/nav/lamp.png" alt="checklist" />
            </div>
            <span class="aside-block-list__name">Справка</span>
          </router-link>-->
          <!-- <router-link :to="{name: 'home'}" class="aside-block-list__item__link">
            <div class="aside-block-list__icon">
              <img src="../assets/images/nav/lamp.png" alt="checklist" />
            </div>
            <span class="aside-block-list__name">Квест</span>
          </router-link>-->
        </li>
        <!-- <li class="aside-block-list__item">
          <button type="button" @click="hintModalEnable" class="aside-block-list__item__link">
            <div class="aside-block-list__icon">
              <img src="../assets/images/nav/question.png" alt="checklist" />
            </div>
            <span class="aside-block-list__name">Подсказки</span>
          </button>
        </li>-->
        <li class="aside-block-list__item">
          <!-- <router-link :to="{name: 'home'}" class="aside-block-list__item__link">
            <div class="aside-block-list__icon">
              <img src="../assets/images/nav/search.png" alt="checklist" />
            </div>
            <span class="aside-block-list__name">Поиск</span>
          </router-link>-->
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
export default {
  name: "header-section",
  data() {
    return {
      curWay: 0,
      headerOpen: false,
      navList: [
        // {
        //   icon: require("../assets/images/nav/checklist.png"),
        //   name: "Задание",
        //   to: { name: "home" }
        // },
        {
          icon: require("../assets/images/nav/chat.png"),
          name: "Чат",
          to: { name: "chat" }
        },
        {
          icon: require("../assets/images/nav/lamp.png"),
          name: "Справка",
          to: { name: "home" }
        },
        // {
        //   icon: require("../assets/images/nav/question.png"),
        //   name: "Подсказки",
        //   to: { name: "home" }
        // },
        {
          icon: require("../assets/images/nav/search.png"),
          name: "Поиск",
          to: { name: "home" }
        }
      ]
    };
  },
  methods: {
    hintModalEnable() {
      if (this.$store.getters.getPointStatus) {
        this.openHintModal("HintModalActivate");
      }
    }
  },
  computed: {
    getPointsCount() {
      return this.$store.getters.getPointsCount;
    }
  },
  watch: {
    curWay: function(newValue) {
      this.$store.commit("setCurWay", +newValue);
    }
  }
};
</script>
