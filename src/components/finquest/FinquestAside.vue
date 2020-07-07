<template>
    <div class="finquest-aside-wrap">
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'finquest-aside',
    data: function() {
		return {
		}
    }
}
</script>
