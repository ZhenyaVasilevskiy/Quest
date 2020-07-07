<template>
  <div class="finquest-welcome">
    <div class="finquest-box" id="finquest-box-welcome">
      <div class="finquest-box__body">
        <h1 class="finquest-box__title h1">Поздравляем, Вы стали жителем города Финград!</h1>
        <h2>Город поделён на 4 основных района, каждый из которых включает несколько станций:</h2>
        <div style="float: right">
          <img src="../../assets/images/finquest/map-with-points.png" alt />
        </div>
        <ul>
          <li>Район «Деньги в кошельке»</li>
          <li>Район «Деньги работают»</li>
          <li>Район «Деньги в банке»</li>
          <li>Район «Площадь права»</li>
        </ul>
        <p
          class="finquest-box__text"
        >Для вашего удобства все районы обозначены разными цветами, чтобы Вы понимали, что именно эти станции относятся к тому или иному району. Рассчитывайте своё время к концу игры Вы должны посетить все 14 станций.</p>

        <div style="display: flex; align-items: center; font-weight: bold;">
          <img src="../../assets/images/finquest/instructionImg1.png" alt />
          <span>14 станций</span>
        </div>

        <div style="float: right">
          <img src="../../assets/images/finquest/instructionImg3.png" alt />
        </div>
        <h3>У вас есть начальный капитал общих знаний - он равен 10 баллам.</h3>
        <div style="float: right">
          <img src="../../assets/images/finquest/instructionImg2.png" alt />
        </div>
        <p
          class="finquest-box__text"
        >В случае успешного выполнения заданий игры Ваш капитал знаний будет прирастать – сумма баллов будет увеличиваться, в случае ошибок или использования подсказок, к сожалению, уменьшаться.</p>
        <h3>
          Стоимость подсказок зависит от сложности задания, она может составлять
          <br />от 1 до 2 баллов.
        </h3>
        <p
          class="finquest-box__text"
        >Побеждает тот участник, который наберёт наибольшее количество баллов, в случае равного количества баллов – тот, кто потратит на прохождение всего маршрута игры наименьшее количество времени.</p>
        <router-link :to="{name: 'finquest-map-points'}" class="button button--xs button--green">
          <span>Начать игру</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "finquest-welcome"
};
</script>
<style scoped>
#finquest-box-welcome {
  position: fixed;
  width: 80%;
  height: 80%;
  left: 15%;
}

.finquest-box__title {
  color: #3dc479;
  font-size: 25px;
  text-align: center;
}
h2 {
  margin-top: 30px;
  font-size: 20px;
  font-weight: bold;
  /* text-align: center; */
}
ul {
  margin-top: 30px;
  list-style-type: disc;
  margin-left: 15px;
  font-size: 14px;
}
h3 {
  font-size: 14px;
  font-weight: bold;
}
</style>