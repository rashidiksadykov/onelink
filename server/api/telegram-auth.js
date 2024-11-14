import crypto from 'crypto';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  // Telegram требует верификации запроса на стороне сервера
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const authData = Object.keys(query)
    .filter((key) => key !== 'hash')
    .map((key) => `${key}=${query[key]}`)
    .sort()
    .join('\n');
  const secretKey = crypto.createHash('sha256').update(token).digest();
  const hash = crypto
    .createHmac('sha256', secretKey)
    .update(authData)
    .digest('hex');

  if (hash !== query.hash) {
    return { statusCode: 403, body: { error: 'Invalid data' } };
  }

  // Если данные валидны, возвращаем данные пользователя
  return { user: query };
});
