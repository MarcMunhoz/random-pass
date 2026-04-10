<template>
  <section class="card border-0 shadow-sm h-100 config-card">
    <div class="card-body p-4">
      <h2 class="h5 fw-bold mb-3">Configurações</h2>

      <label for="passLen" class="form-label fw-semibold">Tamanho da senha</label>
      <div class="input-group mb-2">
        <span class="input-group-text">#</span>
        <input
          id="passLen"
          type="number"
          class="form-control"
          name="passLen"
          :min="minPasswordLength"
          max="99"
          :value="stringLen"
          @input="onNumberInput('update:string-len', $event)"
        />
      </div>
      <small class="text-secondary d-block mb-4">Mínimo atual: {{ minPasswordLength }}</small>

      <h3 class="h6 fw-bold mb-3">Tipos de caracteres</h3>
      <div class="d-grid gap-2 mb-4">
        <div class="form-check form-switch">
          <input id="opt-lowercase" class="form-check-input" type="checkbox" role="switch" :checked="includeLowercase" @change="onBooleanInput('update:include-lowercase', $event)" />
          <label class="form-check-label" for="opt-lowercase">Letras minúsculas</label>
        </div>
        <div class="form-check form-switch">
          <input id="opt-uppercase" class="form-check-input" type="checkbox" role="switch" :checked="includeUppercase" @change="onBooleanInput('update:include-uppercase', $event)" />
          <label class="form-check-label" for="opt-uppercase">Letras maiúsculas</label>
        </div>
        <div class="form-check form-switch">
          <input id="opt-numbers" class="form-check-input" type="checkbox" role="switch" :checked="includeNumbers" @change="onBooleanInput('update:include-numbers', $event)" />
          <label class="form-check-label" for="opt-numbers">Numerais</label>
        </div>
        <div class="form-check form-switch">
          <input
            id="opt-specials"
            class="form-check-input"
            type="checkbox"
            role="switch"
            :checked="includeSpecialChars"
            @change="onBooleanInput('update:include-special-chars', $event)"
          />
          <label class="form-check-label" for="opt-specials">Caracteres especiais</label>
        </div>
      </div>

      <div class="row g-3">
        <div v-if="includeNumbers" class="col-sm-6">
          <label for="numbersCount" class="form-label mb-1">Qtd. numerais</label>
          <input
            id="numbersCount"
            type="number"
            class="form-control"
            min="1"
            max="99"
            :value="numbersCount"
            @input="onNumberInput('update:numbers-count', $event)"
          />
        </div>
        <div v-if="includeSpecialChars" class="col-sm-6">
          <label for="specialCharsCount" class="form-label mb-1">Qtd. especiais</label>
          <input
            id="specialCharsCount"
            type="number"
            class="form-control"
            min="1"
            max="99"
            :value="specialCharsCount"
            @input="onNumberInput('update:special-chars-count', $event)"
          />
        </div>
      </div>

      <button type="button" class="btn btn-success w-100 mt-4" @click="$emit('refresh-password')">Gerar agora</button>
    </div>
  </section>
</template>

<script setup>
defineProps({
  stringLen: { type: Number, required: true },
  minPasswordLength: { type: Number, required: true },
  includeLowercase: { type: Boolean, required: true },
  includeUppercase: { type: Boolean, required: true },
  includeNumbers: { type: Boolean, required: true },
  includeSpecialChars: { type: Boolean, required: true },
  numbersCount: { type: Number, required: true },
  specialCharsCount: { type: Number, required: true },
});

const emit = defineEmits([
  "refresh-password",
  "update:string-len",
  "update:include-lowercase",
  "update:include-uppercase",
  "update:include-numbers",
  "update:include-special-chars",
  "update:numbers-count",
  "update:special-chars-count",
]);

function onNumberInput(eventName, event) {
  const numericValue = Number.parseInt(event.target.value, 10);
  emit(eventName, Number.isNaN(numericValue) ? 0 : numericValue);
}

function onBooleanInput(eventName, event) {
  emit(eventName, event.target.checked);
}
</script>
