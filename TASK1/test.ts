import { distributeCoins } from './task1';

describe('distributeCoins', () => {
  it('Возвращает первое найденное распределение, когда mode не указан (default = "one")', () => {
    const coinsLeftoversContainer = { ETH: 4, TRON: 5, MATIC: 1 };
    const requests = ['ETH', 'ETH', 'ETH/TRON', 'TRON/ETH', 'TRON/MATIC', 'TRON', 'MATIC'];
    const result = distributeCoins(coinsLeftoversContainer, requests);
    expect(result).toEqual(['ETH', 'ETH', 'ETH', 'TRON', 'TRON', 'TRON', 'MATIC']);
  });

  it('Должен вернуть Null, если распределения не существует', () => {
    const coinsLeftoversContainer = { ETH: 1, TRON: 1, MATIC: 0 };
    const requests = ['ETH', 'TRON', 'MATIC'];
    const result = distributeCoins(coinsLeftoversContainer, requests, 'all');
    expect(result).toEqual(null);
  });

  it('Возвращаемый массив найденных распределений должен включать в себя второй массив из примера в backend.md (returnMode = "all")', () => {
    const coinsLeftoversContainer = { ETH: 4, TRON: 5, MATIC: 1 };
    const requests = ['ETH', 'ETH', 'ETH/TRON', 'TRON/ETH', 'TRON/MATIC', 'TRON', 'MATIC'];
    const result = distributeCoins(coinsLeftoversContainer, requests, 'all');
    expect(result).toEqual(
      expect.arrayContaining([
        expect.arrayContaining(['ETH', 'ETH', 'ETH', 'ETH', 'TRON', 'TRON', 'MATIC']),
      ]),
    );
  });
});