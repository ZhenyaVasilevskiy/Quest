<template>
    <div class="congratulation-modal-container" :class="{active: congratModal}">
        <component :is="currentComponent"></component>
    </div>
</template>

<script>
export default {
    name: 'congratulation-modal-component',
    data() {
        return {
        }
    },
    computed: {
        congratModal() {
            return window.$congratModal.value
        },
        currentComponent (){
            if(this.congratModal) {
                return require('./' + this.congratModal + '.vue').default;
                return this.congratModal;
            } else {
                return null;
            }
        }
    }
}
</script>