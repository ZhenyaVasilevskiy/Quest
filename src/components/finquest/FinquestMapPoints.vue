<template>
  <div class="finquest-map-points-wrap">
    <div class="finquest-map-points">
      <div class="finquest-area-label dengi-v-koshelke" @click="openAreaModal(1)">
        ДЕНЬГИ
        <br />В КОШЕЛЬКЕ
      </div>
      <div class="finquest-area-label dengi-rabotaut" @click="openAreaModal(2)">
        ДЕНЬГИ
        <br />РАБОТАЮТ
      </div>
      <div class="finquest-area-label dengi-v-banke" @click="openAreaModal(3)">
        ДЕНЬГИ
        <br />В БАНКЕ
      </div>
      <div class="finquest-area-label ploshad-prava" @click="openAreaModal(4)">
        ПЛОЩАДЬ
        <br />ПРАВА
      </div>
      <img src="../../assets/images/finquest/map-clear.png" alt="finquest-map" class="finquest-map" />
      <div
        class="map-dog"
        :style="finquestDog.styles"
        :class="{ 'in-move': inMove, 'is-visible': pointAppear }"
      >
        <img :src="finquestDog.icon" alt="map-dog" class="map-dog-img" />
      </div>
      <div
        v-for="(point, index) in mapPoints"
        :key="`point` + index"
        class="finquest-map-point-wrapper"
      >
        <button
          type="button"
          class="finquest-map-point"
          :disabled="point.styles.disabled"
          :class="{ 'is-visible': pointAppear }"
          :style="point.styles"
          @click="goToPoint(index)"
        >
          <img :src="point.icon" alt="point" />
        </button>
        <div class="finquest-map-point-address" :style="point.addressImgStyles">
          <img :src="point.addressImg" alt="point" />
        </div>
      </div>
    </div>
    <!-- <div class="finquest-map-list-wrap">
      <div class="finquest-map-list">
        <div class="finquest-map-list__item">
          <button
            type="button"
            class="finquest-map-list__btn finquest-map-list__btn--blue"
            @click="toggleShowOptionsThird"
          >
            <span class="finquest-map-list__btn__title">Район</span>
            <span class="finquest-map-list__btn__name">
              <img src="../../assets/images/finquest/money-in-wallet.png" alt="bank" />
              Деньги в кошельке
            </span>
            <div class="finquest-map-list__btn__chevron">
              <v-icons name="chevron"></v-icons>
            </div>
          </button>
          <v-slide-up-down :active="showOptionsThird">
            <div class="finquest-map-list__table">
              <div class="finquest-map-list__table__header">
                <div class="finquest-map-list__table__col lg-col">
                  <span>Улица</span>
                </div>
                <div class="finquest-map-list__table__col lg-col">
                  <span>Станция</span>
                </div>
                <div class="finquest-map-list__table__col sm-col">
                  <span>Баллы</span>
                </div>
              </div>
              <div class="finquest-map-list__table__body">
                <button
                  v-for="(item, itemKey) in map[0]"
                  :key="'itemMap' + itemKey"
                  type="button"
                  class="finquest-map-list__table__row"
                  :disabled="item.disabled"
                  @click="goToPoint(item.point)"
                >
                  <div class="finquest-map-list__table__col lg-col">
                    <span>{{item.address}}</span>
                  </div>
                  <div class="finquest-map-list__table__col lg-col">
                    <span>{{item.name}}</span>
                  </div>
                  <div class="finquest-map-list__table__col sm-col">
                    <span>{{item.result}}</span>
                  </div>
                </button>
              </div>
            </div>
          </v-slide-up-down>
        </div>
        <div class="finquest-map-list__item">
          <button
            type="button"
            class="finquest-map-list__btn finquest-map-list__btn--green"
            @click="toggleShowOptionsSecond"
          >
            <span class="finquest-map-list__btn__title">Район</span>
            <span class="finquest-map-list__btn__name">
              <img src="../../assets/images/finquest/money-works.png" alt="bank" />
              Деньги работают
            </span>
            <div class="finquest-map-list__btn__chevron">
              <v-icons name="chevron"></v-icons>
            </div>
          </button>
          <v-slide-up-down :active="showOptionsSecond">
            <div class="finquest-map-list__table">
              <div class="finquest-map-list__table__header">
                <div class="finquest-map-list__table__col lg-col">
                  <span>Улица</span>
                </div>
                <div class="finquest-map-list__table__col lg-col">
                  <span>Станция</span>
                </div>
                <div class="finquest-map-list__table__col sm-col">
                  <span>Баллы</span>
                </div>
              </div>
              <div class="finquest-map-list__table__body">
                <button
                  v-for="(item, itemKey) in map[1]"
                  :key="'itemMap' + itemKey"
                  type="button"
                  class="finquest-map-list__table__row"
                  :disabled="item.disabled"
                  @click="goToPoint(item.point)"
                >
                  <div class="finquest-map-list__table__col lg-col">
                    <span>{{item.address}}</span>
                  </div>
                  <div class="finquest-map-list__table__col lg-col">
                    <span>{{item.name}}</span>
                  </div>
                  <div class="finquest-map-list__table__col sm-col">
                    <span>{{item.result}}</span>
                  </div>
                </button>
              </div>
            </div>
          </v-slide-up-down>
        </div>
        <div class="finquest-map-list__item">
          <button
            type="button"
            class="finquest-map-list__btn finquest-map-list__btn--violet"
            @click="toggleShowOptionsFirst"
          >
            <span class="finquest-map-list__btn__title">Район</span>
            <span class="finquest-map-list__btn__name">
              <img src="../../assets/images/finquest/money-in-bank.png" alt="bank" />
              Деньги в банке
            </span>
            <div class="finquest-map-list__btn__chevron">
              <v-icons name="chevron"></v-icons>
            </div>
          </button>
          <v-slide-up-down :active="showOptionsFirst">
            <div class="finquest-map-list__table">
              <div class="finquest-map-list__table__header">
                <div class="finquest-map-list__table__col lg-col">
                  <span>Улица</span>
                </div>
                <div class="finquest-map-list__table__col lg-col">
                  <span>Станция</span>
                </div>
                <div class="finquest-map-list__table__col sm-col">
                  <span>Баллы</span>
                </div>
              </div>
              <div class="finquest-map-list__table__body">
                <button
                  v-for="(item, itemKey) in map[2]"
                  :key="'itemMap' + itemKey"
                  type="button"
                  class="finquest-map-list__table__row"
                  :disabled="item.disabled"
                  @click="goToPoint(item.point)"
                >
                  <div class="finquest-map-list__table__col lg-col">
                    <span>{{item.address}}</span>
                  </div>
                  <div class="finquest-map-list__table__col lg-col">
                    <span>{{item.name}}</span>
                  </div>
                  <div class="finquest-map-list__table__col sm-col">
                    <span>{{item.result}}</span>
                  </div>
                </button>
              </div>
            </div>
          </v-slide-up-down>
        </div>
      </div>
      <div class="finquest-map-list finquest-map-list-general">
        <button
          v-for="(item, itemKey) in map[3]"
          :key="'itemMap' + itemKey"
          type="button"
          class="finquest-map-list-general__item"
          :disabled="item.disabled"
          @click="goToPoint(item.point)"
        >
          <div class="finquest-map-list__table__col lg-col">
            <span>{{item.address}}</span>
          </div>
          <div class="finquest-map-list__table__col lg-col">
            <span>{{item.name}}</span>
          </div>
          <div class="finquest-map-list__table__col sm-col">
            <span>{{item.result}}</span>
          </div>
        </button>
      </div>
    </div>-->
    <v-finquest-modals></v-finquest-modals>
    <v-hint-modal></v-hint-modal>
    <v-congratulation-modal></v-congratulation-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "finquest-map-points",
  data() {
    return {
      testDrag1: [{ name: "testDrug1" }],
      testDrag2: [0, 0, 0],
      showOptionsFirst: false,
      showOptionsSecond: false,
      showOptionsThird: false,
      inMove: false,
      pointAppear: false,
      finquestDog: {
        icon: require("../../assets/images/finquest/finquest-dog.png"),
        styles: {
          top: "40%",
          left: "35%"
        }
      }
    };
  },
  methods: {
    drag(ev) {
      ev.dataTransfer.setData("indexFrom", ev.target.dataset.index);
    },
    allowDrop(ev) {
      ev.preventDefault();
    },
    drop(ev) {
      ev.preventDefault();
      let indexFrom = ev.dataTransfer.getData("indexFrom");
      this.$set(
        this.testDrag2,
        ev.currentTarget.dataset.index,
        this.testDrag1[indexFrom].name
      );
    },
    goToPoint(index) {
      if (this.inMove) return;
      let curPoint = this.mapPoints[index];
      this.finquestDog.styles.top =
        // +curPoint.styles.top.replace("%", "") + 2 + "%";
        curPoint.styles.top;
      this.finquestDog.styles.left =
        // +curPoint.styles.left.replace("%", "") + 2 + "%";
        curPoint.styles.left;
      this.inMove = true;
      this.$store.dispatch("initChangePoint", true);
      this.$store.dispatch("initHintText", curPoint.hintText);
      setTimeout(() => {
        this.inMove = false;
        this.openFinquestModal(curPoint.modalComponentName);
      }, 1600);
    },
    toggleShowOptionsFirst() {
      this.showOptionsFirst = !this.showOptionsFirst;
    },
    toggleShowOptionsSecond() {
      this.showOptionsSecond = !this.showOptionsSecond;
    },
    toggleShowOptionsThird() {
      this.showOptionsThird = !this.showOptionsThird;
    },
    openAreaModal(areaNumber) {
      this.openCongratulationModal("FinquestAreaModal" + areaNumber);
    }
  },
  beforeDestroy() {
    this.$store.dispatch("initChangePoint", false);
    this.$store.dispatch("initHintText", null);
    this.closeFinquestModal();
    this.closeHintModal();
    this.closeCongratulationModal();
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
  computed: {
    ...mapState(["pointsCount"]),
    mapPoints() {
      return this.$store.getters.getMapPoints;
    },
    getFirstInArea1() {
      return this.$store.getters.getFirstInArea1;
    },
    getFirstInArea2() {
      return this.$store.getters.getFirstInArea2;
    },
    getFirstInArea3() {
      return this.$store.getters.getFirstInArea3;
    },
    getFirstInArea4() {
      return this.$store.getters.getFirstInArea4;
    },
    map() {
      return this.$store.getters.getMap;
    },
    isCompleteFinquest() {
      return this.$store.getters.isCompleteFinquest;
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
    isCompleteFinquest: function(newValue, oldValue) {
      //   console.log(arguments);
      this.$store.commit("setFinquestIsComplete", true);
      this.openCongratulationModal("CongratulationEcologist");
      //   debugger;
    }
  }
};
</script>

<style>
/* .finquest-map-points-wrap {
  transform: scale(0.8) translate(0, -100px);
} */

.animationQueue3 {
  height: 98% !important;
}
</style>