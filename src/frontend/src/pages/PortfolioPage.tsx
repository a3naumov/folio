import { ArrowTopRightIcon, ChevronDownIcon } from '@radix-ui/react-icons'
import { Button, Card, Table, Text } from '@radix-ui/themes'
import { AssetAvatar, MetricCard, PanelHeading } from '../components/ui'
import { assets, performance } from '../data/demo'

export function PortfolioPage() {
  return (
    <>
      <section className="metrics" aria-label="Portfolio summary">
        <MetricCard label="Portfolio value" value="$128,450" detail="4 assets · 3 wallets" />
        <MetricCard label="Total return" value="+$46,450" detail="56.65% all time" positive icon={<ArrowTopRightIcon />} />
        <MetricCard label="Net invested" value="$82,000" detail="Since January 2021" />
      </section>
      <section className="charts-grid" aria-label="Portfolio charts">
        <Card className="panel performance-panel">
          <PanelHeading title="Portfolio performance" action={<Button size="1" variant="ghost" color="gray" disabled title="Period selection is unavailable in this preview">All time <ChevronDownIcon /></Button>} />
          <div className="chart-legend">
            <span><i className="legend-dot value-dot" />Portfolio value</span>
            <span><i className="legend-dot invested-dot" />Net invested</span>
            <span className="chart-unit">USD, thousands</span>
          </div>
          <svg className="performance-chart" viewBox="0 0 600 180" role="img" aria-labelledby="performance-title performance-description">
            <title id="performance-title">Portfolio value and net invested, 2021 to 2026</title>
            <desc id="performance-description">Demo portfolio value in thousands of USD: 29.8, 21.6, 54.2, 86.9, 112.8, and 128.5. Net invested ends at 82 thousand USD.</desc>
            {[38, 88, 138].map((y) => <line key={y} x1="10" x2="590" y1={y} y2={y} className="chart-gridline" />)}
            {performance.map((point, index) => {
              const x = index * 99 + 27
              const valueHeight = point.value * 0.87
              const investedHeight = point.invested * 0.87
              return (
                <g key={point.year}>
                  <rect x={x} y={144 - investedHeight} width="19" height={investedHeight} rx="3" className="invested-bar" />
                  <rect x={x + 23} y={144 - valueHeight} width="23" height={valueHeight} rx="3" className={index === 5 ? 'value-bar value-bar-latest' : 'value-bar'} />
                  <text x={x + 34} y={144 - Math.max(valueHeight, investedHeight) - 10} textAnchor="middle" className="chart-value">{point.label}</text>
                  <text x={x + 23} y="170" textAnchor="middle" className="chart-year">{point.year}</text>
                </g>
              )
            })}
          </svg>
        </Card>
        <Card className="panel allocation-panel">
          <PanelHeading title="Allocation" detail="4 assets" />
          <div className="allocation-content">
            <div className="allocation-donut" role="img" aria-label="Portfolio allocation: Bitcoin 57.8%, Ethereum 25.2%, Solana 10.8%, USD Coin 6.2%"><div /></div>
            <ul className="allocation-legend">
              {assets.map((asset) => <li key={asset.symbol}><span><i className={`legend-dot dot-${asset.symbol.toLowerCase()}`} />{asset.symbol}</span><strong>{asset.allocation}</strong></li>)}
            </ul>
          </div>
          <Text as="p" size="1" className="allocation-note muted">Bitcoin · 57.8% of portfolio value</Text>
        </Card>
      </section>
      <Card className="panel assets-panel">
        <PanelHeading title="Your assets" detail="4 assets" action={<Button size="1" variant="ghost" color="gray" disabled title="Asset filtering is unavailable in this preview">All assets <ChevronDownIcon /></Button>} />
        <div className="table-scroll" role="region" aria-label="Portfolio assets" tabIndex={0}>
          <Table.Root className="data-table assets-table" size="2">
            <Table.Header><Table.Row>
              <Table.ColumnHeaderCell>Asset</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell justify="end">Price</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell justify="end">Holdings</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell justify="end">Value</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell justify="end">Return</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell justify="end">Allocation</Table.ColumnHeaderCell>
            </Table.Row></Table.Header>
            <Table.Body>{assets.map((asset) => (
              <Table.Row key={asset.symbol}>
                <Table.RowHeaderCell><div className="asset-cell"><AssetAvatar symbol={asset.symbol} /><div><Text as="p" weight="medium">{asset.name}</Text><Text as="p" className="cell-secondary">{asset.symbol}</Text></div></div></Table.RowHeaderCell>
                <Table.Cell justify="end">{asset.price}</Table.Cell>
                <Table.Cell justify="end">{asset.holdings}</Table.Cell>
                <Table.Cell justify="end"><Text weight="medium">{asset.value}</Text></Table.Cell>
                <Table.Cell justify="end" className={asset.symbol === 'USDC' ? '' : 'positive'}><Text as="p" weight="medium">{asset.change}</Text><Text as="p" className="cell-secondary return-percent">{asset.changePercent}</Text></Table.Cell>
                <Table.Cell justify="end">{asset.allocation}</Table.Cell>
              </Table.Row>
            ))}</Table.Body>
          </Table.Root>
        </div>
        <Text as="p" className="table-note">Unrealized returns · fees included</Text>
      </Card>
    </>
  )
}
