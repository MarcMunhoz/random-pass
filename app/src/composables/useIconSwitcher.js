import { ref } from 'vue'
import { BIconEye, BIconEyeFill } from 'bootstrap-icons-vue'

export function useIconSwitcher() {
  const icon = ref({
    component: BIconEye,
    class: ''
  })

  const animateCopy = (buttonSelector = '.copy') => {
    const btn = document.querySelector(buttonSelector)
    if (!btn) return

    // Visual feedback
    btn.style.fontWeight = '600'
    btn.classList.add('btn-success')
    btn.textContent = 'Copiado!'
    icon.value.component = BIconEyeFill
    icon.value.class = 'text-success'

    setTimeout(() => {
      btn.style.fontWeight = '300'
      btn.classList.remove('btn-success')
      btn.textContent = 'Copiar'
      icon.value.component = BIconEye
      icon.value.class = ''
    }, 1500)
  }

  return { icon, animateCopy }
}
