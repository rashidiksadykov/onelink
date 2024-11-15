import crypto from 'crypto';

export default defineEventHandler((event) => {
  const query = getQuery(event);

  // Убираем photo_url для проверки hash
  const authData = Object.keys(query)
    .filter((key) => key !== 'hash' && key !== 'photo_url')
    .map((key) => `${key}=${query[key]}`)
    .sort()
    .join('\n');

  const token = useRuntimeConfig().telegramBotToken;
  const secretKey = crypto.createHash('sha256').update(token).digest();
  const hash = crypto.createHmac('sha256', secretKey).update(authData).digest('hex');

  if (hash !== query.hash) {
    return { statusCode: 403, body: { error: 'Invalid data' } };
  }

  // Если проверка пройдена, возвращаем все данные, включая photo_url
  return { user: query };
});
