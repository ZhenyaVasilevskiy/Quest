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
        src="../../assets/images/finregulator/map-clear.png"
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
    <el-col :span="8" class="finnavigator-quest" v-if="!getCurGameStep.isQuestion">
      <el-row type="flex">
        <el-col :span="8">
          <img :src="require(`../../assets/images/finregulator/${getCurGameStep.icon}`)" alt />
        </el-col>
        <el-col :span="18">
          <p class="questText" v-html="getCurGameStep.text"></p>
          <p class="questPerson" v-html="getCurGameStep.questionName"></p>
        </el-col>
      </el-row>
      <el-col :span="24">
        <ul class="questionList">
          <li
            v-for="(item, itemKey) in getCurGameStep.questionList"
            :key="'questionListElement' + itemKey"
            v-html="item"
          ></li>
        </ul>
      </el-col>
    </el-col>
    <finregulatorQuest
      :gameStep="getCurGameStep"
      @complete="cantClickOnPoints = false"
      v-else-if="getCurGameStep.isQuestion"
    ></finregulatorQuest>
  </el-row>
</template>

<script>
import { mapState } from "vuex";
import finregulatorQuest from "./FinregulatorQuest.vue";
export default {
  name: "finregulator-map-points",
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
    finregulatorQuest
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
            "setFinregulatorGameStep",
            this.getFinregulator.gameStep + 1
          );
          this.cantClickOnPoints = true;
        } else {
          this.isIncorrectPoint = true;
          this.cantClickOnPoints = false;
          this.$store.commit("minusPointsCount", 1);
          this.$alert(
            `<h1 style="text-align: center; font-size: 2.5rem;">
                К сожалению,<br> это неправильный ответ.<br> Попробуйте еще раз! 
            </h1>
            <p style='text-align: center;'>Вы потеряли 1 балл</p>
                <img src="${require("../../assets/images/finregulator/incorrectStation.png")}" style="width: 40%; margin: 0 auto; display: block;">`,
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
    getFinregulator() {
      return this.$store.getters.getFinregulator;
    },
    getMapPoints() {
      return this.getFinregulator.mapPoints;
    },
    getCurGameStep() {
      return this.getFinregulator.gameSteps[this.getFinregulator.gameStep];
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
.finnavigator-quest {
  position: fixed;
  right: 5vw;
  bottom: 0;
  top: 25vh;
  background-color: #fff;
  height: 70vh;
  box-shadow: 2px 0 8px #dceffa;
  padding: 30px;
}
.questText,
.questionList {
  line-height: 20px;
  font-weight: bold;
  font-size: 13px;
}
.questPerson {
  margin-top: 10px;
  font-weight: bold;
  font-size: 13px;
  color: #5a60c5;
}
.questionList {
  list-style-type: none;
}
</style>