<template>
  <div ref="telegramAuth"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const telegramAuth = ref(null);
const botUsername = 'tokenrebate_bot'; // Замените на имя вашего бота без '@'

onMounted(() => {
  if (telegramAuth.value) {
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?9';
    script.async = true;
    script.setAttribute('data-telegram-login', botUsername);
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-auth-url', '/api/telegram-auth');
    script.setAttribute('data-request-access', 'write');
    telegramAuth.value.appendChild(script);
  }
});
</script>
