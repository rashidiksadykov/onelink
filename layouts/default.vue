// layouts/default.vue
<template>
  <div>
  

    <header>Header</header>
    <main>
      <slot />
    </main>



<footer class="bg-zinc-50 text-center dark:bg-neutral-700 lg:text-left">
  <div class="bg-black/5 p-4 text-center text-surface dark:text-white">
    © 2023 Copyright:
    <a href="#">MVCard</a>
  </div>
</footer>







   
  </div>
</template>
