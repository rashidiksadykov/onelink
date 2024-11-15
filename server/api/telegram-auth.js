import crypto from 'crypto';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const config = useRuntimeConfig();

  console.log("TELEGRAM_BOT_TOKEN:", config.telegramBotToken); // Проверка токена

  // Проверка наличия токена
  const token = config.telegramBotToken;
  if (!token) {
    console.error("Telegram bot token is missing in runtime config");
    return { statusCode: 500, body: { error: "Internal server error" } };
  }

  // Структурируем данные для проверки
  const authData = Object.keys(query)
    .filter((key) => key !== 'hash')
    .map((key) => `${key}=${query[key]}`)
    .sort()
    .join('\n');

  console.log("Auth data:", authData); // Логирование данных

  const secretKey = crypto.createHash('sha256').update(token).digest();
  const hash = crypto.createHmac('sha256', secretKey).update(authData).digest('hex');

  console.log("Computed hash:", hash); // Логирование вычисленного хеша
  console.log("Received hash:", query.hash); // Логирование переданного хеша

  // Проверка хеша
  if (hash !== query.hash) {
    console.error("Hash mismatch");
    return { statusCode: 403, body: { error: 'Invalid data' } };
  }

  // Если данные валидны, возвращаем данные пользователя
  return { user: query };
});
