<template>
  <div class="finquest-cab" id="finquest-box-cab">
    <div class="finquest-box__body">
      <h1 class="finquest-box__title h1">
        Личный кабинет участника
         </h1>

<br>
      <table class="table table-hover">

        <tbody>
          <tr>
            <td>Округ</td>
            <td>XXXXXXXXXXXXXXXX</td>
          </tr>

          <tr>
            <td colspan="1">Город</td>
            <td>ХХХХХХХХХХХХХХХХ</td>
          </tr>
          <tr>
            <td colspan="1">УО</td>
            <td>ХХХХХХХХХХХХХХХХ</td>
          </tr>
          <tr>
            <td colspan="1">Класс</td>
            <td>ХХХХХХХХХХХХХХХХ</td>
          </tr>

        </tbody>
      </table>
      <ul class="list-group">
  <li class="list-group-item disabled">Первоесоглашение которое нужно подписать <div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
  <label class="form-check-label" for="inlineCheckbox1">Подписать</label>
</div></li>
  <li class="list-group-item">Если нужно,соглашения можно вынести в отдельные окна <div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
  <label class="form-check-label" for="inlineCheckbox1">Подписать</label>
</div></li>
  <li class="list-group-item">Тут еще соглашения <div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
  <label class="form-check-label" for="inlineCheckbox1">Подписать</label>
</div></li>
    <li class="list-group-item">Тт еще соглашения <div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
    <label class="form-check-label" for="inlineCheckbox1">Подписать</label>
  </div></li>
      <li class="list-group-item">Тут еще соглашения <div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
      <label class="form-check-label" for="inlineCheckbox1">Подписать</label>
    </div></li>
</ul>
<router-link :to="{name: 'finhistory-rules'}" class="button button--xs button--green">
  <span>Продолжить</span>
</router-link>


    </div>
  </div>
</template>

<script>
export default {
  name: "finquest-cab",
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
