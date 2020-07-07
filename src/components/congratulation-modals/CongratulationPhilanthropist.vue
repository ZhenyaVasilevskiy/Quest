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
      <div class="congratulation-modal-box__rang rang--green">Благотворитель</div>
      <div class="congratulation-modal-box__image">
        <img src="../../assets/images/congratulation-modals/rang4.png" alt="philantropist" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "congratulation-philantropist",
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