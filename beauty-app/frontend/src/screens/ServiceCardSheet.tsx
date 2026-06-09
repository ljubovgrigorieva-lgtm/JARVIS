import { PortfolioItem } from '../lib/api.ts'

interface Props {
  item: PortfolioItem
  onClose: () => void
}

export function ServiceCardSheet({ onClose }: Props) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200 }} onClick={onClose}>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#fff', padding: 16, borderRadius: '16px 16px 0 0' }}>
        Service Card (placeholder)
      </div>
    </div>
  )
}
