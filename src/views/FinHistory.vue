<template>
  <section class="section-finquest">
    <div class="welocme-message">
      <div class="welocme-message-inner">
        <img src="../assets/images/finhistory/papper.png" />
        <div class="welocme-message-text">
          <!-- <h1 class="welocme-message-title">Вступление</h1> -->
          <p
            class="welocme-message-p"
          >Петербург – голова России, Москва – её сердце, а Нижний Новгород – её карман. Так в XIX веке стали говорить о городе, расположенном на слиянии двух великих русских рек – Оки и Волги. Зарабатывать деньги в Нижнем Новгороде действительно умели: именно здесь жили богатейшие купеческие династии – Блиновы, Бугровы, Рукавишниковы, которые были известны не только своим мастерством сколачивать огромные капиталы, но и благотворительностью – купечество жертвовало немалые суммы денег на нужды города и в поддержку искусства. А знаменитая Нижегородская ярмарка собирала сотни тысяч торговцев со всех концов света!</p>
          <p
            class="welocme-message-p"
          >В 1896 году именно на Нижегородской ярмарке прошла грандиознейшая в истории нашей страны Всероссийская промышленная и художественная выставка – честь для нестоличного города небывалая! Огромную роль в организации выставки сыграл Николай Михайлович Баранов, губернатор Нижнего Новгорода с 1882 по 1897 год. Старожилы поговаривали, что губернатор владел секретом финансового успеха – недаром город так разбогател за время его службы.</p>
          <p
            class="welocme-message-p"
          >И вот – небывалая удача! Недавно в одном из павильонов ярмарки нашли настоящее сокровище – дневники Николая Михайловича. Да вот только просто так тайна дневников никому не откроется – тут уж придётся потрудиться!</p>
          <p
            class="welocme-message-p"
          >В каждой записи губернатор зашифровал ключи, которые приведут искателей к местам в городе, где их будут ждать задания. Лишь тот, кто разгадает все ключи, найдёт все точки и правильно выполнит предложенные задания, а самое главное – сделает это быстрее всех, откроет тайну. Удачи!</p>
        </div>
      </div>
      <router-link
        :to="{name: 'finhistory-map-points'}"
        class="button button--xs button--green startGameBtn"
      >
        <span>Начать игру</span>
      </router-link>
    </div>
    <!-- <div class="aside-wrap">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>-->
  </section>
</template>

<script>
export default {
  name: "FinHistory",
  data: function() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.startGameBtn {
  margin-top: 10px;
  position: absolute;
  bottom: 10vh;
  font-family: "Times New Roman", cursive;
  font-style: italic;
  font-weight: 600;
  color: #000 !important;
  border: 1px solid;
  background-color: transparent !important;
  border-image-slice: 42 42 42 42;
  border-image-width: 42px 42px 42px 42px;
  border-image-outset: 0px 0px 0px 0px;
  border-image-repeat: round round;
  border-image-source: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL4AAAA+CAMAAACiGlF3AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAUdQTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzQoxCwAAAG10Uk5T/wkFAAGZAw8sKHrlUBmPf8EGBwzNEXY8v5vxtiMUiVvtFQoTaB1tYTJpCAI7zzoW+yUQKWYbNYYq2LUNGiAkQUlfoCdFSEOx79SpvAsEEroXNtajYB9VPSEOSzOcMINHJjEr4VrEHnVl8zdYNMQUSagAAAJUSURBVHic7dpZV9NAGIDhbxaS1mprBurCUgRM6UKtFRVKaSkuxSVB3NBWVMQNl/9/7cy0cJAcFeeC76Rn3oukzDTJc4a0vQkAoYxxwkcYY46bgL+XPHhxJjKVgrPnIJ057zmCjDIGY1kPLly8ROEyH++/Y2JSbqbUJXLTeuDKzKxH6dzgBFd9yOsXvt7OF4r/wKhKkl5ekBdYKPPZyYoeu9afmj/B4b9VvV6TW3rDK/HFm7fgNgArAHiJKbIkx5drtcH76v1dHkYFXaHpwejh0hzMnyTB5UrpGoxTWAWoQLO1DLDWbjX/x64V61XXrVEqWPLO3XsZcPh9AHlWaHagED1kY1EuPn0ADx8dHW0//tMl3OgQDUIW0zR/dQ2bYZriO3wTm2Ga4ifZE2yGaYq/FQI2wzTF92ccbIZpiv/U5dgM0xSfFGN98wjxDJthmubDc2yGafpnixBshmmK/+Kli80wTfG3IdYfXUj72AzTlL7+KovNME3xU6+72AzT9L3Ti/W9n4j5R9fykVL2Nxux5sd89S0fq2HgT+9gM0zT/PF4r34u3vy38eZvL2EzTBuGbx7LR8ryMbN8zCwfM8vHzPIxs3zMLB8zy8fM8jGzfMwsH7Ph4J9yW0G3o540rUNG/70DjTInAqAYMsbLEHheSAL/+GHveqcNjfRebRok2M3JfepDVj95226px9H4ygQVzepeSAmlZU+IMTn18cixOQTv8ToA+S580gv5+Uvyq9rvb4ZCOM5cyHt7Xthyd7+VKHWa9Luca/9Q/6FK5DyFn/t6/ws54aaCA4tKhQAAAABJRU5ErkJggg==");
  background-size: contain;
  width: 120px;
  height: 42px;
  transition: 0.3s;
}
.startGameBtn:hover {
  background-color: #3dc479 !important;
  color: #fff !important;
}
.section-finquest {
  padding: 0;
}
.welocme-message {
  bottom: 0;
  //   height: calc(90vh - 50px);
  height: 90vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    height: 90vh;
    // height: calc(85vh - 50px);
  }
}
.welocme-message-inner {
  position: relative;
}
.welocme-message-text {
  position: absolute;
  top: 15%;
  left: 10%;
  //   right: 0;
  width: 80%;

  &::first-letter {
    font-size: 3em;
    font-family: "Times New Roman", cursive;
    margin-top: 10px;
  }
  .welocme-message-title {
    text-align: center;
  }
  .welocme-message-p {
    text-indent: 2%;
    font-size: 15px;
    color: #17151b;
    line-height: 23px;
    margin-bottom: 10px;
  }
}
</style>
