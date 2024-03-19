export type CoinRecord = {
    [key: string]: number;
  };
export type ReturnMode = 'all' | 'one';
  
export function distributeCoins(coinsLeftoversContainer: CoinRecord, requests: string[], returnMode: ReturnMode = 'one'): string[][] | string[] | null {
  const validDistributions: string[][] = [];

  function distributionSearchBacktrack(index: number, distribution: string[]): void {
    if (index === requests.length) {
      validDistributions.push([...distribution]);
      return;
    }

    const currCoins: string[] = requests[index].split('/');
    for (const coin of currCoins) {
      if (coinsLeftoversContainer[coin] > 0) {
        distribution.push(coin);
        coinsLeftoversContainer[coin]--;
        distributionSearchBacktrack(index + 1, distribution);
        coinsLeftoversContainer[coin]++;
        distribution.pop();
      }
    }
  }

  distributionSearchBacktrack(0, []);

  return returnMode === 'one' && validDistributions.length > 0
    ? validDistributions[0]
    : validDistributions.length > 0
      ? validDistributions
      : null;
}
