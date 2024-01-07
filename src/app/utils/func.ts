export const modifyTelegramLink = (link: string) => {
    const telegramLinkRegex = /^https:\/\/t\.me\/(\+)?(.+)$/;
  
    const match = link.match(telegramLinkRegex);
  
    if (match) {
      const hasPlusSymbol = match[1] === '+';
      const username = match[2];
  
      if (hasPlusSymbol) {
        // Ссылка уже содержит символ '+', оставляем её без изменений
        return link;
      } else {
        // Ссылка не содержит символ '+', убираем "https://t.me/" и возвращаем чистый username
        return username;
      }
    } else {
      // Не соответствует формату https://t.me/, возвращаем оригинальную ссылку
      return link;
    }
  };