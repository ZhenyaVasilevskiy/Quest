<template>
  <div class="finhistory-welcome">
    <div class="finhistory-video">
      <div class="finhistory-video__content">
        <p class="finhistory-video__subtitle">Видеообращение к участникам онлайн-Финквеста от</p>
        <p class="finhistory-video__title">Александра Аузана</p>
        <p
          class="finhistory-video__position"
        >Декана экономического факультета МГУ им. М.В. Ломоносова</p>
        <button type="button" class="button button--xs button--green">
          <v-icons name="play"></v-icons>
          <span>Смотреть</span>
        </button>
      </div>
      <div class="finhistory-video__img">
        <img src="../../assets/images/finhistory/video-person.png" alt="person" />
      </div>
    </div>
    <div class="finhistory-box">
      <div class="finhistory-box__body">
        <h1 class="finhistory-box__title h1">Добро пожаловать в Финквест!</h1>
        <p
          class="finhistory-box__text"
        >Появление эффективного онлайн-инструмента Проекта для детей и молодежи, помогающего оттачиванию практических навыков и компетенций, связанных с финансовой инфраструктурой города, типичными повседневными финансовыми ситуациями.</p>
        <router-link :to="{name: 'finhistory-rules'}" class="button button--xs button--green">
          <span>Продолжить</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "finnavigator-welcome"
};
</script>