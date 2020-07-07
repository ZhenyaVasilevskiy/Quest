<template>
    <svg width="1em" height="1em" :class="`icon icon-${name}`">
        <use :xlink:href="`${symbols}#icon-${name}`"></use>
    </svg>
</template>

<script>
export default {
    name: 'icons',
    props: {
        name: {
            required: true
        }
    },
    data() {
        return {
            symbols: require('../assets/images/svg/symbol-defs.svg')
        }
    }
}
</script>