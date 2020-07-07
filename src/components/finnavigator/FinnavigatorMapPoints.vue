<template>
  <el-row type="flex" justify="space-between">
    <el-col :span="24" class="map">
      <div
        class="map-dog"
        :style="player.styles"
        :class="{ 'in-move': inMove, 'is-visible': pointAppear }"
      >
        <img :src="player.icon" alt="map-dog" class="map-dog-img" />
      </div>
      <img
        src="../../assets/images/finnavigator/map-clear.png"
        alt="finquest-map"
        class="finquest-map"
      />
      <img :src="this.getFinnavigator.mapImg" alt="finquest-map-city" class="finquest-map-city" />
      <img :src="this.getCurGameStep.questImg" alt="finquest-map-city" class="finquest-quest-img" />
      <div
        v-for="(point, index) in getMapPoints"
        :key="'point' + index"
        class="finquest-map-point-wrapper"
      >
        <button
          type="button"
          class="finquest-map-point"
          :disabled="point.styles.disabled"
          :style="point.styles"
          @click="goToPoint(index)"
          :class="{ 'is-visible': pointAppear }"
        >
          <img :src="point.icon" alt="point" />
        </button>
        <div class="finquest-map-point-address" :style="point.imgOnHoverStyles">
          <img :src="point.imgOnHover" alt="point" />
        </div>
      </div>
    </el-col>
    <el-col class="finhistory-quest" :span="24" :pull="0" v-if="getCurGameStep.isQuestion">
      <finnavigatorQuest :gameStep="getCurGameStep" @complete="cantClickOnPoints = false"></finnavigatorQuest>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from "vuex";
import finnavigatorQuest from "./FinnavigatorQuest.vue";
import comixModal from "./comixModal.vue";
export default {
  name: "finnavigator-map-points",
  data() {
    return {
      pointAppear: false,
      inMove: false,
      isIncorrectPoint: false,
      cantClickOnPoints: false,
      player: {
        styles: {
          left: "45%",
          top: "45%"
        },
        icon: require("../../assets/images/finquest/finquest-dog.png")
      }
    };
  },
  components: {
    finnavigatorQuest,
    comixModal
  },
  mounted() {
    setTimeout(() => {
      this.$store.commit("addPointsCount", 10);
      this.pointAppear = true;
      this.inMove = true;
    }, 1000);
    setTimeout(() => {
      this.inMove = false;
    }, 3000);
  },
  methods: {
    goToPoint(index) {
      if (this.inMove || this.cantClickOnPoints) return;
      let curPoint = this.getMapPoints[index];
      this.player.styles.top = +curPoint.styles.top.replace("%", "") + 2 + "%";
      this.player.styles.left =
        +curPoint.styles.left.replace("%", "") + 2 + "%";
      this.inMove = true;
      this.$store.dispatch("initChangePoint", true);
      this.$store.dispatch("initHintText", curPoint.hintText);
      setTimeout(() => {
        this.inMove = false;
        // console.log("----------------------");
        // console.log(this.getCurGameStep);
        // console.log(this);
        // console.log(this.getCurGameStep.correctPoint);
        // console.log(index);
        // debugger;
        console.log("----------------------");
        if (this.getCurGameStep.correctPoint - 1 == index) {
          this.isIncorrectPoint = false;
          this.$store.commit(
            "setFinnavigatorGameStep",
            this.getFinnavigator.gameStep + 1
          );
          //TODO: ВЕРНУТЬ КОД НИЖЕ
        //   this.cantClickOnPoints = true;
        } else {
          this.isIncorrectPoint = true;
          this.cantClickOnPoints = false;
          this.$store.commit("minusPointsCount", 1);
          this.$alert(
            `<h1 style="text-align: center; font-size: 2.5rem;">
                К сожалению,<br> это неправильный ответ.<br> Попробуйте еще раз! 
            </h1>
            <p style='text-align: center;'>Вы потеряли 1 балл</p>
                <img src="${require("../../assets/images/finhistory/incorrectStation.png")}" style="width: 40%; margin: 0 auto; display: block;">`,
            "",
            {
              confirmButtonText: "OK",
              customClass: "fin-modal",
              dangerouslyUseHTMLString: true,
              showClose: false,
              confirmButtonText: "Далее",
              confirmButtonClass: "button--green"
            }
          );
        }
      }, 1600);
    }
  },
  computed: {
    ...mapState(["pointsCount"]),
    getFinnavigator() {
      return this.$store.getters.getFinnavigator[this.getCurCity];
    },
    getMapPoints() {
      return this.getFinnavigator.mapPoints;
    },
    getCurGameStep() {
      let curGameStep = this.getFinnavigator.gameSteps[
        this.getFinnavigator.gameStep
      ];
      if (curGameStep.showQuestImg) {
        const h = this.$createElement;
        this.$msgbox({
          title: "",
          message: h(comixModal, {
            props: {
              src: curGameStep.questImg
            }
          }),
          confirmButtonText: "Далее",
          confirmButtonClass: "button--green",
          customClass: "shopListMsg"
          //   beforeClose: (action, instance, done) => {}
        });
        // let curStep = this.$store.getters.getFinnavigator[
        //   this.$store.getters.getFinnavigator.curCity
        // ];
        this.$store
          .dispatch("actionSetFinnavigatorStepShowQuestionImg", false)
          .then(() => {});
      }
      return this.getFinnavigator.gameSteps[this.getFinnavigator.gameStep];
    },
    getCurCity() {
      return this.$store.getters.getFinnavigator.curCity;
    }
  },
  watch: {
    pointsCount: function(newValue, oldValue) {
      let point = newValue - oldValue;
      let msg, notificationClass;
      if (point > 0) {
        msg = `Начислено балов: ${point}`;
        notificationClass = "addPoints";
      } else {
        msg = `Списано балов: ${Math.abs(point)}`;
        notificationClass = "minusPoints";
      }
      this.$notify({
        title: "",
        message: msg,
        duration: 3000,
        position: "bottom-left",
        customClass: notificationClass,
        showClose: false
      });
    }
    // getCurGameStep: function(newValue, oldValue) {

    // }
    // cantClickOnPoints() {
    // }
  },
  destroyed: function() {
    // this.pointAppear = false;
    // this.inMove = false;
    // this.isIncorrectPoint = false;
    // this.cantClickOnPoints = false;
    // this.player.styles.left = "45%";
    // this.player.styles.right = "45%";
    // this.$store.commit("setFinhistoryGameStep", 1);
  }
};
</script>

<style scoped lang="scss">
.finquest-map {
  height: 115vh;
  margin-left: -3vw;
  margin-top: -4vh;
}
.map-dog {
  z-index: 101;
}
.finquest-map-point {
  max-width: 100px;
  z-index: 100;
}
.finquest-map-point-address {
  z-index: 102;
}

.finquest-map-city {
  position: absolute;
  top: 10vh;
  left: 2vw;
  z-index: 99;
  width: 45vw;
}

@media (max-width: 1300px) {
  .finquest-map-point {
    max-width: 60px;
  }
}

.finhistory-quest {
  //   background-image: url(../../assets/images/finhistory/questBg.png);
  height: 88vh;
  //   max-height: 634px;
  padding: 20px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  z-index: 102;
}
.finquest-quest-img {
  position: absolute;
  top: -4vh;
  right: 20vw;
  width: 25vw;
  height: 75vh;
  transform: rotate(-25deg);
}
.map {
  position: relative;
  //   height: 90vh;
}
.finquest-questBg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  height: 95%;
}
</style>