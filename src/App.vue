<template>
  <div id="app">
    <div class="l-wrapper">
      <v-header></v-header>
      <main class="main-content">
        <transition name="fade" mode="out-in" appear>
          <router-view></router-view>
        </transition>
      </main>
    </div>
  </div>
</template>

<script>
import "./assets/styles/main.scss";

export default {
  name: "App"
};
</script>