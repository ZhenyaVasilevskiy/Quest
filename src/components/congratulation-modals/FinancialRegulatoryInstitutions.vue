<template>
  <div class="congratulation-modal-inner">
    <div class="congratulation-modal-box">
      <button type="button" class="hint-box__close" @click="closeModal">
        <img src="../../assets/images/icon-close.png" alt="close" />
      </button>
      <p class="h1">Поздравляем!</p>
      <p>
        Вы набрали
        <span class="fw-bold">35 баллов</span> и получаете новый статус
      </p>
      <div
        class="congratulation-modal-box__rang rang--violet"
      >Эксперт по финансово-регулирующим учреждениям</div>
      <div class="congratulation-modal-box__image">
        <img
          src="../../assets/images/congratulation-modals/financial-regulatory-institutions.png"
          alt="financial-regulatory-institutions"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "financial-regulatory-institutions",
  data() {
    return {};
  },
  methods: {
    closeModal() {
      this.closeCongratulationModal();
    }
  }
};
</script>