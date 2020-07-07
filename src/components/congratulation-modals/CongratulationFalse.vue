<template>
    <div class="congratulation-modal-inner">
        <div class="congratulation-modal-box congratulation-modal-box--error">
            <button type="button" class="hint-box__close" @click="closeModal">
                <img src="../../assets/images/icon-close.png" alt="close">
            </button>
            <p class="h2">Увы! Вы ответили неверно</p>
        </div>    
    </div>
</template>

<script>
export default {
    name: 'congratulation-false',
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