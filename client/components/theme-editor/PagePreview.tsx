/**
 * PagePreview — a realistic mini-page reflecting live theme token overrides.
 * Renders either a desktop browser frame or a mobile phone frame.
 * Mobile layout is flat (no elevated section containers).
 */
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CardContent } from "@/components/ui/CardContent";
import { Metric } from "@/components/ui/Metric";
import { Tag } from "@/components/ui/Tag";
import { Alert } from "@/components/ui/Alert";
import { Chip } from "@/components/ui/Chip";
import { Switch } from "@/components/ui/Switch";
import { Divider } from "@/components/ui/Divider";
import { PrimarySection, SecondarySection, TertiarySection } from "@/components/ui/Section";
import { MastHead } from "@/components/ui/MastHead";
import styles from "./PagePreview.module.css";

const TABLE_DATA = [
  { id: 1, name: "Summer Sale", status: "active",  budget: "$12,400", impressions: "1.2M", ctr: "3.8%" },
  { id: 2, name: "Back to School", status: "paused", budget: "$8,200",  impressions: "820K", ctr: "2.1%" },
  { id: 3, name: "Holiday Promo", status: "draft",  budget: "$24,000", impressions: "—",   ctr: "—"   },
];

const STATUS_COLOR: Record<string, "positive" | "warning" | "gray"> = {
  active: "positive",
  paused: "warning",
  draft:  "gray",
};

// ── Shared sub-components ─────────────────────────────────────────────────────

function PageMetrics({ mobile }: { mobile: boolean }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(4,1fr)", gap: 12 }}>
      <Card size="small"><CardContent><Metric title="Total Spend" value="$44,600" unit="USD" variant="positiveUp" textLabel="+8%" /></CardContent></Card>
      <Card size="small"><CardContent><Metric title="Impressions" value="2.4M" variant="positiveUp" textLabel="+22%" /></CardContent></Card>
      <Card size="small"><CardContent><Metric title="Avg. CTR" value="3.1" unit="%" variant="negativeDown" textLabel="-0.4%" /></CardContent></Card>
      <Card size="small"><CardContent><Metric title="Campaigns" value="6" /></CardContent></Card>
    </div>
  );
}

