returnMode: 'one' - Возвращает первое найденное распределение монет (рекурсия всё равно идет по всем возможным), returnMode: 'all' - массив всех распределений.
default = 'one'
```bash
distributeCoins(coinsLeftoversContainer: CoinRecord, requests: string[], returnMode: ReturnMode = 'one'): string[][] | string[] | null
```
