import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronDown } from "@/components/icons";
import styles from "./PreviewPanel.module.css";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Tag } from "@/components/ui/Tag";
import { Chip } from "@/components/ui/Chip";
import { Alert } from "@/components/ui/Alert";
import { Switch } from "@/components/ui/Switch";
import { Checkbox } from "@/components/ui/Checkbox";
import { Card } from "@/components/ui/Card";
import { CardHeader } from "@/components/ui/CardHeader";
import { CardContent } from "@/components/ui/CardContent";
import { Metric } from "@/components/ui/Metric";
import { Divider } from "@/components/ui/Divider";
import { MastHead } from "@/components/ui/MastHead";

type Device = "desktop" | "mobile"; // still used by DeviceFrame

const GROUP_TO_PREVIEW: Record<string, string> = {
  primary: "preview-color-states",
  secondary: "preview-color-states",
  brand: "preview-badges-tags",
  "top-nav": "preview-top-nav",
  "bottom-nav": "preview-footer",
  "page-nav": "preview-footer",
};

const PREVIEW_TO_GROUP: Record<string, string> = {
  "preview-top-nav": "top-nav",
  "preview-metrics": "brand",
  "preview-color-states": "primary",
  "preview-buttons": "primary",
  "preview-badges-tags": "brand",
  "preview-footer": "bottom-nav",
};

// ── ColorStatesPreview — declared BEFORE PreviewPanel to avoid SWC hoisting issues ──

