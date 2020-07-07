<template>
  <div class="finhistory-box">
    <div class="finhistory-box__body">
      <img src="../../assets/images/finnavigator/comix/comix0.png" alt />
      <router-link :to="{name: 'finhistory-map-points'}" class="button button--xs button--green">
        <span>Начать игру</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "finnavigator-rules"
};
</script>