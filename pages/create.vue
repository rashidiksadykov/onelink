<template>
  <div>
    <button @click="commitToGitHub">Commit to GitHub</button>
  </div>
</template>

<script>
export default {
  methods: {
    async commitToGitHub() {
      const token = ""; // Вставь сюда свой GitHub токен
      const owner = "rashidiksadykov"; // Укажи своё имя пользователя GitHub
      const repo = "MyVCard"; // Укажи свой репозиторий
      const path = "file.txt"; // Укажи путь к файлу, который хочешь изменить
      const message = "Your commit message"; // Укажи сообщение коммита
      const content = btoa("This is the content of the file"); // Закодируй содержимое файла в base64

      if (!token || token === "YOUR_GITHUB_TOKEN") {
        alert("GitHub токен не установлен. Пожалуйста, добавьте действующий токен.");
        return;
      }

      try {
        // Получаем SHA последней версии файла
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Ошибка при получении данных о файле: ${errorData.message}`);
        }

        const fileData = await response.json();
        const sha = fileData.sha;

        // Отправка запроса для обновления файла
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
          throw new Error(`Ошибка при обновлении файла: ${updateErrorData.message}`);
        }

        alert("Коммит успешно сделан!");
      } catch (error) {
        console.error("Ошибка:", error);
        alert(`Ошибка при коммите: ${error.message}`);
      }
    },
  },
};
</script>