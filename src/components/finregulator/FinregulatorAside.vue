<template>
    <div class="finhistory-aside-wrap">
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'finhistory-aside',
    data: function() {
		return {
		}
    }
}
</script>
