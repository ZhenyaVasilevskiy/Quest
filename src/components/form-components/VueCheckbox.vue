<template>
  <label class="checkbox-item" :for="id" :class="{'checkbox--disabled': disabled}">
    <input
      :id="id"
      :name="name"
      v-validate="rules"
      type="checkbox"
      :disabled="disabled"
      :checked="checked"
      class="checkbox-item__input"
      @change="$emit('change', $event)"
    />
    <span class="checkbox-item__box">
      <v-icons name="tick"></v-icons>
    </span>
    <span class="checkbox-item__txt">{{checkTxt}}</span>
  </label>
</template>

<script>
export default {
  name: "v-checkbox",
  props: {
    value: {},
    disabled: false,
    checked: false,
    scope: {},
    id: {
      type: String,
      required: true
    },
    rules: {},
    name: {
      type: String,
      required: true
    },
    checkTxt: {
      type: String,
      required: true
    }
  },
  inject: ["$validator"],
  data: () => ({})
};
</script>


