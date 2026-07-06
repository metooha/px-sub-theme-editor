import { TableCommand, SortField } from '@/contexts/MartyContext';

/**
 * Parses a natural-language user message into a structured TableCommand.
 * Returns null if no table command is detected (fall through to normal chat).
 */
export function parseTableCommand(message: string): TableCommand | null {
  const lower = message.toLowerCase().trim();

  /* ── Undo / Revert ─────────────────────────────────────────────── */
  if (/\b(undo|revert|go back|reset|restore)\b/.test(lower)) {
    return { type: 'REVERT_PREVIEWS' };
  }

  /* ── Apply ──────────────────────────────────────────────────────── */
  if (/\b(apply|confirm|looks good|save|commit|keep it)\b/.test(lower)) {
    return { type: 'APPLY_PREVIEWS' };
  }

  /* ── Status filter ──────────────────────────────────────────────── */
  // "show all" / "remove filters" / "clear filters"
  if (/(show all|remove filter|clear filter|all status|no filter)/.test(lower)) {
    return { type: 'FILTER_STATUS', values: [] };
  }

  const statusMatches: string[] = [];
  if (/\blive\b/.test(lower)) statusMatches.push('Live');
  if (/\bscheduled\b/.test(lower)) statusMatches.push('Scheduled');
  if (/\bpaused\b/.test(lower)) statusMatches.push('Paused');
  if (/\bcompleted?\b/.test(lower)) statusMatches.push('Completed');

  if (statusMatches.length > 0 && /(filter|show|only|display|just|status)/.test(lower)) {
    return { type: 'FILTER_STATUS', values: statusMatches };
  }

  /* ── Column visibility ───────────────────────────────────────────── */
  const COLUMN_ALIASES: Record<string, string> = {
    'pacing': 'pacing',
    'budget': 'totalBudget',
    'total budget': 'totalBudget',
    'impressions': 'impressions',
    'targeting': 'targetingStrategy',
    'targeting strategy': 'targetingStrategy',
    'recommendations': 'recommendations',
    'status': 'status',
  };

  for (const [alias, colId] of Object.entries(COLUMN_ALIASES)) {
    const re = new RegExp(`(show|display|unhide|add)\\s+(the\\s+)?${alias}\\s+(column)?`, 'i');
    if (re.test(lower)) return { type: 'SET_COLUMN_VISIBILITY', columnId: colId, visible: true };

    const reHide = new RegExp(`(hide|remove|turn off)\\s+(the\\s+)?${alias}\\s+(column)?`, 'i');
    if (reHide.test(lower)) return { type: 'SET_COLUMN_VISIBILITY', columnId: colId, visible: false };
  }

  /* ── Search ──────────────────────────────────────────────────────── */
  const searchMatch = lower.match(/(?:search|find|look for|filter by name)\s+(?:for\s+)?[""']?(.+?)[""']?\s*$/);
  if (searchMatch) {
    return { type: 'SEARCH', query: searchMatch[1].trim() };
  }

  /* ── Sort ───────────────────────────────────────────────────────── */
  const SORT_FIELD_ALIASES: Array<[RegExp, SortField]> = [
    [/\b(name|campaign name|alphabetical)\b/, 'name'],
    [/\bstatus\b/, 'status'],
    [/\b(budget|total budget)\b/, 'totalBudget'],
    [/\bimpressions\b/, 'impressions'],
    [/\bpacing\b/, 'pacing'],
  ];

  if (/\bsort\b/.test(lower) || /\border by\b/.test(lower)) {
    for (const [re, field] of SORT_FIELD_ALIASES) {
      if (re.test(lower)) {
        const dir = /desc|high(est)?|z.a|largest/.test(lower) ? 'desc' : 'asc';
        return { type: 'SORT', field, dir };
      }
    }
  }

  /* ── Budget preview ─────────────────────────────────────────────── */
  // "increase all budgets by 10%"
  const percentMatch = lower.match(/(?:increase|raise|boost|add|reduce|cut|decrease|lower)\s+(?:all\s+)?(?:budgets?|spend)\s+by\s+(\d+(?:\.\d+)?)\s*%/);
  if (percentMatch) {
    const amount = parseFloat(percentMatch[1]);
    const isNegative = /\b(reduce|cut|decrease|lower)\b/.test(lower);
    return { type: 'PREVIEW_BUDGET_ADJUSTMENT', mode: 'percent', amount: isNegative ? -amount : amount };
  }

  // "add $5000 to each campaign" / "increase by $5000"
  const absoluteMatch = lower.match(/(?:increase|raise|boost|add|reduce|cut|decrease|lower)\s+(?:all\s+)?(?:budgets?\s+)?by\s+\$?([\d,]+(?:\.\d+)?)/);
  if (absoluteMatch) {
    const amount = parseFloat(absoluteMatch[1].replace(/,/g, ''));
    const isNegative = /\b(reduce|cut|decrease|lower)\b/.test(lower);
    return { type: 'PREVIEW_BUDGET_ADJUSTMENT', mode: 'absolute', amount: isNegative ? -amount : amount };
  }

  // "$5000 more per campaign" / "give each campaign $10k"
  const dollarMatch = lower.match(/\$?([\d,]+(?:\.\d+)?)\s*(?:k)?\s+(?:more|extra|additional|each|per campaign)/);
  if (dollarMatch) {
    let amount = parseFloat(dollarMatch[1].replace(/,/g, ''));
    if (/\d+k\b/.test(lower)) amount *= 1000;
    return { type: 'PREVIEW_BUDGET_ADJUSTMENT', mode: 'absolute', amount };
  }

  return null;
}

