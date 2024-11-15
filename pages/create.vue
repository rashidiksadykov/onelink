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
const token = ""; // Лучше сохранить токен в безопасном месте
const owner = "rashidiksadykov";
const repo = "MyVCard";
const path = "file.txt";
const message = "Your commit message";
const content = btoa("This is the content of the file"); // Закодируй содержимое файла в base64

  try {
    // Получи SHA последней версии файла, чтобы обновить его
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const fileData = await response.json();
    const sha = fileData.sha;

    // Отправь запрос для обновления файла
    await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
        content: content,
        sha: sha, // SHA необходим для обновления
      }),
    });
    alert("Коммит успешно сделан!");
  } catch (error) {
    console.error("Ошибка при коммите:", error);
    alert("Ошибка при коммите. Проверь консоль для деталей.");
  }
},

},
};
</script>