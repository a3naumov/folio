import { useEffect, useSyncExternalStore } from 'react'
import { AppShell } from './components/AppShell'
import { PortfolioPage } from './pages/PortfolioPage'
import { TransactionsPage } from './pages/TransactionsPage'
import type { Page } from './data/demo'
import './App.css'

function subscribeToHash(onChange: () => void) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

function getPage(): Page {
  return window.location.hash === '#/transactions' ? 'transactions' : 'portfolio'
}

export default function App() {
  const page = useSyncExternalStore(subscribeToHash, getPage)

  useEffect(() => {
    document.title = `${page === 'portfolio' ? 'Portfolio' : 'Transactions'} · Folio`
  }, [page])

  return (
    <AppShell page={page}>
      {page === 'portfolio' ? <PortfolioPage /> : <TransactionsPage />}
    </AppShell>
  )
}
