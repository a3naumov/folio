export type Page = 'portfolio' | 'transactions'
export type AssetSymbol = 'BTC' | 'ETH' | 'SOL' | 'USDC'
export type TransactionType = 'Sell' | 'Buy' | 'Transfer' | 'Deposit'

export interface Asset {
  symbol: AssetSymbol
  name: string
  price: string
  holdings: string
  value: string
  change: string
  changePercent: string
  allocation: string
}

export interface Transaction {
  id: string
  date: string
  time: string
  type: TransactionType
  symbol: AssetSymbol
  quantity: string
  source: string
  sourceDetail: string
  amount: string
  costBasis: string
  fee: string
  gain: string
  outcome: 'positive' | 'negative' | 'neutral'
}

export interface PerformancePoint {
  year: string
  value: number
  invested: number
  label: string
}

export const assets: Asset[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: '$92,800', holdings: '0.8000 BTC', value: '$74,240', change: '+$24,000', changePercent: '+47.8%', allocation: '57.8%' },
  { symbol: 'ETH', name: 'Ethereum', price: '$3,600', holdings: '9.0000 ETH', value: '$32,400', change: '+$7,800', changePercent: '+31.7%', allocation: '25.2%' },
  { symbol: 'SOL', name: 'Solana', price: '$138.10', holdings: '100.00 SOL', value: '$13,810', change: '+$1,810', changePercent: '+15.1%', allocation: '10.8%' },
  { symbol: 'USDC', name: 'USD Coin', price: '$1.00', holdings: '8,000 USDC', value: '$8,000', change: '$0', changePercent: '0.0%', allocation: '6.2%' },
]

export const performance: PerformancePoint[] = [
  { year: '2021', value: 29.8, invested: 22, label: '29.8' },
  { year: '2022', value: 21.6, invested: 25, label: '21.6' },
  { year: '2023', value: 54.2, invested: 43, label: '54.2' },
  { year: '2024', value: 86.9, invested: 62, label: '86.9' },
  { year: '2025', value: 112.8, invested: 75, label: '112.8' },
  { year: '2026*', value: 128.45, invested: 82, label: '128.5' },
]

export const transactions: Transaction[] = [
  { id: 'tx-01', date: 'Sep 28', time: '14:32', type: 'Sell', symbol: 'BTC', quantity: '0.08 BTC', source: 'Binance', sourceDetail: 'Spot', amount: '+8,600.00', costBasis: '5,600.00', fee: '8.60', gain: '+3,000.00', outcome: 'positive' },
  { id: 'tx-02', date: 'Sep 26', time: '10:18', type: 'Sell', symbol: 'ETH', quantity: '1.2 ETH', source: 'Binance', sourceDetail: 'Spot', amount: '+4,320.00', costBasis: '3,360.00', fee: '4.32', gain: '+960.00', outcome: 'positive' },
  { id: 'tx-03', date: 'Sep 24', time: '17:05', type: 'Sell', symbol: 'SOL', quantity: '12 SOL', source: 'Phantom', sourceDetail: 'Swap', amount: '+1,680.00', costBasis: '1,920.00', fee: '1.68', gain: '−240.00', outcome: 'negative' },
  { id: 'tx-04', date: 'Sep 22', time: '09:41', type: 'Buy', symbol: 'BTC', quantity: '0.05 BTC', source: 'Binance', sourceDetail: 'Spot', amount: '−4,650.00', costBasis: '—', fee: '4.65', gain: '—', outcome: 'neutral' },
  { id: 'tx-05', date: 'Sep 20', time: '16:24', type: 'Transfer', symbol: 'BTC', quantity: '0.10 BTC', source: 'Binance → Ledger', sourceDetail: 'Between wallets', amount: '9,280.00', costBasis: '—', fee: '1.86', gain: '—', outcome: 'neutral' },
  { id: 'tx-06', date: 'Sep 18', time: '11:02', type: 'Deposit', symbol: 'USDC', quantity: '5,000 USDC', source: 'Binance', sourceDetail: 'External deposit', amount: '+5,000.00', costBasis: '—', fee: '0.00', gain: '—', outcome: 'neutral' },
  { id: 'tx-07', date: 'Sep 15', time: '12:56', type: 'Buy', symbol: 'SOL', quantity: '20 SOL', source: 'Phantom', sourceDetail: 'Swap', amount: '−2,810.00', costBasis: '—', fee: '2.81', gain: '—', outcome: 'neutral' },
  { id: 'tx-08', date: 'Sep 12', time: '08:30', type: 'Transfer', symbol: 'SOL', quantity: '15 SOL', source: 'Phantom → Binance', sourceDetail: 'Between wallets', amount: '2,100.00', costBasis: '—', fee: '0.01', gain: '—', outcome: 'neutral' },
]
