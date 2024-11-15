<template>
  <NuxtLayout>

  <div>
    <TelegramAuth @auth="handleAuth" />
  </div>
  </NuxtLayout>

</template>

<script setup lang="ts">


definePageMeta({
  layout: 'default'  // Указываем, что используем макет "default"
});


const handleAuth = (user) => {
  console.log('User authenticated:', user);
  // Обработка данных пользователя
}

</script>