function CampaignTable({ mobile }: { mobile: boolean }) {
  const [filter, setFilter] = useState("All");
  const [live, setLive] = useState(true);

  // Mobile: card list instead of table
  if (mobile) {
    return (
      <div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
          {["All", "Active", "Paused"].map((f) => (
            <Chip key={f} size="small" selected={filter === f} onClick={() => setFilter(f)}>{f}</Chip>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {TABLE_DATA.map((row) => (
            <div key={row.id} style={{
              background: "var(--ld-semantic-color-fill-surface-primary)",
              borderRadius: 8,
              padding: "12px",
              border: "1px solid var(--ld-semantic-color-separator)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ld-semantic-color-text-primary)" }}>{row.name}</span>
                <Tag variant="secondary" color={STATUS_COLOR[row.status]}>
                  {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                </Tag>
              </div>
              <div style={{ display: "flex", gap: 16, fontSize: 11, color: "var(--ld-semantic-color-text-subtle)" }}>
                <span>Budget: <strong style={{ color: "var(--ld-semantic-color-text-primary)" }}>{row.budget}</strong></span>
                <span>CTR: <strong style={{ color: "var(--ld-semantic-color-text-primary)" }}>{row.ctr}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Desktop: regular table
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, paddingBottom: 12 }}>
        <div style={{ display: "flex", gap: 8 }}>
          {["All", "Active", "Paused", "Draft"].map((f) => (
            <Chip key={f} size="small" selected={filter === f} onClick={() => setFilter(f)}>{f}</Chip>
          ))}
        </div>
        <Switch label="Live data" checked={live} onChange={setLive} />
      </div>
      <Divider />
      <div style={{ overflowX: "auto", paddingTop: 12 }}>
        <table className={styles.table}>
          <thead>
            <tr>
              {["Campaign","Status","Budget","Impressions","CTR","Actions"].map((h) => (
                <th key={h} className={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_DATA.map((row, i) => (
              <tr key={row.id} className={i % 2 === 0 ? styles.trEven : styles.trOdd}>
                <td className={styles.td}>{row.name}</td>
                <td className={styles.td}><Tag variant="secondary" color={STATUS_COLOR[row.status]}>{row.status.charAt(0).toUpperCase() + row.status.slice(1)}</Tag></td>
                <td className={styles.td}>{row.budget}</td>
                <td className={styles.td}>{row.impressions}</td>
                <td className={styles.td}>{row.ctr}</td>
                <td className={styles.td}><div style={{ display: "flex", gap: 6 }}><Button variant="tertiary" size="small">Edit</Button><Button variant="secondary" size="small">View</Button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Desktop layout (with elevated Section containers) ─────────────────────────

function DesktopPage() {
  return (
    <div className={styles.page}>
      <MastHead appName="PX Platform" />
      <div className={styles.body}>
        <div className={styles.breadcrumb}>
          <span className={styles.breadcrumbItem}>Home</span>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbItem}>Campaigns</span>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbCurrent}>Overview</span>
        </div>
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageTitle}>Campaign Overview</h1>
            <p className={styles.pageSubtitle}>Manage and monitor your advertising campaigns.</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="secondary" size="small">Export</Button>
            <Button variant="primary" size="small">+ New Campaign</Button>
          </div>
        </div>
        <Alert variant="info">2 campaigns need attention — review budget pacing before end of month.</Alert>
        <PageMetrics mobile={false} />
        <PrimarySection title="Campaigns" description="All campaigns for the current quarter." divider>
          <SecondarySection>
            <CampaignTable mobile={false} />
          </SecondarySection>
          <TertiarySection title="Data last updated" UNSAFE_style={{ marginTop: "var(--ld-primitive-scale-space-200)" }}>
            <p className={styles.subtleText}>Today at 9:42 AM — auto-refreshes every 5 minutes.</p>
          </TertiarySection>
        </PrimarySection>
        <footer className={styles.footer}>
          <div className={styles.footerLinks}>
            {["Help","Privacy","Terms","Accessibility"].map((l) => (
              <a key={l} href="#" className={styles.footerLink}>{l}</a>
            ))}
          </div>
          <span className={styles.footerCopy}>© 2025 Walmart Inc.</span>
        </footer>
      </div>
    </div>
  );
}

// ── Mobile layout (flat — no elevated containers) ─────────────────────────────

function MobilePage() {
  return (
    <div style={{ fontFamily: "var(--ld-semantic-font-family-sans)", background: "var(--ld-semantic-color-fill-subtle)", minHeight: "100%", display: "flex", flexDirection: "column" }}>
      {/* Compact header */}
      <div style={{ background: "var(--ld-semantic-color-top-nav-fill)", padding: "12px 16px", borderBottom: "1px solid var(--ld-semantic-color-separator)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: "var(--ld-semantic-color-top-nav-app-name)" }}>PX Platform</span>
        <Button variant="primary" size="small">+ New</Button>
      </div>

      {/* Body */}
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>
        {/* Page title */}
        <div>
          <h1 style={{ margin: "0 0 2px", fontSize: 18, fontWeight: 700, color: "var(--ld-semantic-color-text-primary)" }}>Campaign Overview</h1>
          <p style={{ margin: 0, fontSize: 12, color: "var(--ld-semantic-color-text-subtle)" }}>Advertising campaigns</p>
        </div>

        {/* Alert */}
        <Alert variant="info">2 campaigns need attention.</Alert>

        {/* Metrics — flat, no section wrapper */}
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--ld-semantic-color-text-subtle)" }}>Performance</p>
          <PageMetrics mobile />
        </div>

        <Divider />

        {/* Campaigns — flat list */}
        <div>
          <p style={{ margin: "0 0 12px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--ld-semantic-color-text-subtle)" }}>Campaigns</p>
          <CampaignTable mobile />
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 16px", borderTop: "1px solid var(--ld-semantic-color-separator)", display: "flex", justifyContent: "center", gap: 16, background: "var(--ld-semantic-color-fill-surface-secondary)" }}>
        {["Help","Privacy","Terms"].map((l) => (
          <a key={l} href="#" style={{ fontSize: 11, color: "var(--ld-semantic-color-text-secondary)", textDecoration: "none" }}>{l}</a>
        ))}
      </div>
    </div>
  );
}

// ── Phone frame (inline styles — no cross-import from PreviewPanel) ────────────

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: "relative", width: 300, margin: "0 auto", background: "#1c1c1e", borderRadius: 48, padding: "16px 10px", boxShadow: "0 0 0 1px #3a3a3a, 0 8px 40px rgba(0,0,0,0.4), inset 0 0 0 1px #444" }}>
      {/* Side buttons */}
      <div style={{ position: "absolute", left: -3, top: 90, width: 3, height: 28, background: "#2c2c2e", borderRadius: "2px 0 0 2px", boxShadow: "0 40px 0 #2c2c2e, 0 80px 0 #2c2c2e" }} />
      <div style={{ position: "absolute", right: -3, top: 118, width: 3, height: 56, background: "#2c2c2e", borderRadius: "0 2px 2px 0" }} />
      {/* Screen */}
      <div style={{ background: "var(--ld-semantic-color-fill-surface-primary, #fff)", borderRadius: 36, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {/* Status bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px 4px", background: "var(--ld-semantic-color-fill-surface-primary, #fff)", position: "relative", flexShrink: 0 }}>
          <span style={{ fontSize: 12, fontWeight: 700, fontFamily: "var(--ld-semantic-font-family-sans)", color: "var(--ld-semantic-color-text-primary)", zIndex: 1 }}>9:41</span>
          <div style={{ position: "absolute", left: "50%", top: 10, transform: "translateX(-50%)", width: 86, height: 24, background: "#1c1c1e", borderRadius: 20 }} />
          <div style={{ display: "flex", gap: 4, alignItems: "center", fontSize: 8, color: "var(--ld-semantic-color-text-primary)", zIndex: 1 }}>
            <span>5G</span><span>WiFi</span><span>100%</span>
          </div>
        </div>
        {/* Content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>{children}</div>
        {/* Home indicator */}
        <div style={{ width: 100, height: 4, background: "#1c1c1e", borderRadius: 2, margin: "8px auto", opacity: 0.25, flexShrink: 0 }} />
      </div>
    </div>
  );
}

// ── Browser frame (inline styles) ─────────────────────────────────────────────

function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid var(--ld-semantic-color-separator, #d0d0d0)", boxShadow: "0 4px 24px rgba(0,0,0,0.12)" }}>
      <div style={{ background: "#e8e8e8", padding: "9px 14px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid #d0d0d0" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {["#ff5f57","#ffbd2e","#28c940"].map((c) => (
            <span key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c, display: "block" }} />
          ))}
        </div>
        <div style={{ flex: 1, background: "#fff", borderRadius: 5, border: "1px solid #d0d0d0", display: "flex", alignItems: "center", gap: 6, padding: "4px 10px", fontSize: 11, fontFamily: "var(--ld-semantic-font-family-sans)", overflow: "hidden" }}>
          <span style={{ color: "#888", flexShrink: 0 }}>https</span>
          <span style={{ color: "#444", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>app.livingcreative.com/dashboard</span>
        </div>
        <div style={{ width: 44, flexShrink: 0 }} />
      </div>
      <div style={{ background: "var(--ld-semantic-color-fill-subtle, #f8f8f8)" }}>{children}</div>
    </div>
  );
}

// ── Export ────────────────────────────────────────────────────────────────────

export function PagePreview({ device = "desktop" }: { device?: "desktop" | "mobile" }) {
  if (device === "mobile") {
    return <PhoneFrame><MobilePage /></PhoneFrame>;
  }
  return <BrowserFrame><DesktopPage /></BrowserFrame>;
}
