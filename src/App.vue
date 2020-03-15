<template>
  <div id="app">
    <h1>Texto randômico</h1>
    <cite>Texto composto por maiúsculas, minúsculas, números e carateres especiais.</cite>
    <hr noshade>
    <p>{{ theString }}</p>
    <b-button
      type="button"
      class="btn-copy"
      variant="secondary"
      v-clipboard:copy="theString"
      @click="changeText()"
    >Copiar</b-button>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

export default {
  name: "App",
  data() {
    return {
      theString: "Seu texto apareçará aqui"
    };
  },
  methods: {
    rndStr(len) {
      let text = "";
      let chars =
        "abcdefghijklmnopqrstuvwxyz0123456789!@#$-={}[]?;:ABCDEFGHIJKLMNOPQRSTUVWYZ";

      for (let i = 0; i < len; i++) {
        text += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      return text;
    },
    changeText() {
      let btn = document.getElementsByClassName("btn-copy");
      btn[0].setAttribute("style", "font-weight: 600");
      btn[0].classList.add("success");
      btn[0].innerHTML = "Copiado!";

      const cp = setInterval(() => {
        clearInterval(cp);
        btn[0].setAttribute("style", "font-weight: 300");
        btn[0].classList.remove("success");
        btn[0].innerHTML = "Copiar";
      }, 1500);
    }
  },
  mounted() {
    setInterval(() => {
      let theString = this.rndStr(15);
      this.theString = theString;
    }, 5000);
  }
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

hr {
  border: 1px solid hsl(0, 0%, 83%) !important;
}

.btn-copy {
  &.success {
    color: #fff;
    background-color: #28a745;
    border-color: #28a745;
  }
}
</style>
