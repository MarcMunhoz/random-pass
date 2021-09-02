<template>
  <div id="app">
    <h1>Texto randômico</h1>
    <cite>Texto composto por maiúsculas, minúsculas, números e carateres especiais.</cite>
    <b-card class="w-75 mx-auto" border-variant="danger" header="O QUE SÃO SENHAS" header-bg-variant="success">
      <b-card-text
        >Esse emaranhado de letras, símbolos e números pode ser considerado o primeiro sistema de defesa ativo de um usuário de determinada plataforma. Com o avanço da tecnologia, faz-se necessário
        senhas mais difíceis de serem quebradas. Algumas dicas:
        <b-list-group class="mt-2">
          <b-list-group-item variant="secondary">
            Dê preferência a senhas sem referências ao mundo <em>real</em>. Exemplo do que <strong>não</strong> fazer: <del>casa-da-praia-em-maragogi</del>
          </b-list-group-item>
          <b-list-group-item variant="secondary">Combine letras, números e símbolos</b-list-group-item>
          <b-list-group-item variant="secondary">Caso guarde as senhas digitalmente, use sempre criptografia</b-list-group-item>
          <b-list-group-item variant="secondary">Troque as senhas regularmente</b-list-group-item>
          <b-list-group-item variant="secondary">Compartilhe suas senhas apenas com pessoas de sua total confiança</b-list-group-item>
        </b-list-group>
      </b-card-text>
      <p>Uma pequena ajuda, abaixo serão exibidas <em>strings</em> geradas de forma randômica. (entre os olhos). Cada 5 segundos uma nova <em>string</em> é gerada.</p>

      <p>
        <label for="passLen">Quantos carateres terá sua senha?</label>
        <input type="number" name="passLen" min="10" max="99" v-model="stringLen" />
      </p>
      <p class="font-weight-bolder shadow-sm">
        <b-icon icon="eye-slash-fill" />
        {{ theString }}
        <b-icon icon="eye-slash" />
      </p>
      <b-button type="button" class="btn-copy" variant="secondary" v-clipboard:copy="theString" @click="changeText()">Copiar</b-button>
    </b-card>

    <AppFooter />
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import AppFooter from "@/components/Footer";

export default {
  name: "App",
  data() {
    return {
      theString: "Seu texto apareçará aqui",
      stringLen: "10",
    };
  },
  components: {
    AppFooter,
  },
  methods: {
    rndStr(len) {
      let text = "";
      let chars = "abcdefghijklmnopqrstuvwxyz0123456789!@#$-={}[]?;:ABCDEFGHIJKLMNOPQRSTUVWYZ";

      for (let i = 0; i < len; i++) {
        text += chars.charAt(Math.floor(Math.random() * chars.length));
        //text = [...new Set(text)];
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
    },
  },
  mounted() {
    setInterval(() => {
      let theString = this.rndStr(this.stringLen);
      this.theString = theString;
    }, 5000);
  },
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

label {
  display: block;
  margin: 0 auto;
}

input {
  text-align: center;
}

cite {
  display: block;
  margin-bottom: 1em;
}

.btn-copy {
  &.success {
    color: #fff;
    background-color: #28a745;
    border-color: #28a745;
  }
}
</style>
