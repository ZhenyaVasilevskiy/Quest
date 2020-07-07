<template>
    <div class="finquest-modal-container" :class="{active: finquestModal}">
        <component :is="currentComponent"></component>
    </div>
</template>

<script>
export default {
    name: 'finquest-modals-component',
    data() {
        return {
        }
    },
    computed: {
        finquestModal() {
            return window.$finquestModal.value
        },
        currentComponent (){
            if(this.finquestModal) {
                return require('./' + this.finquestModal + '.vue').default;
                return this.finquestModal;
            } else {
                return null;
            }
        }
    }
}
</script>