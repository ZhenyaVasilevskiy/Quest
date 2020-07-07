
<template>
  <div class="finquest-reg" id="finquest-box-reg">
    <div class="finquest-box__body">
      <h1 class="finquest-box__title h1">
        Подача заявки
        <br/> на онлайн-квест «Финквест» </h1>


      <a href="t.txt" download="t.txt">xlsx - список участников</a><br>
      <a href="ref" onclick="download(resourse/t.txt)" >word - согласие на обработку</a><br>
      <a href="ref" onclick="download(resourse/t.txt)" >pdf - текст согласия</a><br>
    </div>
  </div>
</template>

<script>
export default {
  name: "finquest-zayavka",
  data() {
    return {
          };
  }
}
</script>

<style scoped>
#finquest-box-welcome {
  position: fixed;
  width: 80%;
  height: 80%;
  left: 15%;
}
</style>
