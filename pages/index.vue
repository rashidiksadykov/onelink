<template>
  <div>
    <TelegramAuth @auth="handleAuth" />
  </div>
</template>

<script setup lang="ts">
const handleAuth = (user) => {
  console.log('User authenticated:', user);
  // Обработка данных пользователя
}
</script>
