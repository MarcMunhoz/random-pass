<template>
  <section class="card border-0 shadow-sm result-card mb-4">
    <div class="card-body p-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2 class="h5 fw-bold mb-0">Sua senha</h2>
        <span class="badge text-bg-light border">Atualiza automaticamente</span>
      </div>

      <div class="password-output mb-3">
        <component :is="icon.component" :class="icon.class" />
        <span>{{ password }}</span>
        <component :is="icon.component" :class="icon.class" />
      </div>

      <div class="d-flex flex-wrap gap-2">
        <button type="button" class="btn btn-dark px-4 copy" @click="$emit('copy')">Copiar senha</button>
        <button type="button" class="btn btn-outline-secondary px-4" @click="$emit('refresh-password')">Nova senha</button>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  password: { type: String, required: true },
  icon: { type: Object, required: true },
});

defineEmits(["copy", "refresh-password"]);
</script>
