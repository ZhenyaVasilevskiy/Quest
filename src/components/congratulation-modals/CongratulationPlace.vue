<template>
    <div class="congratulation-modal-inner">
        <div class="congratulation-modal-box">
            <button type="button" class="hint-box__close" @click="closeModal">
                <img src="../../assets/images/icon-close.png" alt="close">
            </button>
            <p class="h1">Поздравляем!</p>
            <p>Вы заняли {{place}} место</p>
            <div class="congratulation-modal-box__image">
                <img src="../../assets/images/congratulation-modals/place.png" alt="place">
                <span class="congratulation-modal-box__place-name">{{imgPlace}}</span>
            </div>
        </div>    
    </div>
</template>

<script>
export default {
    name: 'congratulation-place',
    data() {
        return {
            place: 'четвертое',
            imgPlace: '4 место'
        }
    },
    methods: {
        closeModal() {
            this.closeCongratulationModal();
        }
    }
}
</script>