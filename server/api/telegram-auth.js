import crypto from 'crypto';

export default defineEventHandler((event) => {
  const query = getQuery(event);

  // Указываем только основные поля
  const requiredFields = ['id', 'first_name', 'last_name', 'username', 'auth_date', 'hash'];
  const filteredQuery = Object.fromEntries(
    Object.entries(query).filter(([key]) => requiredFields.includes(key))
  );

  const token = useRuntimeConfig().telegramBotToken;
  const authData = Object.keys(filteredQuery)
    .filter((key) => key !== 'hash')
    .map((key) => `${key}=${filteredQuery[key]}`)
    .sort()
    .join('\n');

  const secretKey = crypto.createHash('sha256').update(token).digest();
  const hash = crypto
    .createHmac('sha256', secretKey)
    .update(authData)
    .digest('hex');

  if (hash !== filteredQuery.hash) {
    return { statusCode: 403, body: { error: 'Invalid data' } };
  }

  // Вернем только базовые данные для теста
  return { user: filteredQuery };
});
