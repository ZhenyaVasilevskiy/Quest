<template>
  <div style="height: 80vh; overflow: auto">
    <img :src="src" alt />
  </div>
</template>

<script>
export default {
  name: "openRollup",
  props: ["src"],
  mounted: function() {},
  data() {
    return {};
  },
  methods: {},
  computed: {},
  destroyed: function() {}
};
</script>
