import { Avatar, Badge, Button, Text } from '@radix-ui/themes'
import {
  ArrowRightIcon, BarChartIcon, ChevronDownIcon, DashboardIcon,
  FileTextIcon, GearIcon, LightningBoltIcon, PlusIcon, ReaderIcon,
} from '@radix-ui/react-icons'
import type { ReactNode } from 'react'
import type { Page } from '../data/demo'

interface AppShellProps {
  page: Page
  children: ReactNode
}

export function AppShell({ page, children }: AppShellProps) {
  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Main navigation">
        <a href="#/portfolio" className="wordmark" aria-label="Folio home">folio<span>.</span></a>
        <nav className="primary-nav" aria-label="Portfolio navigation">
          <a href="#/portfolio" className="nav-item" aria-current={page === 'portfolio' ? 'page' : undefined}>
            <DashboardIcon aria-hidden="true" />Portfolio
          </a>
          <a href="#/transactions" className="nav-item" aria-current={page === 'transactions' ? 'page' : undefined}>
            <ArrowRightIcon aria-hidden="true" />Transactions
          </a>
          <button className="nav-item" disabled title="Not available in this preview"><BarChartIcon />Analytics</button>
          <button className="nav-item" disabled title="Not available in this preview"><ReaderIcon />Wallets</button>
        </nav>
        <div className="workspace-nav">
          <Text as="p" className="nav-group-label">Workspace</Text>
          <nav aria-label="Workspace navigation">
            <button className="nav-item" disabled title="Not available in this preview"><FileTextIcon />Reports</button>
            <button className="nav-item" disabled title="Not available in this preview"><GearIcon />Settings</button>
          </nav>
        </div>
        <div className="sidebar-bottom">
          <div className="connection-status">
            <Text as="p"><span className="status-dot" />3 connected sources</Text>
            <Text as="p" className="muted">Demo connections</Text>
          </div>
          <div className="profile">
            <Avatar fallback="AK" size="2" radius="full" color="gray" />
            <div><Text as="p" size="2" weight="medium">Alex Kim</Text><Text as="p" size="1" className="muted">Personal portfolio</Text></div>
          </div>
        </div>
      </aside>
      <main id="main-content" className="main-content">
        <header className="page-header">
          <div>
            <div className="page-title-row">
              <h1>{page === 'portfolio' ? 'My portfolio' : 'Transactions'}</h1>
              <Badge className="demo-badge" color="gray" variant="soft" size="1">Demo data</Badge>
            </div>
            <Text as="p" className="page-description">
              {page === 'portfolio' ? 'September 28, 2026 · Your finances, in perspective' : 'Personal portfolio · Every move, in one place'}
            </Text>
          </div>
          <div className="header-actions">
            <Button variant="ghost" color="gray" disabled className="currency-control" title="Display currency is fixed in this preview">USD <ChevronDownIcon /></Button>
            <Button color="gray" highContrast disabled className="primary-action" title="Not available in this preview"><PlusIcon />Add transaction</Button>
          </div>
        </header>
        {children}
        <footer className="page-footer">
          <span>{page === 'portfolio' ? 'Year-end values; 2026 as of September 28.' : 'Fees included · transfers do not affect net invested'}</span>
          <span><LightningBoltIcon aria-hidden="true" />FIFO · {page === 'portfolio' ? 'fees included' : 'UTC+3'} · USD</span>
        </footer>
      </main>
    </div>
  )
}
