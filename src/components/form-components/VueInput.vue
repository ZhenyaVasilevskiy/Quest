<template>
    <input :id="id" :name="name" v-validate="['required', 'max:1']" type="checkbox" class="form-control form-control-sm">
</template>

<script>
    export default {
        name: 'v-input',
        props: {
            value: {

            },
            scope: {

            },
            name: {
                type: String,
                required: true
            },
            id: {
                type: String,
                required: true
            },
            rules: {

            },
        },
        inject: ['$validator'],
        data: () => ({

        })
    };
</script>


