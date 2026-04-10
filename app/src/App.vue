<template>
  <div id="app" class="app-shell py-4 py-lg-5">
    <div class="container">
      <AppHeader />

      <div class="row g-4 align-items-center">
        <div class="col-lg-5">
          <PasswordConfigCard :string-len="stringLen" :min-password-length="minPasswordLength" :include-lowercase="includeLowercase" :include-uppercase="includeUppercase" :include-numbers="includeNumbers" :include-special-chars="includeSpecialChars" :numbers-count="numbersCount" :special-chars-count="specialCharsCount" @refresh-password="refreshPassword" @update:string-len="onStringLenUpdate" @update:include-lowercase="onIncludeLowercaseUpdate" @update:include-uppercase="onIncludeUppercaseUpdate" @update:include-numbers="onIncludeNumbersUpdate" @update:include-special-chars="onIncludeSpecialCharsUpdate" @update:numbers-count="onNumbersCountUpdate" @update:special-chars-count="onSpecialCharsCountUpdate" />
        </div>

        <div class="col-lg-7">
          <PasswordResultCard :password="theString" :icon="icon" @copy="doCopy" @refresh-password="refreshPassword" />
          <PasswordTipsCard />
        </div>
      </div>

      <AppFooter />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/Footer";
import PasswordConfigCard from "@/components/PasswordConfigCard";
import PasswordResultCard from "@/components/PasswordResultCard";
import PasswordTipsCard from "@/components/PasswordTipsCard";
import { generatePassword, getMinimumPasswordLength } from "@/composables/usePasswordGenerator";
import { useIconSwitcher } from "@/composables/useIconSwitcher";

const stringLen = ref(10);
const theString = ref("Sua senha aparecerá aqui");
const includeLowercase = ref(true);
const includeUppercase = ref(true);
const includeNumbers = ref(true);
const includeSpecialChars = ref(true);
const numbersCount = ref(2);
const specialCharsCount = ref(2);

const { icon, animateCopy } = useIconSwitcher();

const passwordOptions = computed(() => ({
  includeLowercase: includeLowercase.value,
  includeUppercase: includeUppercase.value,
  includeNumbers: includeNumbers.value,
  includeSpecialChars: includeSpecialChars.value,
  numbersCount: numbersCount.value,
  specialCharsCount: specialCharsCount.value,
}));

const minPasswordLength = computed(() => getMinimumPasswordLength(passwordOptions.value));

function doCopy() {
  navigator.clipboard.writeText(theString.value).then(
    () => animateCopy(),
    () => alert("O texto não pôde ser copiado!")
  );
}

function refreshPassword() {
  theString.value = generatePassword(stringLen.value, passwordOptions.value);
}

function onStringLenUpdate(value) {
  stringLen.value = value;
}

function onIncludeLowercaseUpdate(value) {
  includeLowercase.value = value;
}

function onIncludeUppercaseUpdate(value) {
  includeUppercase.value = value;
}

function onIncludeNumbersUpdate(value) {
  includeNumbers.value = value;
}

function onIncludeSpecialCharsUpdate(value) {
  includeSpecialChars.value = value;
}

function onNumbersCountUpdate(value) {
  numbersCount.value = value;
}

function onSpecialCharsCountUpdate(value) {
  specialCharsCount.value = value;
}

watch([includeLowercase, includeUppercase, includeNumbers, includeSpecialChars], ([lower, upper, numbers, specials]) => {
  if (!lower && !upper && !numbers && !specials) includeLowercase.value = true;
});

watch(minPasswordLength, (minimum) => {
  if (stringLen.value < minimum) stringLen.value = minimum;
});

watch(stringLen, (len) => {
  if (Number.isNaN(len) || len < minPasswordLength.value) stringLen.value = minPasswordLength.value;
});

watch(numbersCount, (count) => {
  if (count < 1 || Number.isNaN(count)) numbersCount.value = 1;
});

watch(specialCharsCount, (count) => {
  if (count < 1 || Number.isNaN(count)) specialCharsCount.value = 1;
});

watch([stringLen, passwordOptions], refreshPassword, { immediate: true });

let intervalId;

onMounted(() => {
  intervalId = setInterval(refreshPassword, 5000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style lang="less">
:root {
  --app-bg-start: #f4f7ff;
  --app-bg-end: #ecf7f1;
  --app-accent: #198754;
  --app-text: #1f2937;
}

.app-shell {
  min-height: 100vh;
  background: linear-gradient(145deg, var(--app-bg-start), var(--app-bg-end));
  color: var(--app-text);
}
#app {
  font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.config-card,
.result-card,
.tips-card {
  border-radius: 1rem;
}

.config-card .form-control,
.config-card .input-group-text {
  border-radius: 0.7rem;
}

.password-output {
  background: #0f172a;
  color: #ecfeff;
  border-radius: 0.9rem;
  padding: 1rem;
  font-family: "Courier New", Courier, monospace;
  font-size: 1.15rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  overflow-wrap: anywhere;
}

.password-output span {
  flex: 1;
  text-align: center;
}

.tips-card .list-group-item {
  background: transparent;
  border-color: #e5e7eb;
}

.form-check-input:checked {
  background-color: var(--app-accent);
  border-color: var(--app-accent);
}

@media (max-width: 575px) {
  .password-output {
    font-size: 1rem;
  }
}
</style>
