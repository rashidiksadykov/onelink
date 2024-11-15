<template>
  <div class="container">
    <h1>Отправка файла на GitHub</h1>
    <button @click="commitToGitHub">Commit to GitHub</button>
  </div>
</template>

<script>
export default { 
  methods: {
    async commitToGitHub() {
      
      //const token = process.env.GITHUB_TOKEN; // Используем переменную окружения

      const config = useRuntimeConfig();
      const token = config.githubToken; // Получение токена из runtimeConfig


      const owner = "rashidiksadykov"; // Имя пользователя GitHub
      const repo = "MyVCard"; // Имя репозитория на GitHub
      const path = "file.txt"; // Путь к файлу в репозитории
      const message = "Updated file via Nuxt commit"; // Сообщение коммита
      const content = btoa("This is the new content of the file!"); // Закодированное содержимое файла (base64)

      if (!token) {
        alert("GitHub токен не установлен. Проверьте переменные окружения.");
        return;
      }

      try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Ошибка при проверке файла:', errorData);
          throw new Error(`Ошибка при проверке файла: ${errorData.message}`);
        }

        let sha = "";
        const fileData = await response.json();
        sha = fileData.sha;

        const updateResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: message,
            content: content,
            sha: sha,
          }),
        });

        if (!updateResponse.ok) {
          const updateErrorData = await updateResponse.json();
          console.error('Ошибка при обновлении файла:', updateErrorData);
          throw new Error(`Ошибка при обновлении файла: ${updateErrorData.message}`);
        }

        alert("Коммит успешно сделан!");
      } catch (error) {
        console.error("Ошибка:", error);
        alert(`Ошибка при коммите: ${error.message}`);
      }

      console.log("GitHub Token:", process.env.GITHUB_TOKEN);


    },
  },
};
</script>