/**
 * Generates a natural language confirmation message for a table command.
 */
export function getTableCommandConfirmation(
  cmd: TableCommand,
  campaignCount: number,
  previewSummary?: { totalExtra: string; impressionEstimate: string },
): string {
  switch (cmd.type) {
    case 'FILTER_STATUS': {
      if (cmd.values.length === 0) {
        return "Done! Showing all campaigns. All status filters have been cleared.";
      }
      const labels = cmd.values.join(', ');
      return `Done! I've filtered to show only **${labels}** campaigns. Say "show all" to remove the filter, or ask me something else.`;
    }
    case 'SEARCH':
      return `Searching for "${cmd.query}". I've updated the search filter — clear it by saying "clear search".`;
    case 'SET_COLUMN_VISIBILITY':
      return cmd.visible
        ? `The **${cmd.columnId}** column is now visible.`
        : `The **${cmd.columnId}** column has been hidden. Say "show ${cmd.columnId}" to bring it back.`;
    case 'SORT': {
      const dir = cmd.dir === 'asc' ? 'ascending' : 'descending';
      return `Sorted by **${cmd.field}** (${dir}). Say "sort by [column]" to change the sort.`;
    }
    case 'PREVIEW_BUDGET_ADJUSTMENT': {
      const sign = cmd.amount >= 0 ? '+' : '';
      const label = cmd.mode === 'percent'
        ? `${sign}${cmd.amount}%`
        : `${sign}$${Math.abs(cmd.amount).toLocaleString()}`;
      const summary = previewSummary
        ? ` Total additional spend: ~${previewSummary.totalExtra}. Estimated impressions impact: ${previewSummary.impressionEstimate}.`
        : '';
      return `Here's a preview of a **${label} budget adjustment** across all ${campaignCount} campaigns.${summary} Review the highlighted values in the table — say **"apply"** to confirm or **"undo"** to revert.`;
    }
    case 'APPLY_PREVIEWS':
      return "Changes applied! The budget adjustments have been committed.";
    case 'REVERT_PREVIEWS':
      return "Reverted! The table is back to where it was before.";
  }
}
