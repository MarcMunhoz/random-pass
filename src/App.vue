<template>
  <div id="app">
    <h1>Texto randômico</h1>
    <cite>Texto composto por maiúsculas, minúsculas, números e carateres especiais.</cite>
    <div class="card border border-danger mx-auto w-75">
      <div class="card-header fw-bold text-light bg-success">O QUE SÃO SENHAS</div>
      <div class="card-body">
        <div class="card-text">
          Esse emaranhado de letras, símbolos e números pode ser considerado o primeiro sistema de defesa ativo de um usuário de determinada plataforma. Com o avanço da tecnologia, faz-se necessário
          senhas mais difíceis de serem quebradas. Algumas dicas:
          <ul class="list-group my-2">
            <li class="list-group-item list-group-item-secondary">
              Dê preferência a senhas sem referências ao mundo <em>real</em>. Exemplo do que <strong>não</strong> fazer: <del>casa-da-praia-em-maragogi</del>
            </li>
            <li class="list-group-item list-group-item-secondary">Combine letras, números e símbolos</li>
            <li class="list-group-item list-group-item-secondary">Caso guarde as senhas digitalmente, use sempre criptografia</li>
            <li class="list-group-item list-group-item-secondary">Troque as senhas regularmente</li>
            <li class="list-group-item list-group-item-secondary">Compartilhe suas senhas apenas com pessoas de sua total confiança</li>
          </ul>

          <p>
            <i class="bi-alarm" style="font-size: 2rem; color: cornflowerblue;"></i>Uma pequena ajuda, abaixo serão exibidas <em>strings</em> geradas de forma randômica. (entre os olhos). Cada 5
            segundos uma nova <em>string</em> é gerada.
          </p>

          <p>
            <label for="passLen" class="d-block">Quantos carateres terá sua senha?</label>
            <input type="number" name="passLen" min="10" max="99" v-model="stringLen" />
          </p>

          <p class="font-weight-bolder shadow-sm">
            <component :is="icon.ico" :class="icon.class" />
            {{ theString }}
            <component :is="icon.ico" :class="icon.class" />
          </p>

          <button type="button" class="btn btn-secondary copy" @click="doCopy">Copiar</button>
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script>
import { BIconEye, BIconEyeFill } from "bootstrap-icons-vue";
import AppFooter from "@/components/Footer";

export default {
  name: "App",
  data() {
    return {
      theString: "Seu texto apareçará aqui",
      stringLen: "10",
      icon: {
        ico: "BIconEye",
        class: String,
      },
    };
  },
  components: {
    AppFooter,
    BIconEye,
    BIconEyeFill,
  },
  methods: {
    rndStr(len) {
      let text = "";
      let chars = "abcdefghijklmnopqrstuvwxyz0123456789!@#$-={}[]?;:ABCDEFGHIJKLMNOPQRSTUVWYZ";

      for (let i = 0; i < len; i++) {
        text += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      return text;
    },
    doCopy: function() {
      this.$copyText(this.theString).then(
        () => {
          this.changeText();
        },
        () => {
          alert("O texto não pôde ser copiado!");
        }
      );
    },
    changeText() {
      const btn = document.getElementsByClassName("copy");
      btn[0].setAttribute("style", "font-weight: 600");
      btn[0].classList.add("btn-success");
      btn[0].innerHTML = "Copiado!";
      this.icon.ico = "BIconEyeFill";
      this.icon.class = "text-success";

      const cp = setInterval(() => {
        clearInterval(cp);
        btn[0].setAttribute("style", "font-weight: 300");
        btn[0].classList.remove("btn-success");
        btn[0].innerHTML = "Copiar";
        this.icon.ico = "BIconEye";
        this.icon.class = "";
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
</style>
