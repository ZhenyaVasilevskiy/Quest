<template>
    <div class="stopwatch-block">
        <v-icons name="stopwatch"></v-icons>
		<span>{{getMinutes}}:{{getSeconds}}</span>
	</div>

</template>

<script>
export default {
    name: 'stopwatch',
    data() {
        return {
            timer: null,
            time: 0
        }
    },
    computed: {
        getMinutes() {
            return parseInt(this.time / 60) >= 10 ? parseInt(this.time / 60) : '0'+parseInt(this.time / 60)
        },
        getSeconds() {
            return this.time % 60 >= 10 ? this.time % 60 : '0'+this.time % 60
        },
    },
    methods: {
        start() {
            this.timer = setInterval(() => {
                this.time += 1
            }, 1000)
        },
        stop() {
            clearInterval(this.timer)
        }
    },
    mounted() {
        this.start()
    },
    beforeDestroy() {
        console.log('time spent on quest --- ' + this.getMinutes + ' minutes and ' + this.getSeconds + ' seconds')
        this.stop();
    }
}
</script>
