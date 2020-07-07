<template>
  <el-row type="flex" justify="space-between">
    <el-col :span="16" class="map">
      <div
        class="map-dog"
        :style="player.styles"
        :class="{ 'in-move': inMove, 'is-visible': pointAppear }"
      >
        <img :src="player.icon" alt="map-dog" class="map-dog-img" />
      </div>
      <img
        src="../../assets/images/finhistory/map-clear.png"
        alt="finquest-map"
        class="finquest-map"
      />
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
    <el-col class="finhistory-quest" :span="6" :pull="1">
      <finhistoryQuest :gameStep="getCurGameStep" @complete="cantClickOnPoints = false"></finhistoryQuest>
      <img
        src="../../assets/images/finhistory/questBg.png"
        alt="finquest-map"
        class="finquest-questBg"
      />
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from "vuex";
import finhistoryQuest from "./FinhistoryQuest.vue";
export default {
  name: "finhistory-map-points",
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
    finhistoryQuest
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
        if (this.getCurGameStep.correctPoint - 1 == index) {
          this.isIncorrectPoint = false;
          this.$store.commit(
            "setFinhistoryGameStep",
            this.getFinhistory.gameStep + 1
          );
          this.cantClickOnPoints = true;
          this.$store.commit("addPointsCount", 10);
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
    getFinhistory() {
      return this.$store.getters.getFinhistory;
    },
    getMapPoints() {
      return this.getFinhistory.mapPoints;
    },
    getCurGameStep() {
      return this.getFinhistory.gameSteps[this.getFinhistory.gameStep];
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
        position: "bottom-right",
        customClass: notificationClass,
        showClose: false
      });
    },
    cantClickOnPoints() {
      console.log(arguments);
    }
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
.finquest-map-point-address {
  width: 210px !important;
}
.finquest-map {
  height: 88vh;
  //   margin-top: 10vh;
}
.finquest-map-point {
  max-width: 100px;
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