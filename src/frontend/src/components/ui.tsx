import { Avatar, Card, Heading, Text } from '@radix-ui/themes'
import type { ReactNode } from 'react'
import type { AssetSymbol } from '../data/demo'

interface MetricCardProps {
  label: string
  value: string
  detail: string
  positive?: boolean
  icon?: ReactNode
}

export function MetricCard({ label, value, detail, positive, icon }: MetricCardProps) {
  return (
    <Card className="metric-card">
      <Text as="p" className="metric-label">{label}</Text>
      <Text as="p" className="metric-value">{value}</Text>
      <Text as="p" className={`metric-detail${positive ? ' positive' : ''}`}>
        {icon}{detail}
      </Text>
    </Card>
  )
}

interface AssetAvatarProps {
  symbol: AssetSymbol
}

const assetGlyphs: Record<AssetSymbol, string> = { BTC: '₿', ETH: 'Ξ', SOL: 'S', USDC: '$' }

export function AssetAvatar({ symbol }: AssetAvatarProps) {
  return <Avatar aria-hidden="true" fallback={assetGlyphs[symbol]} radius="full" size="2" className={`asset-avatar asset-${symbol.toLowerCase()}`} />
}

interface PanelHeadingProps {
  title: string
  detail?: string
  action?: ReactNode
}

export function PanelHeading({ title, detail, action }: PanelHeadingProps) {
  return (
    <div className="panel-heading">
      <div className="panel-title">
        <Heading as="h2" size="3" weight="medium">{title}</Heading>
        {detail && <Text size="1" className="muted">{detail}</Text>}
      </div>
      {action}
    </div>
  )
}
