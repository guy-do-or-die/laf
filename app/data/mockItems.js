// Mock data for items
// Чтобы включить мок данные вместо реальных данных с блокчейна:
// 1. Измените ENABLE_MOCK_DATA на true
// 2. Перезагрузите страницу
// Чтобы вернуться к реальным данным, установите ENABLE_MOCK_DATA обратно в false
export const ENABLE_MOCK_DATA = true;

export const mockItems = [
  {
    hash: '0x1234567890abcdef1234567890abcdef12345678',
    address: '0xabcdef1234567890abcdef1234567890abcdef12',
    itemData: {
      comment: 'iPhone 14 Pro в черном чехле',
      isLost: true,
      isFound: false,
      isReturned: false,
      geo: 'Москва, ул. Тверская, 15',
      reward: BigInt('1000000000000000000'), // 1 ETH
      finder: '0x0000000000000000000000000000000000000000',
      owner: '0x742d35Cc6634C0532925a3b8D4C9db96590c4C87'
    }
  },
  {
    hash: '0x2345678901bcdef12345678901bcdef123456789',
    address: '0xbcdef12345678901bcdef12345678901bcdef123',
    itemData: {
      comment: 'Кожаный кошелек коричневого цвета с документами',
      isLost: true,
      isFound: true,
      isReturned: false,
      geo: 'Санкт-Петербург, Невский проспект, 28',
      reward: BigInt('500000000000000000'), // 0.5 ETH
      finder: '0x8ba1f109551bD432803012645Hac136c30C6213',
      owner: '0x742d35Cc6634C0532925a3b8D4C9db96590c4C87'
    }
  },
  {
    hash: '0x3456789012cdef123456789012cdef1234567890',
    address: '0xcdef123456789012cdef123456789012cdef1234',
    itemData: {
      comment: 'Золотые часы Rolex с гравировкой "М.И."',
      isLost: false,
      isFound: false,
      isReturned: false,
      geo: '',
      reward: BigInt('0'),
      finder: '0x0000000000000000000000000000000000000000',
      owner: '0x742d35Cc6634C0532925a3b8D4C9db96590c4C87'
    }
  },
  {
    hash: '0x4567890123def1234567890123def12345678901',
    address: '0xdef1234567890123def1234567890123def12345',
    itemData: {
      comment: 'Красный велосипед Trek с корзинкой',
      isLost: true,
      isFound: true,
      isReturned: true,
      geo: 'Екатеринбург, парк им. Маяковского',
      reward: BigInt('2000000000000000000'), // 2 ETH
      finder: '0x9cb2f210662bE543814046645Iac247d41C7314',
      owner: '0x742d35Cc6634C0532925a3b8D4C9db96590c4C87'
    }
  },
  {
    hash: '0x5678901234ef12345678901234ef123456789012',
    address: '0xef12345678901234ef12345678901234ef123456',
    itemData: {
      comment: 'Ноутбук MacBook Air 13" в серебристом цвете',
      isLost: true,
      isFound: false,
      isReturned: false,
      geo: 'Новосибирск, ТЦ "Галерея"',
      reward: BigInt('3000000000000000000'), // 3 ETH
      finder: '0x0000000000000000000000000000000000000000',
      owner: '0x742d35Cc6634C0532925a3b8D4C9db96590c4C87'
    }
  },
  {
    hash: '0x6789012345f123456789012345f1234567890123',
    address: '0xf123456789012345f123456789012345f1234567',
    itemData: {
      comment: 'Детская игрушка - плюшевый медведь в красной кофте',
      isLost: true,
      isFound: true,
      isReturned: false,
      geo: 'Казань, Кремлевская набережная',
      reward: BigInt('100000000000000000'), // 0.1 ETH
      finder: '0xacb3f321773cF654925157756Jbd358e52D8425',
      owner: '0x742d35Cc6634C0532925a3b8D4C9db96590c4C87'
    }
  }
];

// Helper function to get mock item data by address
export const getMockItemData = (address) => {
  const item = mockItems.find(item => item.address === address);
  return item ? item.itemData : null;
};