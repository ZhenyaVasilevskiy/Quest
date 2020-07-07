<template>
    <div class="congratulation-modal-inner">
        <div class="congratulation-modal-box">
            <button type="button" class="hint-box__close" @click="closeModal">
                <img src="../../assets/images/icon-close.png" alt="close">
            </button>
            <p class="h1">Поздравляем!</p>
            <p>Вы заняли третье место</p>
            <div class="congratulation-modal-box__image">
                <img src="../../assets/images/congratulation-modals/bronze.png" alt="bronze">
            </div>
        </div>    
    </div>
</template>

<script>
export default {
    name: 'congratulation-bronze',
    data() {
        return {
        }
    },
    methods: {
        closeModal() {
            this.closeCongratulationModal();
        }
    }
}
</script>