function ColorStatesPreview() {
  const states: { label: string; token: string }[] = [
    { label: "Default",    token: "--ld-semantic-color-action-fill-primary" },
    { label: "Hovered",    token: "--ld-semantic-color-action-fill-primary-hovered" },
    { label: "Pressed",    token: "--ld-semantic-color-action-fill-primary-pressed" },
    { label: "Text on",    token: "--ld-semantic-color-action-text-on-fill-primary" },
    { label: "Focus ring", token: "--ld-semantic-color-action-focus-outline" },
  ];

  const secondary: { label: string; token: string }[] = [
    { label: "Fill",   token: "--ld-semantic-color-action-fill-secondary" },
    { label: "Border", token: "--ld-semantic-color-action-border-secondary" },
    { label: "Text",   token: "--ld-semantic-color-action-text-secondary" },
  ];

  const brand: { label: string; token: string }[] = [
    { label: "Brand text",       token: "--ld-semantic-color-text-brand" },
    { label: "Brand border",     token: "--ld-semantic-color-border-brand" },
    { label: "Activated border", token: "--ld-semantic-color-border-activated" },
    { label: "Focus outline",    token: "--ld-semantic-color-action-focus-outline" },
  ];

  const sectionLabel: React.CSSProperties = {
    margin: "0 0 8px", fontSize: 11, fontWeight: 700,
    textTransform: "uppercase" as const, letterSpacing: "0.5px",
    color: "var(--ld-semantic-color-text-subtle)",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Primary interactive states */}
      <div>
        <p style={sectionLabel}>Primary — Interactive States</p>
        <div style={{ display: "flex", gap: 0, borderRadius: 8, overflow: "hidden", border: "1px solid var(--ld-semantic-color-separator)" }}>
          {states.map(({ label, token }) => (
            <div key={token} style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ height: 52, background: `var(${token})` }} />
              <div style={{ padding: "6px 8px", background: "var(--ld-semantic-color-fill-surface-primary)", borderTop: "1px solid var(--ld-semantic-color-separator)" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "var(--ld-semantic-color-text-primary)", marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: 9, fontFamily: "monospace", color: "var(--ld-semantic-color-text-subtle)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {token.replace("--ld-semantic-color-", "")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Secondary tinted states */}
      <div>
        <p style={sectionLabel}>Secondary — Tinted States</p>
        <div style={{ display: "flex", gap: 0, borderRadius: 8, overflow: "hidden", border: "1px solid var(--ld-semantic-color-separator)" }}>
          {secondary.map(({ label, token }, i) => (
            <div key={token} style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ height: 52, background: `var(${token})`, borderRight: i < secondary.length - 1 ? "1px solid var(--ld-semantic-color-separator)" : "none" }} />
              <div style={{ padding: "6px 8px", background: "var(--ld-semantic-color-fill-surface-primary)", borderTop: "1px solid var(--ld-semantic-color-separator)" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "var(--ld-semantic-color-text-primary)", marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: 9, fontFamily: "monospace", color: "var(--ld-semantic-color-text-subtle)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {token.replace("--ld-semantic-color-", "")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Brand & activated */}
      <div>
        <p style={sectionLabel}>Brand & Activated</p>
        <div style={{ display: "flex", gap: 8 }}>
          {brand.map(({ label, token }) => (
            <div key={token} style={{ flex: 1, textAlign: "center" }}>
              <div style={{ height: 28, borderRadius: 6, background: `var(${token})`, marginBottom: 4, border: "1px solid var(--ld-semantic-color-separator)" }} />
              <div style={{ fontSize: 9, fontWeight: 700, color: "var(--ld-semantic-color-text-primary)" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Device Frame — declared BEFORE PreviewPanel so it is always in scope ──────

function DeviceFrame({ device, children }: { device: Device; children: React.ReactNode }) {
  if (device === "mobile") {
    return (
      <div className={styles.phoneOuter}>
        <div className={styles.phoneSideLeft} />
        <div className={styles.phoneSideRight} />
        <div className={styles.phoneScreen}>
          <div className={styles.phoneStatusBar}>
            <span className={styles.phoneTime}>9:41</span>
            <div className={styles.phoneDynamicIsland} />
            <div className={styles.phoneStatusIcons}>
              <span>5G</span>
              <span>WiFi</span>
              <span>100%</span>
            </div>
          </div>
          <div className={styles.phoneContent}>{children}</div>
          <div className={styles.phoneHomeBar} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.browserOuter}>
      <div className={styles.browserChrome}>
        <div className={styles.browserDots}>
          <span className={`${styles.browserDot} ${styles.browserDotRed}`} />
          <span className={`${styles.browserDot} ${styles.browserDotYellow}`} />
          <span className={`${styles.browserDot} ${styles.browserDotGreen}`} />
        </div>
        <div className={styles.browserUrlBar}>
          <span className={styles.browserLock}>https</span>
          <span className={styles.browserUrl}>app.livingcreative.com/dashboard</span>
        </div>
        <div className={styles.browserDots} style={{ opacity: 0 }} aria-hidden />
      </div>
      <div className={styles.browserViewport}>{children}</div>
    </div>
  );
}

// ── Preview Card ──────────────────────────────────────────────────────────────

interface PreviewCardProps {
  id: string;
  label: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  linkedGroup?: string;
  collapsible?: boolean;
  defaultOpen?: boolean;
}

function PreviewCard({ id, label, children, isActive, onClick, linkedGroup, collapsible = false, defaultOpen = true }: PreviewCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  const handleHeaderClick = useCallback((e: React.MouseEvent) => {
    if (collapsible) {
      // toggle collapse on header click; also fire card activate
      setOpen((v) => !v);
      onClick?.();
      e.stopPropagation();
    } else {
      onClick?.();
    }
  }, [collapsible, onClick]);

  return (
    <div
      id={id}
      className={`${styles.card} ${isActive ? styles.cardActive : ""} ${onClick ? styles.cardClickable : ""}`}
      title={linkedGroup ? `Linked to: ${linkedGroup}` : undefined}
    >
      <div
        className={`${styles.cardHeader} ${collapsible ? styles.cardHeaderCollapsible : ""}`}
        onClick={handleHeaderClick}
        role={onClick || collapsible ? "button" : undefined}
        tabIndex={onClick || collapsible ? 0 : undefined}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleHeaderClick(e as any); }}
        aria-expanded={collapsible ? open : undefined}
      >
        {label}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: "auto" }}>
          {linkedGroup && (
            <span className={`${styles.cardLink} ${isActive ? styles.cardLinkActive : ""}`}>
              {linkedGroup}
            </span>
          )}
          {collapsible && (
            <ChevronDown
              style={{
                width: 13,
                height: 13,
                color: "var(--ld-semantic-color-text-subtle)",
                transition: "transform 200ms ease",
                transform: open ? "rotate(0deg)" : "rotate(-90deg)",
                flexShrink: 0,
              }}
            />
          )}
        </div>
      </div>
      {(!collapsible || open) && (
        <div className={styles.cardBody}>{children}</div>
      )}
    </div>
  );
}

// ── PreviewPanel ──────────────────────────────────────────────────────────────

interface PreviewPanelProps {
  overrides: Record<string, string>;
  getCurrentValue: (token: string) => string;
  activeGroupId?: string | null;
  onGroupActivate?: (groupId: string) => void;
}

export function PreviewPanel({
  overrides,
  getCurrentValue,
  activeGroupId,
  onGroupActivate,
}: PreviewPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeGroupId) return;
    const previewId = GROUP_TO_PREVIEW[activeGroupId];
    if (!previewId) return;
    const el = document.getElementById(previewId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [activeGroupId]);

  const activePreviewId = activeGroupId ? GROUP_TO_PREVIEW[activeGroupId] : null;

  const handleCardClick = (previewId: string) => {
    const groupId = PREVIEW_TO_GROUP[previewId];
    if (groupId && onGroupActivate) onGroupActivate(groupId);
  };

  const previewCards = (
    <>
      <PreviewCard id="preview-color-states" label="Primary Color States" isActive={activePreviewId === "preview-color-states"} onClick={() => handleCardClick("preview-color-states")} linkedGroup="Primary Action tokens" collapsible defaultOpen={false}>
        <ColorStatesPreview />
      </PreviewCard>

      <PreviewCard id="preview-top-nav" label="Top Navigation" isActive={activePreviewId === "preview-top-nav"} onClick={() => handleCardClick("preview-top-nav")} linkedGroup="Top Navigation tokens">
        <TopNavPreview />
      </PreviewCard>

      <PreviewCard id="preview-metrics" label="Metrics" isActive={activePreviewId === "preview-metrics"} onClick={() => handleCardClick("preview-metrics")}>
        <MetricsPreview />
      </PreviewCard>

      <PreviewCard id="preview-buttons" label="Buttons" isActive={activePreviewId === "preview-buttons"} onClick={() => handleCardClick("preview-buttons")} linkedGroup="Primary / Secondary Action tokens">
        <ButtonsPreview />
      </PreviewCard>

      <PreviewCard id="preview-badges-tags" label="Badges & Tags" isActive={activePreviewId === "preview-badges-tags"} onClick={() => handleCardClick("preview-badges-tags")} linkedGroup="Brand tokens">
        <BadgesTagsPreview />
      </PreviewCard>

      <PreviewCard id="preview-chips" label="Chips" isActive={activePreviewId === "preview-chips"} onClick={() => handleCardClick("preview-chips")}>
        <ChipsPreview />
      </PreviewCard>

      <PreviewCard id="preview-alerts" label="Alerts" isActive={activePreviewId === "preview-alerts"} onClick={() => handleCardClick("preview-alerts")}>
        <AlertsPreview />
      </PreviewCard>

      <PreviewCard id="preview-card" label="Card" isActive={activePreviewId === "preview-card"} onClick={() => handleCardClick("preview-card")}>
        <CardPreview />
      </PreviewCard>

      <PreviewCard id="preview-form" label="Form Controls" isActive={activePreviewId === "preview-form"} onClick={() => handleCardClick("preview-form")}>
        <FormControlsPreview />
      </PreviewCard>

      <PreviewCard id="preview-textfield" label="Text Field" isActive={activePreviewId === "preview-textfield"} onClick={() => handleCardClick("preview-textfield")}>
        <input type="text" className={styles.textField} defaultValue="Sample input text" readOnly />
      </PreviewCard>

      <PreviewCard id="preview-footer" label="Footer" isActive={activePreviewId === "preview-footer"} onClick={() => handleCardClick("preview-footer")} linkedGroup="Bottom Nav / Page Nav tokens">
        <DesktopFooterPreview />
      </PreviewCard>
    </>
  );

  return (
    <div className={styles.panel} ref={panelRef}>
      <DeviceFrame device="desktop">
        {previewCards}
      </DeviceFrame>
    </div>
  );
}

// ── Sub-previews ──────────────────────────────────────────────────────────────

function TopNavPreview() {
  return <MastHead appName="Living Creative" />;
}

function MetricsPreview() {
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Metric title="Revenue" value="$48,200" unit="USD" variant="positiveUp" textLabel="+12% vs last month" />
      <Metric title="Orders" value="1,834" variant="negativeDown" textLabel="-3% vs last month" />
    </div>
  );
}

function ButtonsPreview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div className={styles.buttonsGrid}>
        <Button variant="primary" size="medium">Primary</Button>
        <Button variant="secondary" size="medium">Secondary</Button>
        <Button variant="tertiary" size="medium">Tertiary</Button>
        <Button variant="destructive" size="medium">Destructive</Button>
      </div>
      <div className={styles.buttonsGrid}>
        <Button variant="primary" size="small">Primary sm</Button>
        <Button variant="secondary" size="small">Secondary sm</Button>
        <Button variant="tertiary" size="small">Tertiary sm</Button>
        <Button variant="destructive" size="small">Destructive sm</Button>
      </div>
    </div>
  );
}

function BadgesTagsPreview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <Badge variant="info" value={3} aria-label="3 items" />
        <Badge variant="success" value={12} aria-label="12 items" />
        <Badge variant="warning" value={5} aria-label="5 items" />
        <Badge variant="error" value={99} aria-label="99 items" />
        <Badge variant="neutral" value={0} aria-label="0 items" />
      </div>
      <Divider />
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <Tag variant="primary" color="brand">Brand</Tag>
        <Tag variant="secondary" color="positive">Positive</Tag>
        <Tag variant="secondary" color="negative">Negative</Tag>
        <Tag variant="secondary" color="warning">Warning</Tag>
        <Tag variant="tertiary" color="info">Info</Tag>
        <Tag variant="tertiary" color="purple">Purple</Tag>
      </div>
    </div>
  );
}

function ChipsPreview() {
  const [selected, setSelected] = useState<string[]>(["All"]);
  const chips = ["All", "Active", "Paused", "Draft"];
  const toggle = (chip: string) =>
    setSelected((prev) => prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]);
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {chips.map((chip) => (
        <Chip key={chip} size="small" selected={selected.includes(chip)} onClick={() => toggle(chip)}>
          {chip}
        </Chip>
      ))}
    </div>
  );
}

