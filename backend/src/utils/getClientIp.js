/**
 * Определяет IP-адрес клиента с учетом работы за reverse-proxy
 * @param {Request} req - Express Request объект
 * @returns {string} IP-адрес клиента
 */
function getClientIp(req) {
  // Проверяем заголовок X-Forwarded-For (для работы за reverse-proxy)
  const forwardedFor = req.headers['x-forwarded-for'];
  
  if (forwardedFor) {
    // X-Forwarded-For может содержать несколько IP через запятую
    // Первый IP - это оригинальный IP клиента
    const ips = typeof forwardedFor === 'string' 
      ? forwardedFor.split(',').map(ip => ip.trim())
      : forwardedFor[0].split(',').map(ip => ip.trim());
    
    return ips[0];
  }
  
  // Проверяем другие возможные заголовки
  const realIp = req.headers['x-real-ip'];
  if (realIp) {
    return typeof realIp === 'string' ? realIp : realIp[0];
  }
  
  // Если заголовков нет, берем IP из connection
  return req.socket.remoteAddress || '0.0.0.0';
}

module.exports = { getClientIp };
