<template>
  <NuxtLayout>
    <div>
      <button @click="commitToGitHub">Commit to GitHub</button>
    </div>
  </NuxtLayout>
</template>

<script>
export default {
  methods: {
    async commitToGitHub() {
      const token = "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"; // Ваш GitHub токен
      const owner = "rashidiksadykov"; // Ваше имя пользователя
      const repo = "MyVCard"; // Ваш репозиторий
      const path = "server/user/files.txt"; // Файл, который хотите создать или обновить
      const message = "Добавление файла через API"; // Сообщение коммита
      const content = btoa("This is the new content of the file"); // Base64 кодированный контент файла

      try {
        // Проверяем наличие файла и получаем SHA, если он существует
        console.log("Проверяем существование файла...");
        const fileResponse = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        let sha = null; // По умолчанию SHA отсутствует
        if (fileResponse.status === 200) {
          const fileData = await fileResponse.json();
          sha = fileData.sha; // Получаем SHA, если файл существует
          console.log("Файл существует. SHA:", sha);
        } else if (fileResponse.status === 404) {
          console.log("Файл не найден. Будет создан новый файл.");
        } else {
          const errorData = await fileResponse.json();
          throw new Error(
            `Ошибка при проверке файла: ${errorData.message}`
          );
        }

        // Создаём или обновляем файл
        console.log("Создаём или обновляем файл...");
        const updateResponse = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: message,
              content: content,
              sha: sha, // SHA нужно указать, если файл существует
            }),
          }
        );

        if (!updateResponse.ok) {
          const updateErrorData = await updateResponse.json();
          throw new Error(
            `Ошибка при обновлении файла: ${updateErrorData.message}`
          );
        }

        const updateData = await updateResponse.json();
        console.log("Файл успешно создан или обновлён:", updateData);
        alert("Коммит успешно сделан!");
      } catch (error) {
        console.error("Ошибка:", error);
        alert(`Ошибка при коммите: ${error.message}`);
      }
    },
  },
};
</script>
