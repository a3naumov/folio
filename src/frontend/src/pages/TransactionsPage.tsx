import { ArrowDownIcon, ArrowTopRightIcon, CalendarIcon, ChevronDownIcon, DownloadIcon, MixerHorizontalIcon } from '@radix-ui/react-icons'
import { Badge, Button, Card, Table, Text } from '@radix-ui/themes'
import { AssetAvatar, MetricCard, PanelHeading } from '../components/ui'
import { transactions } from '../data/demo'
import type { TransactionType } from '../data/demo'

const badgeColors = { Sell: 'orange', Buy: 'green', Transfer: 'gray', Deposit: 'blue' } as const satisfies Record<TransactionType, string>

export function TransactionsPage() {
  return (
    <>
      <section className="metrics" aria-label="Transactions summary">
        <MetricCard label="Net invested" value="$82,000" detail="Portfolio value $128,450" />
        <MetricCard label="Total return" value="+$46,450" detail="Unrealized +$33,610" positive icon={<ArrowTopRightIcon />} />
        <MetricCard label="Realized return" value="+$12,840" detail="All time · FIFO" positive />
      </section>
      <Card className="panel transactions-panel">
        <PanelHeading title="Transaction history" detail="8 transactions" action={<Button variant="ghost" color="gray" size="1" disabled title="Export is unavailable in this preview"><DownloadIcon />Export CSV</Button>} />
        <div className="filter-bar" aria-label="Transaction filters (preview only)">
          {['All types', 'All assets', 'All sources'].map((label) => <Button key={label} variant="outline" color="gray" className="filter-control" disabled title="Filtering is unavailable in this preview"><MixerHorizontalIcon />{label}<ChevronDownIcon className="filter-chevron" /></Button>)}
          <Button variant="outline" color="gray" className="filter-control date-filter" disabled title="Date filtering is unavailable in this preview"><CalendarIcon />Sep 1–28, 2026<ChevronDownIcon className="filter-chevron" /></Button>
        </div>
        <div className="table-scroll" role="region" aria-label="Transaction history" tabIndex={0}>
          <Table.Root className="data-table transactions-table" size="2">
            <Table.Header><Table.Row>
              <Table.ColumnHeaderCell><span className="date-column">Date <ArrowDownIcon /></span></Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Asset / quantity</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Source</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell justify="end">Amount, USD</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell justify="end">Cost basis</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell justify="end">Fee</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell justify="end">Return, USD</Table.ColumnHeaderCell>
            </Table.Row></Table.Header>
            <Table.Body>{transactions.map((transaction) => (
              <Table.Row key={transaction.id}>
                <Table.RowHeaderCell><Text as="p">{transaction.date}</Text><Text as="p" className="cell-secondary">{transaction.time}</Text></Table.RowHeaderCell>
                <Table.Cell><Badge size="1" variant="soft" color={badgeColors[transaction.type]}>{transaction.type}</Badge></Table.Cell>
                <Table.Cell><div className="asset-cell"><AssetAvatar symbol={transaction.symbol} /><div><Text as="p" weight="medium">{transaction.symbol}</Text><Text as="p" className="cell-secondary">{transaction.quantity}</Text></div></div></Table.Cell>
                <Table.Cell><Text as="p">{transaction.source}</Text><Text as="p" className="cell-secondary">{transaction.sourceDetail}</Text></Table.Cell>
                <Table.Cell justify="end">{transaction.amount}</Table.Cell>
                <Table.Cell justify="end" className="muted">{transaction.costBasis}</Table.Cell>
                <Table.Cell justify="end" className="muted">{transaction.fee}</Table.Cell>
                <Table.Cell justify="end" className={transaction.outcome}><Text weight="medium">{transaction.gain}</Text></Table.Cell>
              </Table.Row>
            ))}</Table.Body>
          </Table.Root>
        </div>
        <div className="transactions-summary">
          <div><Text as="p" size="2" weight="medium">3 sales this period</Text><Text as="p" className="cell-secondary">Proceeds $14,600 − cost basis $10,880</Text></div>
          <div className="realized-summary"><Text as="p" className="summary-value positive">+$3,720</Text><Text as="p" className="cell-secondary">Realized return this period</Text></div>
        </div>
      </Card>
    </>
  )
}
