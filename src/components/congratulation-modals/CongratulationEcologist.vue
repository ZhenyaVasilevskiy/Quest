<template>
  <div class="congratulation-modal-inner">
    <div class="congratulation-modal-box">
      <!-- <button type="button" class="hint-box__close" @click="closeModal">
        <img src="../../assets/images/icon-close.png" alt="close" />
      </button>-->
      <p class="h1">Поздравляем!</p>
      <p>
        Вы набрали баллов:
        <span class="fw-bold">{{pointReward}}</span> и получаете новый статус
      </p>
      <div class="congratulation-modal-box__rang rang--blue">{{getRang.rangName}}</div>
      <div class="congratulation-modal-box__image">
        <img :src="getRang.rangImg" alt="ecologist" />
      </div>
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSfszClcl_o8Q0Am7CeeGch0s1KfwQB9f8V-wCxuxy-GM30RVg/viewform"
        target="_blank"
        class="button--green button button--xs"
        @click="endGame()"
      >
        <span>Далее</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "congratulation-ecologist",
  data() {
    return {
      rewardTypes: {
        finquest: {
          rang1: {
            rangName: "Благотворитель",
            rangImg: require("../../assets/images/congratulation-modals/rang1.png")
          },
          rang2: {
            rangName: "Благотворитель",
            rangImg: require("../../assets/images/congratulation-modals/rang1.png")
          },
          rang3: {
            rangName: "Эколог",
            rangImg: require("../../assets/images/congratulation-modals/rang2.png")
          },
          rang4: {
            rangName: "Финансист",
            rangImg: require("../../assets/images/congratulation-modals/rang3.png")
          }
        },
        finhistory: {
          rang1: {
            rangName: "Знаток финансовой истории города",
            rangImg: require("../../assets/images/congratulation-modals/finhistory/rang1.png")
          },
          rang2: {
            rangName: "Благотворитель",
            rangImg: require("../../assets/images/congratulation-modals/finhistory/rang1.png")
          },
          rang3: {
            rangName:
              "Эксперт по взаимодействию с организациями-финансовыми регуляторами",
            rangImg: require("../../assets/images/congratulation-modals/finhistory/rang2.png")
          },
          rang4: {
            rangName: "Финансист",
            rangImg: require("../../assets/images/congratulation-modals/finhistory/rang3.png")
          }
        }
      }
    };
  },
  mounted: function() {
    this.$nextTick(() => {
      //   debugger;
    });
  },
  methods: {
    closeModal() {
      this.closeCongratulationModal();
    }
  },
  computed: {
    pointReward() {
      return this.$store.getters.getPointReward;
    },
    maxRewardFinquest() {
      return this.$store.getters.getFinquestMaxReward;
    },
    maxRewardFinhistory() {
      return this.$store.getters.getFinhistoryMaxReward;
    },
    getRang() {
      //   debugger;
      let rang = undefined;
      let rewardPercent = "";
      switch (this.$route.name) {
        case "finquest-map-points":
          rewardPercent = (this.pointReward * 100) / this.maxRewardFinquest;
          if (rewardPercent >= 0 && rewardPercent <= 39) {
            rang = this.rewardTypes.finquest.rang1;
          } else if (rewardPercent >= 40 && rewardPercent <= 69) {
            rang = this.rewardTypes.finquest.rang2;
          } else if (rewardPercent >= 70 && rewardPercent <= 84) {
            rang = this.rewardTypes.finquest.rang3;
          } else if (rewardPercent >= 100 && rewardPercent <= 85) {
            rang = this.rewardTypes.finquest.rang4;
          }
          break;
        case "finhistory-map-points":
          rewardPercent = (this.pointReward * 100) / this.maxRewardFinhistory;
          if (rewardPercent >= 0 && rewardPercent <= 39) {
            rang = this.rewardTypes.finhitory.rang1;
          } else if (rewardPercent >= 40 && rewardPercent <= 69) {
            rang = this.rewardTypes.finhitory.rang2;
          } else if (rewardPercent >= 70 && rewardPercent <= 84) {
            rang = this.rewardTypes.finhitory.rang3;
          } else if (rewardPercent > 100 && rewardPercent <= 85) {
            rang = this.rewardTypes.finhitory.rang4;
          }
          break;
      }

      return rang;
    }
  },
  methods: {
    endGame() {
      this.$router.push("/");
    }
  }
};
</script>
<style scoped>
.congratulation-modal-box {
  flex-direction: column;
}
</style>