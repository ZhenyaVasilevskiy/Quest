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
      <!-- <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSfszClcl_o8Q0Am7CeeGch0s1KfwQB9f8V-wCxuxy-GM30RVg/viewform"
        target="_blank"
        class="button--green button button--xs"
        @click="endGame()"
      >
        <span>Далее</span>
      </a>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "congratulation-ecologist",
  props: ["maxReward", "pointReward", "quest"],
  data() {
    return {
      rewardTypes: {
        finquest: {
          rang1: {
            rangName: "Благотворитель",
            rangImg: require("../../assets/images/congratulation-modals/rang1.png")
          },
          rang2: {
            rangName: "Эколог",
            rangImg: require("../../assets/images/congratulation-modals/rang2.png")
          },
          rang3: {
            rangName: "Финансист",
            rangImg: require("../../assets/images/congratulation-modals/rang3.png")
          },
          rang4: {
            rangName: "Финансист",
            rangImg: require("../../assets/images/congratulation-modals/rang4.png")
          }
        },
        finhistory: {
          rang1: {
            rangName: "Знаток финансовой истории города",
            rangImg: require("../../assets/images/congratulation-modals/finhistory/rang1.png")
          },
          rang2: {
            rangName: "Знатока финансовой истории города",
            rangImg: require("../../assets/images/congratulation-modals/finhistory/rang2.png")
          },
          rang3: {
            rangName: "Знатока финансовой истории города",
            rangImg: require("../../assets/images/congratulation-modals/finhistory/rang3.png")
          },
          rang4: {
            rangName: "Знатока финансовой истории города",
            rangImg: require("../../assets/images/congratulation-modals/finhistory/rang4.png")
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
    // pointReward() {
    //   return this.$store.getters.getPointReward;
    // },
    // maxRewardFinquest() {
    //   return this.$store.getters.getFinquestMaxReward;
    // },
    // maxRewardFinhistory() {
    //   return this.$store.getters.getFinhistoryMaxReward;
    // },
    getRang() {
      let rang = undefined;
      let rewardPercent = "";
      switch (this.quest) {
        case "finquest":
          rewardPercent = (this.pointReward * 100) / this.maxReward;
          if (rewardPercent >= 0 && rewardPercent <= 39) {
            rang = this.rewardTypes.finquest.rang1;
          } else if (rewardPercent >= 40 && rewardPercent <= 69) {
            rang = this.rewardTypes.finquest.rang2;
          } else if (rewardPercent >= 70 && rewardPercent <= 84) {
            rang = this.rewardTypes.finquest.rang3;
          } else if (rewardPercent > 100 && rewardPercent <= 85) {
            rang = this.rewardTypes.finquest.rang4;
          }
          break;
        case "finhistory":
          rewardPercent = (this.pointReward * 100) / this.maxReward;
          if (rewardPercent >= 0 && rewardPercent <= 39) {
            rang = this.rewardTypes.finhistory.rang1;
          } else if (rewardPercent >= 40 && rewardPercent <= 69) {
            rang = this.rewardTypes.finhistory.rang2;
          } else if (rewardPercent >= 70 && rewardPercent <= 84) {
            rang = this.rewardTypes.finhistory.rang3;
          } else if (rewardPercent >= 100 && rewardPercent <= 85) {
            rang = this.rewardTypes.finhistory.rang4;
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
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
}
</style>