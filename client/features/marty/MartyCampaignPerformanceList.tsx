/* ── Campaign Performance List ──────────────────────────────────
   Renders the numbered campaign performance items shown in the
   Marty chat before recommendations, matching the Figma design.
   ─────────────────────────────────────────────────────────────── */

interface CampaignItem {
  id: string;
  name: string;
  attributedSales: string;
  roas: string;
  cvr: string;
  adSpend: string;
}

const CAMPAIGN_ITEMS: CampaignItem[] = [
  {
    id: '1',
    name: 'Free Rein Coffee 17713 SP Auto',
    attributedSales: '$675.60',
    roas: '$3.94',
    cvr: '12.96%',
    adSpend: '$171.66',
  },
  {
    id: '2',
    name: 'Free Rein Coffee 21271 SP Auto',
    attributedSales: '$3,545.43',
    roas: '$3.31',
    cvr: '19.46%',
    adSpend: '$1,070.43',
  },
  {
    id: '3',
    name: 'Free Rein Coffee 21270 SP Auto',
    attributedSales: '$1,462.89',
    roas: '$3.21',
    cvr: '22.38%',
    adSpend: '$455.32',
  },
  {
    id: '4',
    name: 'Free Rein Coffee 21606 SP Auto',
    attributedSales: '$3,578.54',
    roas: '$3.11',
    cvr: '22.73%',
    adSpend: '$1,152.20',
  },
  {
    id: '5',
    name: 'Free Rein Coffee 21372 SP Auto',
    attributedSales: '$4,803.65',
    roas: '$2.76',
    cvr: '24.83%',
    adSpend: '$1,742.73',
  },
];

function CampaignItemRow({ item, index }: { item: CampaignItem; index: number }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 'var(--ld-primitive-scale-space-50, 4px)',
      alignSelf: 'stretch',
    }}>
      <div style={{
        alignSelf: 'stretch',
        fontWeight: 700,
        fontSize: 'var(--ld-semantic-font-body-medium-size, 16px)',
        lineHeight: 'var(--ld-semantic-font-body-medium-lineheight, 1.5)',
        color: 'var(--ld-semantic-color-text)',
      }}>
        {index + 1}. {item.name}
      </div>
      <div style={{
        alignSelf: 'stretch',
        fontSize: 'var(--ld-semantic-font-body-small-size, 14px)',
        lineHeight: 'var(--ld-semantic-font-body-small-lineheight, 1.43)',
        color: 'var(--ld-semantic-color-text)',
        whiteSpace: 'pre-wrap',
      }}>
        <strong>{item.attributedSales}</strong>  Attributed sales{'\n'}
        <strong>{item.roas}</strong>  Return on ad spend (ROAS){'\n'}
        <strong>{item.cvr}</strong>  Conversion rate (CVR){'\n'}
        <strong>{item.adSpend}</strong>  Ad spend
      </div>
    </div>
  );
}

export function MartyCampaignPerformanceList() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 'var(--ld-primitive-scale-space-200, 16px)',
    }}>
      {CAMPAIGN_ITEMS.map((item, i) => (
        <CampaignItemRow key={item.id} item={item} index={i} />
      ))}
    </div>
  );
}