function AlertsPreview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Alert variant="info">Informational alert with a helpful message.</Alert>
      <Alert variant="success">Action completed successfully.</Alert>
      <Alert variant="warning">Please review before continuing.</Alert>
      <Alert variant="error">Something went wrong. Please try again.</Alert>
    </div>
  );
}

function CardPreview() {
  return (
    <Card size="small">
      <CardHeader title="Campaign Overview" trailing={<Tag variant="secondary" color="positive">Active</Tag>} />
      <CardContent>
        <p style={{ margin: 0, fontSize: "var(--ld-semantic-font-body-small-size)", color: "var(--ld-semantic-color-text-secondary)" }}>
          Surface color, elevation, and border-radius token changes are reflected here.
        </p>
      </CardContent>
    </Card>
  );
}

function FormControlsPreview() {
  const [checked1, setChecked1] = useState(true);
  const [checked2, setChecked2] = useState(false);
  const [switchOn, setSwitchOn] = useState(true);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
        <Checkbox checked={checked1} onCheckedChange={(v) => setChecked1(v === true)} label="Checked" />
        <Checkbox checked={checked2} onCheckedChange={(v) => setChecked2(v === true)} label="Unchecked" />
        <Checkbox checked="indeterminate" label="Indeterminate" />
        <Checkbox checked={false} disabled label="Disabled" />
      </div>
      <Divider />
      <Switch label="Notifications enabled" checked={switchOn} onChange={(v) => setSwitchOn(v)} />
    </div>
  );
}

