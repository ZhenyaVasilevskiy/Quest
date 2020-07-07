<template>
  <section class="section-finquest">
    <div class="welocme-message">
      <div class="welocme-message-inner" style="height: 100%; overflow: auto">
        <img src="../assets/images/finnavigator/comix/comix0.png" alt />
      </div>
      <router-link
        :to="{name: 'finnavigator-map-points'}"
        class="button button--xs button--green startGameBtn"
      >
        <span>Начать игру</span>
      </router-link>
    </div>
    <!-- <div class="aside-wrap">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>-->
  </section>
</template>

<script>
export default {
  name: "FinNavigator",
  data: function() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.startGameBtn {
  margin-top: 10px;
  background-size: contain;
  width: 120px;
  height: 42px;
  transition: 0.3s;
}
.startGameBtn:hover {
  background-color: #3dc479 !important;
  color: #fff !important;
}
.section-finquest {
  padding: 0;
}
.welocme-message {
  bottom: 0;
  height: 90vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: auto;
    width: 60vw;
  }
}
.welocme-message-inner {
  position: relative;
}
.welocme-message-text {
  position: absolute;
  top: 20%;
  left: 10%;
  //   right: 0;
  width: 80%;
  .welocme-message-title {
    text-align: center;
  }
  .welocme-message-p {
    text-indent: 2%;
    font-size: 15px;
    color: #17151b;
    line-height: 23px;
    margin-bottom: 10px;
  }
}
</style>
