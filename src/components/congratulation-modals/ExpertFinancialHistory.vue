<template>
    <div class="congratulation-modal-inner">
        <div class="congratulation-modal-box congratulation-modal-box--lg-img">
            <button type="button" class="hint-box__close" @click="closeModal">
                <img src="../../assets/images/icon-close.png" alt="close">
            </button>
            <div class="congratulation-modal-box__body">
                <p class="h1">Поздравляем!</p>
                <p>Вы набрали <span class="fw-bold">35 баллов</span> и получаете новый статус</p>
                <div class="congratulation-modal-box__rang rang--green">Знаток финансовой истории города</div>
            </div>
            <div class="congratulation-modal-box__image">
                <img src="../../assets/images/congratulation-modals/expert-financial-history.png" alt="expert-financial-history">
            </div>
        </div>    
    </div>
</template>

<script>
export default {
    name: 'expert-financial-history',
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