function DesktopFooterPreview() {
  const links = ["Help", "Privacy", "Terms", "Accessibility", "Careers", "Store Directory", "About Us"];
  return (
    <div className={styles.desktopFooter}>
      <div className={styles.desktopFooterLinks}>
        {links.map((l) => <a key={l} className={styles.desktopFooterLink} href="#">{l}</a>)}
      </div>
      <div className={styles.desktopFooterCopy}>© 2025 Walmart Inc. All Rights Reserved.</div>
    </div>
  );
}

function MobileFooterPreview() {
  return (
    <div style={{ background: "var(--ld-semantic-color-fill-surface-secondary, #f1f1f2)", borderRadius: 6, overflow: "hidden", fontFamily: "var(--ld-semantic-font-family-sans)" }}>
      <div style={{ display: "flex", justifyContent: "space-around", padding: "12px 16px", borderBottom: "1px solid var(--ld-semantic-color-separator, #e3e4e5)" }}>
        {["Help", "Contact", "Track Order"].map((l) => (
          <a key={l} href="#" style={{ fontSize: 12, color: "var(--ld-semantic-color-text-secondary, #515357)", textDecoration: "none" }}>{l}</a>
        ))}
      </div>
      <div style={{ padding: "10px 16px", textAlign: "center" }}>
        <p style={{ fontSize: 11, color: "var(--ld-semantic-color-text-subtle, #74767c)", margin: 0 }}>© 2025 Walmart Inc.</p>
      </div>
    </div>
  );
}
