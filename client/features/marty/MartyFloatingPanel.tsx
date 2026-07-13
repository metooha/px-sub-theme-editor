import { useState, useEffect, useRef, type ReactNode, Fragment } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Reports from "@/components/icons/Reports";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { DateField } from "@/components/ui/DateField";
import { Checkbox } from "@/components/ui/Checkbox";
import { useMarty } from "@/contexts/MartyContext";
import { generateMockResponse } from "./MartyUtils";
import { parseTableCommand, getTableCommandConfirmation } from "./MartyTableCommandParser";
import { Tag } from "@/components/ui/Tag";
import { Badge } from "@/components/ui/Badge";
import { MartySkills, type Skill } from './MartySkills';
import { MartyRecommendationsCarousel } from './MartyRecommendationsCarousel';
import { MartyCampaignPerformanceList } from './MartyCampaignPerformanceList';
import { DataTable } from '@/components/ui/DataTable';
import { DataTableRow } from '@/components/ui/DataTableRow';
import { DataTableHeader } from '@/components/ui/DataTableHeader';
import { DataTableCell } from '@/components/ui/DataTableCellText';
import styles from './MartyFloatingPanel.module.css';

/** Renders **bold** markdown as <strong> elements, preserving newlines. */
function renderMarkdown(text: string): ReactNode {
  return text.split('\n').map((line, li) => {
    const parts: ReactNode[] = [];
    const re = /\*\*(.+?)\*\*/g;
    let last = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(line)) !== null) {
      if (m.index > last) parts.push(line.slice(last, m.index));
      parts.push(<strong key={m.index}>{m[1]}</strong>);
      last = m.index + m[0].length;
    }
    if (last < line.length) parts.push(line.slice(last));
    return (
      <Fragment key={li}>
        {parts}
        {li < text.split('\n').length - 1 && '\n'}
      </Fragment>
    );
  });
}

function generateContextualResponse(context: string): string {
  const lower = context.toLowerCase();
  if (/days window|date range|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|fiscal|quarter/.test(lower)) {
    return `The date range shown (e.g., Jan 1 – Jan 31, 2025) falls within Walmart's Fiscal Year 2025 Q4, which runs from November 2024 through January 2025. The "14 days window" means metrics are attributed to ad exposures within 14 days of a customer interaction.`;
  }
  if (/campaign|ad group|creative|holiday|promotions|brand awareness/.test(lower)) {
    return `This entry is a campaign or ad group in your media plan. Campaigns group ad sets by objective and budget. Performance metrics shown reflect the selected date range and attribution window.`;
  }
  if (/search|live|scheduled|paused|completed|status/.test(lower)) {
    return `This filter controls which campaign statuses are shown. "Live" means currently running; "Scheduled" means set to start in the future; "Paused" means manually stopped; "Completed" means the campaign's end date has passed.`;
  }
  if (/impressions|spend|roas|ecpm|attributed|orders|units/.test(lower)) {
    return `This metric measures ad delivery efficiency. Click the element selector and choose a specific metric tile to see a detailed calculation breakdown with source-level data.`;
  }
  if (/heading|body text|call to action|category/.test(lower)) {
    return `This is a content card component showing category, heading, body copy, and a call-to-action. Cards like this are used to surface key information or drive user actions within a campaign or recommendation flow.`;
  }
  return `Here's what I found about that element: "${context}". You can ask me specific questions about this section, how it's calculated, or what it means in the context of your campaign performance.`;
}

type ViewState = 'welcome' | 'chat' | 'campaignSetup' | 'campaignForm' | 'campaignReady' | 'campaignScheduled';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'mark';
  content: string;
  timestamp: Date;
  isAction?: boolean;
  feedback?: 'up' | 'down' | null;
  type?: 'text' | 'recommendations' | 'performance' | 'metricBreakdown';
  metricName?: string;
}

const MARK_AVATAR_URL = 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fa89e103cb07a44d3b9b5886b04f29ffa?format=webp&width=800&height=1200';
const FAB_AVATAR_SIZE = 42;

/** Mark's avatar — uses his profile image */
function MarkAvatar({ size = 28 }: { size?: number }) {
  return (
    <img
      src={MARK_AVATAR_URL}
      alt="Mark"
      className="rounded-full flex-shrink-0 object-cover"
      style={{
        width: size,
        height: size,
      }}
    />
  );
}

export default function MartyFloatingPanel() {
  const { t } = useTranslation('marty');
  const { isMinimized, setIsMinimized, isDocked, setIsDocked, isSidePanel, setIsSidePanel, dockedSection, setDockedSection, initialPosition, setInitialPosition, isElementSelecting, setIsElementSelecting, pendingMessage, setPendingMessage, selectedElements, setSelectedElements, setTableCommand } = useMarty();
  const navigate = useNavigate();
  const location = useLocation();
  const [viewState, setViewState] = useState<ViewState>('welcome');
  const [userMessage, setUserMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [avatarExiting, setAvatarExiting] = useState(false);
  const [showChips, setShowChips] = useState(true);
  const [inputPlaceholder, setInputPlaceholder] = useState('Show me recommendations');
  const [markConcernIndex, setMarkConcernIndex] = useState(0);
  const [connectedToMark, setConnectedToMark] = useState(false);
  const [panelWidth, setPanelWidth] = useState(425);
  const isResizingRef = useRef(false);
  const resizeStartXRef = useRef(0);
  const resizeStartWidthRef = useRef(425);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isDraggingRef = useRef(false);
  const timersRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  // Quick Prompt palette state
  const [showQuickPrompts, setShowQuickPrompts] = useState(false);
  const lastEscRef = useRef<number>(0);

  // Helper to track setTimeout calls and auto-cleanup
  const safeTimeout = (fn: () => void, delay: number) => {
    const id = setTimeout(() => {
      timersRef.current.delete(id);
      fn();
    }, delay);
    timersRef.current.add(id);
    return id;
  };

  // Cleanup all tracked timers on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach(id => clearTimeout(id));
      timersRef.current.clear();
    };
  }, []);

  // Double-Escape quick prompt palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showQuickPrompts) {
        if (e.key === 'Escape') {
          e.preventDefault();
          setShowQuickPrompts(false);
          return;
        }
        if (e.key === '0') {
          e.preventDefault();
          handleResetMarty();
          return;
        }
        const n = parseInt(e.key);
        if (!isNaN(n) && n >= 1 && n <= 9) {
          e.preventDefault();
          sendQuickPrompt(QUICK_PROMPTS[n - 1].text);
          return;
        }
        return;
      }
      if (e.key === 'Escape') {
        const now = Date.now();
        if (now - lastEscRef.current < 500) {
          e.preventDefault();
          setShowQuickPrompts(true);
        }
        lastEscRef.current = now;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showQuickPrompts]);

  const QUICK_PROMPTS = [
    { text: 'Show only live campaigns',      category: 'Filter'  },
    { text: 'Filter to live and scheduled',  category: 'Filter'  },
    { text: 'Show all statuses',             category: 'Filter'  },
    { text: 'Search for Campaign 100',       category: 'Search'  },
    { text: 'Show the pacing column',        category: 'Column'  },
    { text: 'Hide the targeting column',     category: 'Column'  },
    { text: 'Sort by impressions',           category: 'Sort'    },
    { text: 'Increase all budgets by 10%',   category: 'Budget'  },
    { text: 'Undo',                          category: 'Action'  },
  ];

  const handleResetMarty = () => {
    setShowQuickPrompts(false);
    setMenuOpen(false);
    setMessages([]);
    setUserMessage('');
    setViewState('welcome');
    setIsTyping(false);
    setShowChips(true);
    setSelectedElements([]);
    setConnectedToMark(false);
    setMarkConcernIndex(0);
    setInputPlaceholder('Show me recommendations');
    setIsMinimized(true);
    setIsExpanded(false);
    setIsDocked(false);
    setIsSidePanel(false);
    setDockedSection(null);
    setHasMoved(false);
    setFabPosition({ x: 0, y: 0 });
  };

  const sendQuickPrompt = (text: string) => {
    setShowQuickPrompts(false);
    setUserMessage(text);
    setTimeout(() => textareaRef.current?.focus(), 0);
  };

  const handleFeedback = (messageId: string, feedback: 'up' | 'down') => {
    setMessages(prev => prev.map(msg =>
      msg.id === messageId ? { ...msg, feedback } : msg
    ));
  };
  const [campaignData, setCampaignData] = useState({
    campaignType: 'Sponsored Products Automatic',
    campaignName: 'Free Rein Coffee Campaign Fall 2025',
    startDate: '10/01/2025',
    dailyBudget: '50',
    endDate: '03/01/2024',
    biddingStrategy: 'dynamic' as 'dynamic' | 'fixed',
    brandTermTargeting: true,
    complementaryTargeting: true
  });
  const [isAdditionalSettingsOpen, setIsAdditionalSettingsOpen] = useState(false);

  // FAB drag state — always starts unmoved so the FAB defaults to the bottom-right corner
  const [fabPosition, setFabPosition] = useState({ x: 0, y: 0 });

  // Update position when initialPosition changes (undocking) — skip the very first
  // mount so a stale/persisted position never overrides the bottom-right default.
  const isFirstInitialPositionRender = useRef(true);
  useEffect(() => {
    if (isFirstInitialPositionRender.current) {
      isFirstInitialPositionRender.current = false;
      return;
    }
    if (initialPosition && !isDockedRef.current) {
      setFabPosition(initialPosition);
      setHasMoved(true);
    }
  }, [initialPosition]);

  // When docked+minimized (e.g. route change), reset FAB to bottom-right default
  useEffect(() => {
    if (isDocked && isMinimized) {
      setHasMoved(false);
      setFabPosition({ x: 0, y: 0 });
    }
  }, [isDocked, isMinimized]);
  const [isDragging, setIsDragging] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  // Refs to avoid stale closures in window event listeners
  const dragStartRef = useRef(dragStart);
  const dragStartPosRef = useRef(dragStartPos);
  const isDockedRef = useRef(isDocked);
  const hasMovedRef = useRef(hasMoved);
  const [tooltipPosition, setTooltipPosition] = useState<'top' | 'left' | 'right' | 'bottom'>('top');
  const fabButtonRef = useRef<HTMLButtonElement>(null);
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [dynamicTooltip, setDynamicTooltip] = useState('I have something to show you');
  const [tooltipFading, setTooltipFading] = useState(false);
  const tooltipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getContextualMessage = (x: number, y: number): string => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const xPct = x / w;
    const yPct = y / h;

    const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

    // Sidebar zone (left edge, ~first 15% width)
    if (xPct < 0.15) return pick([
      'Exploring the menu?',
      'Need help navigating?',
      'Let me guide you around!',
    ]);

    // Header zone (top ~10%)
    if (yPct < 0.1) return pick([
      'Looking for something up here?',
      'Can I help you navigate?',
      'I can find what you need!',
    ]);

    // Metrics zone (bottom ~35% — where KPI cards live)
    if (yPct > 0.65) return pick([
      "Let's see what you got there!",
      'Want me to explain these numbers?',
      'I can help analyze your metrics!',
      'These numbers look interesting…',
      'Need a performance breakdown?',
    ]);

    // Cards / content center-right zone
    if (xPct > 0.5 && yPct > 0.3 && yPct < 0.65) return pick([
      'Can I help here?',
      'Spotted something interesting!',
      'Want insights on this?',
      'I can dig into this for you.',
    ]);

    // Top content area (alerts, filters)
    if (yPct > 0.1 && yPct < 0.35) return pick([
      'What are we looking at?',
      'Want me to filter this for you?',
      'I can help set this up!',
    ]);

    return pick([
      "I'm right here if you need me!",
      'How can I help?',
      'What\'s on your mind?',
      'Just drag me somewhere and ask!',
    ]);
  };

  // Update tooltip message when FAB stops moving (debounced)
  useEffect(() => {
    if (!hasMoved) return;
    if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current);
    tooltipTimerRef.current = setTimeout(() => {
      const next = getContextualMessage(fabPosition.x, fabPosition.y);
      if (next === dynamicTooltip) return;
      setTooltipFading(true);
      setTimeout(() => {
        setDynamicTooltip(next);
        setTooltipFading(false);
      }, 150);
    }, 500);
    return () => { if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current); };
  }, [fabPosition, hasMoved]);

  // Keep refs in sync with state
  useEffect(() => { dragStartRef.current = dragStart; }, [dragStart]);
  useEffect(() => { dragStartPosRef.current = dragStartPos; }, [dragStartPos]);
  useEffect(() => { isDockedRef.current = isDocked; }, [isDocked]);
  useEffect(() => { hasMovedRef.current = hasMoved; }, [hasMoved]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // When on campaign page, don't show campaign type selection
  useEffect(() => {
    if (location.pathname === '/campaign' && viewState === 'campaignSetup') {
      setViewState('campaignReady');
    }
  }, [location.pathname, viewState]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '20px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = Math.min(scrollHeight, 152) + 'px';
    }
  }, [userMessage]);

  // Calculate tooltip position based on FAB location to avoid clipping
  useEffect(() => {
    if (hasMoved && fabButtonRef.current) {
      const rect = fabButtonRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const spaceTop = rect.top;
      const spaceBottom = windowHeight - rect.bottom;
      const spaceLeft = rect.left;
      const spaceRight = windowWidth - rect.right;

      // Find the direction with most space (prefer top, then right, then left, then bottom)
      const tooltipHeight = 60; // Approximate height of tooltip
      const tooltipWidth = 200; // Approximate width of tooltip

      if (spaceTop >= tooltipHeight) {
        setTooltipPosition('top');
      } else if (spaceRight >= tooltipWidth) {
        setTooltipPosition('right');
      } else if (spaceLeft >= tooltipWidth) {
        setTooltipPosition('left');
      } else {
        setTooltipPosition('bottom');
      }
    }
  }, [fabPosition, hasMoved]);

  // Track mouse movement to make eyes follow cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (fabButtonRef.current) {
        const rect = fabButtonRef.current.getBoundingClientRect();
        const fabCenterX = rect.left + rect.width / 2;
        const fabCenterY = rect.top + rect.height / 2;

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Calculate angle from Marty to cursor
        const deltaX = mouseX - fabCenterX;
        const deltaY = mouseY - fabCenterY;

        // Limit eye movement range (max 3px in each direction)
        const maxMove = 3;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const limitedX = distance > 0 ? (deltaX / distance) * Math.min(distance / 20, maxMove) : 0;
        const limitedY = distance > 0 ? (deltaY / distance) * Math.min(distance / 20, maxMove) : 0;

        setEyePosition({ x: limitedX, y: limitedY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleMinimize = () => {
    setIsMinimized(true);
    setViewState('welcome');
    setMessages([]);
    setUserMessage('');
    setIsTyping(false);
    setShowChips(true);
    setInputPlaceholder('Show me recommendations');
    setConnectedToMark(false);
    setMarkConcernIndex(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent text selection while dragging
    setIsDragging(true);
    isDraggingRef.current = false; // Reset - will be set to true if actual movement occurs

    // Get the button element to calculate its center offset
    const buttonRect = e.currentTarget.getBoundingClientRect();
    const offsetX = buttonRect.width / 2;
    const offsetY = buttonRect.height / 2;

    setDragStart({ x: offsetX, y: offsetY });
    setDragStartPos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseUp = (e: MouseEvent) => {
      setIsDragging(false);

      if (!hasMovedRef.current) return;

      // Remove any active drop-zone highlights
      document.querySelectorAll('[data-marty-dock-zone]').forEach(el => {
        (el as HTMLElement).removeAttribute('data-marty-dock-active');
      });

      // 1. Masthead snap zone (top 80px) — dock AND keep panel open as a side panel
      if (!isDockedRef.current && e.clientY < 80) {
        setIsDocked(true);
        setDockedSection(null);
        setIsSidePanel(true);
        return;
      }

      // 2. Named section snap zones (e.g. the campaigns table) — dock into that section
      const zones = document.querySelectorAll('[data-marty-dock-zone]');
      for (const zone of zones) {
        const rect = zone.getBoundingClientRect();
        const pad = 80;
        if (
          e.clientX >= rect.left - pad &&
          e.clientX <= rect.right + pad &&
          e.clientY >= rect.top - pad &&
          e.clientY <= rect.bottom + pad
        ) {
          const section = zone.getAttribute('data-marty-dock-zone')!;
          setIsDocked(true);
          setDockedSection(section);
          setIsSidePanel(true);
          return;
        }
      }
    };

    // Free drag — the FAB follows the cursor, highlighting dock zones as it passes over them
    const handleMouseMove = (e: MouseEvent) => {
      const dsp = dragStartPosRef.current;
      const ds = dragStartRef.current;
      const deltaX = Math.abs(e.clientX - dsp.x);
      const deltaY = Math.abs(e.clientY - dsp.y);
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance > 3) {
        isDraggingRef.current = true;
        const newX = e.clientX - ds.x;
        const newY = e.clientY - ds.y;
        setFabPosition({ x: newX, y: newY });
        setHasMoved(true);

        if (isDockedRef.current && e.clientY > 100) {
          setIsDocked(false);
          setDockedSection(null);
        }

        // Highlight whichever zone the FAB is hovering over
        document.querySelectorAll('[data-marty-dock-zone]').forEach(el => {
          const rect = el.getBoundingClientRect();
          const pad = 80;
          const over =
            e.clientX >= rect.left - pad &&
            e.clientX <= rect.right + pad &&
            e.clientY >= rect.top - pad &&
            e.clientY <= rect.bottom + pad;
          (el as HTMLElement).setAttribute('data-marty-dock-active', over ? 'true' : 'false');
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, setIsDocked, setDockedSection]);

  const handleExpand = (e?: React.MouseEvent) => {
    setIsMinimized(false);
  };

  const openBottomSheetChat = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsDocked(false);
    setDockedSection(null);
    setIsSidePanel(false);
    handleExpand(e);
  };

  const animateResponse = async (assistantId: string, response: string): Promise<void> => {
    const chunkSize = 15;
    let fullText = '';
    for (let i = 0; i < response.length; i += chunkSize) {
      fullText += response.slice(i, i + chunkSize);
      setMessages(prev =>
        prev.map(m => m.id === assistantId ? { ...m, content: fullText } : m)
      );
      if (i + chunkSize < response.length) {
        await new Promise<void>(resolve => safeTimeout(resolve, 50));
      }
    }
  };

  const handleRecommendations = async () => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: 'Show me recommendations',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setUserMessage('');
    setIsTyping(true);

    if (viewState === 'welcome') {
      setAvatarExiting(true);
      safeTimeout(() => { setAvatarExiting(false); setViewState('chat'); }, 350);
    }

    // First show campaign performance data
    await new Promise<void>(resolve => safeTimeout(resolve, 900));

    setIsTyping(false);
    const perfMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, {
      id: perfMsgId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      type: 'performance',
      feedback: null,
    }]);

    // Wait then show recommendation cards
    setIsTyping(true);
    await new Promise<void>(resolve => safeTimeout(resolve, 1200));
    setIsTyping(false);

    setMessages(prev => [...prev, {
      id: (Date.now() + 2).toString(),
      role: 'assistant',
      content: 'Here are a few ways to improve your campaigns.',
      timestamp: new Date(),
      feedback: null,
    }, {
      id: (Date.now() + 3).toString(),
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      type: 'recommendations',
      feedback: null,
    }]);

    setInputPlaceholder('How can I help?');
  };

  const removeSelectedElement = (id: string) => {
    setSelectedElements(prev => prev.filter(el => el.id !== id));
  };

  const handleSendMessage = async () => {
    // If placeholder is "Show me recommendations" and input is empty, trigger recs
    if (!userMessage.trim() && inputPlaceholder === 'Show me recommendations' && selectedElements.length === 0) {
      if (!isTyping) handleRecommendations();
      return;
    }
    if (!userMessage.trim() && selectedElements.length === 0) return;
    if (isTyping) return;

    // Build message: if we have selected elements, prepend their context
    let content: string;
    if (selectedElements.length > 0) {
      const contextsStr = selectedElements.map(el => el.context).join(' | ');
      const question = userMessage.trim();
      content = question
        ? `Context selected: ${contextsStr}\nUser question: ${question}`
        : `Context selected: ${contextsStr}\nUser question: Tell me about these`;
    } else {
      content = userMessage.trim();
    }

    // Clear selected elements after building the message
    setSelectedElements([]);
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setUserMessage('');
    setIsTyping(true);

    if (viewState === 'welcome') {
      setAvatarExiting(true);
      safeTimeout(() => {
        setAvatarExiting(false);
        setViewState('chat');
      }, 350);
    }

    // Table command dispatch — only when docked to the campaigns table
    if (dockedSection === 'campaigns-table') {
      const cmd = parseTableCommand(content);
      if (cmd) {
        setIsTyping(false);
        setTableCommand(cmd);
        const confirmation = getTableCommandConfirmation(cmd, 8);
        const assistantId = (Date.now() + 1).toString();
        setMessages(prev => [...prev, {
          id: assistantId,
          role: 'assistant',
          content: '',
          timestamp: new Date(),
          feedback: null,
        }]);
        await animateResponse(assistantId, confirmation);
        return;
      }
    }

    // Mark's queued concerns — delivered one at a time
    const MARK_CONCERNS: string[] = [
      "**Pacing Issue \u2014 H&H FY25 Always On Campaign:** This campaign is pacing at **123%** which is significantly over-delivering. With a $213K budget, you're burning through spend faster than planned. I'd recommend pulling the daily budget back by ~15% or adjusting bid caps to bring pacing closer to 100%.",
      "**Holiday Promotions Q4 has 3 unresolved recommendations:** This $300K campaign launches soon and has the most pending recommendations in the table. I'd prioritize reviewing those \u2014 especially the 2 flagged on the **Countdown Timer Ad** creative \u2014 before the campaign goes live.",
      "**Fashion Week campaign under-delivered at 85% pacing:** It completed at only 85% of planned impressions (900K vs target). Worth analyzing why \u2014 could be targeting too narrow with **Run of site** strategy, or the $50K budget may have been exhausted too early. Good learnings for future fashion campaigns.",
    ];

    // @mention routing — direct messages to Mark or Marty
    const mentionsMark = /@mark\b/i.test(content);
    const mentionsMarty = /@marty\b/i.test(content);
    const strippedContent = content.replace(/@(mark|marty)\b/gi, '').trim();

    if (mentionsMark) {
      // Check if asking for next concern via @Mark
      if (markConcernIndex > 0 && markConcernIndex < MARK_CONCERNS.length && /next|more|else|other|another|continue|go on|keep going|what else|any.*(other|more|else)/i.test(strippedContent)) {
        await new Promise<void>(resolve => safeTimeout(resolve, 900));
        setIsTyping(false);

        const nextId = (Date.now() + 1).toString();
        setMessages(prev => [...prev, { id: nextId, role: 'mark', content: '', timestamp: new Date(), feedback: null }]);
        await animateResponse(nextId, MARK_CONCERNS[markConcernIndex]);

        const newIdx = markConcernIndex + 1;
        setMarkConcernIndex(newIdx);

        setIsTyping(true);
        await new Promise<void>(resolve => safeTimeout(resolve, 600));
        setIsTyping(false);

        const followId = (Date.now() + 2).toString();
        setMessages(prev => [...prev, { id: followId, role: 'mark', content: '', timestamp: new Date(), feedback: null }]);
        if (newIdx < MARK_CONCERNS.length) {
          await animateResponse(followId, `That's **${newIdx}** of **${MARK_CONCERNS.length}** concerns. Want to hear the next one, or should we dive into any of these?`);
        } else {
          await animateResponse(followId, `That covers all **${MARK_CONCERNS.length}** concerns I found. Want me to dig deeper into any of them, or should we loop in **@Marty** for an action plan?`);
        }
        setInputPlaceholder('@Mark or @Marty to reply...');
        return;
      }

      await new Promise<void>(resolve => safeTimeout(resolve, 900));
      setIsTyping(false);

      const markReplyId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, {
        id: markReplyId,
        role: 'mark',
        content: '',
        timestamp: new Date(),
        feedback: null,
      }]);

      // Mark responds contextually based on the question
      const lower = strippedContent.toLowerCase();
      let markResponse: string;
      if (/budget|spend|cost|money|allocat/i.test(lower)) {
        markResponse = "Good question. Looking at the data, the **H&H Always On** campaign is over-spending at 123% pacing on a $213K budget. Meanwhile, **Campaign 100** ($9K) is paused and **Fashion Week** ($50K) completed under-budget. I'd recommend reallocating the unspent funds to your live campaigns that are performing well, especially **Summer Electronics Flash Sale** which is delivering strong impressions at a controlled 108% pace.";
      } else if (/pacing|pace|deliver|over.?deliver|under.?deliver/i.test(lower)) {
        markResponse = "Here's the pacing breakdown across your campaigns:\n\n• **H&H Always On** — 123% (over-delivering, needs throttling)\n• **Brand Awareness FY27** — 113% (slightly hot but acceptable)\n• **Summer Electronics** — 108% (healthy)\n• **Spring Sale** — 105% (ideal range)\n• **Campaign 100** — 102% (good, but paused)\n• **Holiday Q4** — 98% (right on track)\n• **Fashion Week** — 85% (under-delivered, completed)\n\nThe main concern is H&H — I'd pull the daily budget back by 15–20%.";
      } else if (/target|audience|segment|strategy/i.test(lower)) {
        markResponse = "Looking at your targeting strategies, **Contextual targeting** is clearly outperforming — your 3 campaigns using it (Brand Awareness, Spring Sale, Summer Electronics) are all pacing between 105–113% with strong impressions. The **Run of Site** campaigns (Campaign 100, Fashion Week) both underperformed. I'd recommend shifting future campaigns to contextual, and testing behavioral more carefully with smaller budgets first.";
      } else if (/holiday|q4|countdown|recommend/i.test(lower)) {
        markResponse = "The **Holiday Promotions Q4** campaign is your biggest concern right now. It has **3 unresolved recommendations** — the most of any campaign. Two of those are on the **Countdown Timer Ad** creative specifically. Given this is a $300K campaign, I'd prioritize reviewing those flags before it goes live. The ad group (**Gift Buyers Segment**) also has 1 recommendation that needs attention.";
      } else {
        markResponse = `That's a great point. From my analysis of the campaign data, I see a few things worth noting: you have **8 campaigns** total with **3 Live**, **2 Scheduled**, **1 Paused**, and **2 Completed**. The most urgent items are the pacing issue on H&H Always On (123%) and the 3 pending recommendations on Holiday Q4. Want me to dive deeper into any specific area?`;
      }

      await animateResponse(markReplyId, markResponse);
      setInputPlaceholder('@Mark or @Marty to reply...');
      return;
    }

    if (mentionsMarty) {
      // Strip the @Marty mention and let it flow through the normal Marty logic
      // but re-route through the improve/recommendation checks with cleaned content
      const cleanContent = strippedContent;

      // Check if it's an improvement question
      if (/improve|what.*(do|can|should).*better|optimize|what do you think|what.*(suggest|recommend)|how.*(fix|boost|increase)/i.test(cleanContent)) {
        // Fall through to the improve handler below with original content
      } else if (/recommendation/i.test(cleanContent)) {
        setMessages(prev => prev.filter(m => m.id !== userMsg.id));
        setIsTyping(false);
        handleRecommendations();
        return;
      } else {
        // Generic Marty response
        await new Promise<void>(resolve => safeTimeout(resolve, 800));
        setIsTyping(false);

        const martyReplyId = (Date.now() + 1).toString();
        setMessages(prev => [...prev, {
          id: martyReplyId,
          role: 'assistant',
          content: '',
          timestamp: new Date(),
          feedback: null,
        }]);
        await animateResponse(martyReplyId, generateMockResponse(cleanContent));
        setInputPlaceholder('How can I help?');
        return;
      }
    }

    // Disconnect from Mark via chat
    if (connectedToMark && /disconnect.*mark|leave.*mark|end.*mark|bye.*mark|remove.*mark/i.test(content)) {
      setConnectedToMark(false);
      setMarkConcernIndex(0);
      setInputPlaceholder('How can I help?');
      await new Promise<void>(resolve => safeTimeout(resolve, 600));
      setIsTyping(false);

      const byeMarkId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, {
        id: byeMarkId,
        role: 'mark',
        content: '',
        timestamp: new Date(),
        feedback: null,
      }]);
      await animateResponse(byeMarkId, "Thanks for chatting! I'll be around if you need me again. Take care!");

      const martyBackId = (Date.now() + 2).toString();
      setMessages(prev => [...prev, {
        id: martyBackId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        feedback: null,
      }]);
      await animateResponse(martyBackId, "Mark has disconnected. I'm still here if you need anything — just ask!");
      return;
    }

    // Recommendations shortcut
    if (content.toLowerCase().includes('recommendation')) {
      // Remove the user message already added and delegate to dedicated handler
      setMessages(prev => prev.filter(m => m.id !== userMsg.id));
      setIsTyping(false);
      handleRecommendations();
      return;
    }

    // Campaign shortcut
    if (content.toLowerCase().includes('create campaign') ||
        content.toLowerCase().includes('create a campaign')) {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Great! Let me help you create a campaign. I'll guide you through the process...",
        timestamp: new Date(),
      }]);
      safeTimeout(() => setViewState('campaignSetup'), 1000);
      return;
    }

    // Multi-element synthesis path
    const synthesisMatch = content.match(/^Context selected: (.+)\nUser question: (.*)$/s);
    if (synthesisMatch) {
      const contextsRaw = synthesisMatch[1];
      const question = synthesisMatch[2].trim();
      const contexts = contextsRaw.split(' | ');

      // Check if any are metric type to render breakdowns
      const metricLabels = contexts.filter(c =>
        /impressions|spend|roas|ecpm|attributed|orders|units|clicks|ctr|cpc|cvr/i.test(c)
      );

      if (metricLabels.length > 0) {
        await new Promise<void>(resolve => safeTimeout(resolve, 900));
        setIsTyping(false);
        // Show metric breakdown for each metric found
        for (const label of metricLabels) {
          setMessages(prev => [...prev, {
            id: (Date.now() + Math.random()).toString(),
            role: 'assistant',
            content: '',
            timestamp: new Date(),
            type: 'metricBreakdown',
            metricName: label,
            feedback: null,
          }]);
        }
        // If user asked a specific question, add a synthesis response
        if (question && question !== 'Tell me about these') {
          const assistantId = (Date.now() + 1).toString();
          setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '', timestamp: new Date(), feedback: null }]);
          await animateResponse(assistantId, generateContextualResponse(question + ' ' + contextsRaw));
        }
        return;
      }

      // Generic multi-element synthesis
      await new Promise<void>(resolve => safeTimeout(resolve, 900));
      const assistantId = (Date.now() + 1).toString();
      setIsTyping(false);
      setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '', timestamp: new Date(), feedback: null }]);
      const combinedContext = question !== 'Tell me about these'
        ? `${question} — Context: ${contextsRaw}`
        : contextsRaw;
      await animateResponse(assistantId, generateContextualResponse(combinedContext));
      return;
    }

    // "Connect to Mark" flow — Marty hands off to Mark who shares ONE concern
    if (/connect.*mark|talk to mark|bring in mark|get mark|ask mark|introduce.*mark/i.test(content)) {
      await new Promise<void>(resolve => safeTimeout(resolve, 800));
      setIsTyping(false);

      // Marty introduces Mark
      setConnectedToMark(true);
      const introId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, {
        id: introId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        feedback: null,
      }]);
      await animateResponse(introId, "Sure! I'm connecting you with **Mark** — he's a Campaign Strategist who can help review your campaign data. One moment...");

      // Short pause before Mark joins
      setIsTyping(true);
      await new Promise<void>(resolve => safeTimeout(resolve, 1200));
      setIsTyping(false);

      // Mark's greeting + first concern only
      const markGreetId = (Date.now() + 2).toString();
      setMessages(prev => [...prev, {
        id: markGreetId,
        role: 'mark',
        content: '',
        timestamp: new Date(),
        feedback: null,
      }]);
      await animateResponse(markGreetId, "Hey! Mark here. I've been reviewing the campaign data table Marty shared with me. I spotted a few concerns — here's the first one:");

      // First concern
      setIsTyping(true);
      await new Promise<void>(resolve => safeTimeout(resolve, 1000));
      setIsTyping(false);

      const concern0Id = (Date.now() + 3).toString();
      setMessages(prev => [...prev, {
        id: concern0Id,
        role: 'mark',
        content: '',
        timestamp: new Date(),
        feedback: null,
      }]);
      await animateResponse(concern0Id, MARK_CONCERNS[0]);

      // Prompt to ask for more
      setIsTyping(true);
      await new Promise<void>(resolve => safeTimeout(resolve, 600));
      setIsTyping(false);

      const promptId = (Date.now() + 4).toString();
      setMessages(prev => [...prev, {
        id: promptId,
        role: 'mark',
        content: '',
        timestamp: new Date(),
        feedback: null,
      }]);
      await animateResponse(promptId, "Want to discuss this one, or should I move on to the next issue?");

      setMarkConcernIndex(1);
      setInputPlaceholder('@Mark or @Marty to reply...');
      return;
    }

    // Mark "anything else / next issue" flow — reveals next concern
    const hadMark = messages.some(m => m.role === 'mark');
    if (hadMark && markConcernIndex > 0 && markConcernIndex < MARK_CONCERNS.length && /next|more|else|other|another|continue|go on|keep going|what else|any.*(other|more|else)/i.test(content)) {
      await new Promise<void>(resolve => safeTimeout(resolve, 900));
      setIsTyping(false);

      const nextConcernId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, {
        id: nextConcernId,
        role: 'mark',
        content: '',
        timestamp: new Date(),
        feedback: null,
      }]);
      await animateResponse(nextConcernId, MARK_CONCERNS[markConcernIndex]);

      const newIdx = markConcernIndex + 1;
      setMarkConcernIndex(newIdx);

      // Follow-up prompt
      setIsTyping(true);
      await new Promise<void>(resolve => safeTimeout(resolve, 600));
      setIsTyping(false);

      const followUpId = (Date.now() + 2).toString();
      setMessages(prev => [...prev, {
        id: followUpId,
        role: 'mark',
        content: '',
        timestamp: new Date(),
        feedback: null,
      }]);

      if (newIdx < MARK_CONCERNS.length) {
        await animateResponse(followUpId, `That's **${newIdx}** of **${MARK_CONCERNS.length}** concerns. Want to hear the next one, or should we dive into any of these?`);
      } else {
        await animateResponse(followUpId, `That covers all **${MARK_CONCERNS.length}** concerns I found. Want me to dig deeper into any of them, or should we loop in **@Marty** for an action plan?`);
      }

      setInputPlaceholder('@Mark or @Marty to reply...');
      return;
    }

    // "What can we improve" flow — Marty jumps back in with actionable recommendations
    if (/improve|what.*(do|can|should).*better|optimize|what do you think|what.*(suggest|recommend)|how.*(fix|boost|increase)/i.test(content)) {
      await new Promise<void>(resolve => safeTimeout(resolve, 800));
      setIsTyping(false);

      // Check if Mark was part of the conversation (context-aware response)
      const hadMark = messages.some(m => m.role === 'mark');

      const martyReplyId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, {
        id: martyReplyId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        feedback: null,
      }]);

      if (hadMark) {
        await animateResponse(martyReplyId, "Great question! Building on what Mark flagged, here's my recommended action plan:");
      } else {
        await animateResponse(martyReplyId, "I've analyzed your campaign data and here are my recommendations:");
      }

      // Recommendation 1 — Pacing fix
      setIsTyping(true);
      await new Promise<void>(resolve => safeTimeout(resolve, 1000));
      setIsTyping(false);

      const rec1Id = (Date.now() + 2).toString();
      setMessages(prev => [...prev, {
        id: rec1Id,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        feedback: null,
      }]);
      await animateResponse(rec1Id, "**1. Fix over-pacing on H&H Always On Campaign**\nReduce daily budget by 15% (from ~$1,420/day to ~$1,207/day). This should bring pacing from 123% back to ~105%. Alternatively, switch from **Behavioral targeting** to **Contextual targeting** — your contextual campaigns are pacing more efficiently (105–113%).");

      // Recommendation 2 — Holiday prep
      setIsTyping(true);
      await new Promise<void>(resolve => safeTimeout(resolve, 1000));
      setIsTyping(false);

      const rec2Id = (Date.now() + 3).toString();
      setMessages(prev => [...prev, {
        id: rec2Id,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        feedback: null,
      }]);
      await animateResponse(rec2Id, "**2. Resolve Holiday Promotions Q4 recommendations before launch**\nThis $300K campaign has **3 pending recommendations** — the most across all campaigns. The Countdown Timer Ad creative alone has 2 flags. I can pull up those specific recommendations so you can review and act on them now.");

      // Recommendation 3 — Budget reallocation
      setIsTyping(true);
      await new Promise<void>(resolve => safeTimeout(resolve, 1000));
      setIsTyping(false);

      const rec3Id = (Date.now() + 4).toString();
      setMessages(prev => [...prev, {
        id: rec3Id,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        feedback: null,
      }]);
      await animateResponse(rec3Id, "**3. Reallocate budget from paused/completed campaigns**\n**Campaign 100** ($9K, Paused) and **Fashion Week** ($50K, Completed at 85%) have unspent budget. Consider shifting ~$15K to your top-performing **Summer Electronics Flash Sale** which is pacing well at 108% with strong impressions (4.2M).");

      // Recommendation 4 — Targeting strategy
      setIsTyping(true);
      await new Promise<void>(resolve => safeTimeout(resolve, 800));
      setIsTyping(false);

      const rec4Id = (Date.now() + 5).toString();
      setMessages(prev => [...prev, {
        id: rec4Id,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        feedback: null,
      }]);
      await animateResponse(rec4Id, "**4. Move away from Run of Site targeting**\nBoth campaigns using **Run of Site** (Campaign 100 and Fashion Week) underperformed compared to **Contextual** and **Behavioral** strategies. For future campaigns, prioritize contextual targeting — it's delivering the best balance of pacing and reach.");

      // Marty's wrap-up offer
      setIsTyping(true);
      await new Promise<void>(resolve => safeTimeout(resolve, 800));
      setIsTyping(false);

      const wrapId = (Date.now() + 6).toString();
      setMessages(prev => [...prev, {
        id: wrapId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        feedback: null,
      }]);
      await animateResponse(wrapId, "Want me to apply any of these changes? I can adjust budgets directly in the table, or I can create a new campaign based on your best-performing setup.");

      setInputPlaceholder('How can I help?');
      return;
    }

    const response = generateMockResponse(content);

    // Phase 1 — thinking: show indicator only, no message bubble yet
    await new Promise<void>(resolve => safeTimeout(resolve, 800));

    // Phase 2 — typing: hide indicator, add message, animate content in
    const assistantId = (Date.now() + 1).toString();
    setIsTyping(false);
    setMessages(prev => [...prev, {
      id: assistantId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      feedback: null,
    }]);

    await animateResponse(assistantId, response);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isTyping) handleSendMessage();
    }
  };

  const handleStopGeneration = () => {
    setIsTyping(false);
  };

  const handleQuickAction = async (action: string) => {
    if (action === 'create') {
      // Add user message
      const userMsg: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: 'Create campaign',
        timestamp: new Date()
      };
      setShowChips(false);
      setMessages([userMsg]);
      setAvatarExiting(true);
      safeTimeout(() => {
        setAvatarExiting(false);
        setViewState('chat');
        setIsTyping(true);
      }, 350);
      
      // Show typing animation
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Add assistant response with options
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Great! I'd love to help you create a campaign. To get started, what type of campaign would you like to create?",
        timestamp: new Date(),
        isAction: true
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
      
      // Show campaign setup view
      safeTimeout(() => {
        setViewState('campaignSetup');
      }, 800);
      
    } else if (action === 'help') {
      setUserMessage('Help & FAQs');
      safeTimeout(() => handleSendMessage(), 100);
    }
  };

  const handleSkillClick = (skill: Skill) => {
    if (skill.action) {
      handleQuickAction(skill.action);
    } else {
      // Pre-fill the prompt so user can review/edit before sending
      setShowChips(false);
      setMessages([]);
      setUserMessage(skill.prompt);
      setAvatarExiting(true);
      safeTimeout(() => {
        setAvatarExiting(false);
        setViewState('chat');
      }, 350);
    }
  };

  const handleCampaignTypeSelection = async (type: string) => {
    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: type,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    
    // Set campaign type
    setCampaignData(prev => ({ ...prev, campaignType: type }));
    
    // Show typing animation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Add assistant response
    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: `Perfect! I'll help you set up a ${type} campaign. Let me gather some details...`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, assistantMsg]);
    setIsTyping(false);
    
    // Transition to form
    safeTimeout(() => {
      setViewState('campaignForm');
    }, 800);
  };

  const handleBack = () => {
    if (viewState === 'campaignForm') {
      setViewState('campaignSetup');
    } else if (viewState === 'campaignSetup') {
      setViewState('chat');
    } else {
      setViewState('chat');
    }
  };

  const handleSaveAndReview = () => {
    setViewState('campaignReady');
    navigate('/campaign');
  };

  const handleLaunchCampaign = () => {
    setViewState('campaignScheduled');
  };

  const handleClearChat = () => {
    setMenuOpen(false);
    setMessages([]);
    setUserMessage('');
    setViewState('welcome');
    setIsTyping(false);
    setShowChips(true);
    setSelectedElements([]);
    setConnectedToMark(false);
    setMarkConcernIndex(0);
  };

  const handleToggleExpand = () => setIsExpanded(prev => !prev);

  const renderMetricBreakdownTable = (metricName: string) => {
    const breakdownData: Record<string, { rows: { source: string; value: string }[]; total: string }> = {
      'Impressions': {
        rows: [
          { source: 'Search Ads', value: '12,450,000' },
          { source: 'Display Ads', value: '6,230,000' },
          { source: 'Sponsored Products', value: '3,211,371' },
        ],
        total: '21,891,371',
      },
      'eCPM': {
        rows: [
          { source: 'Total Spend', value: '$120,869' },
          { source: 'Total Impressions', value: '21,891,371' },
          { source: 'eCPM Formula', value: '(Spend / Impressions) x 1000' },
        ],
        total: '$5.52',
      },
      'Spend': {
        rows: [
          { source: 'Search Ads', value: '$54,200' },
          { source: 'Display Ads', value: '$38,450' },
          { source: 'Sponsored Products', value: '$28,219' },
        ],
        total: '$120,869',
      },
      'Total ROAS': {
        rows: [
          { source: 'Total Attributed Sales', value: '$377,588' },
          { source: 'Total Spend', value: '$120,869' },
          { source: 'ROAS Formula', value: 'Sales / Spend' },
        ],
        total: '$3.13',
      },
      'Total attributed sales': {
        rows: [
          { source: 'Search Ads', value: '$187,200' },
          { source: 'Display Ads', value: '$112,388' },
          { source: 'Sponsored Products', value: '$78,000' },
        ],
        total: '$377,588',
      },
      'Total attributed orders': {
        rows: [
          { source: 'Search Ads', value: '15,200' },
          { source: 'Display Ads', value: '9,466' },
          { source: 'Sponsored Products', value: '6,000' },
        ],
        total: '30,666',
      },
      'Total attributed units': {
        rows: [
          { source: 'Search Ads', value: '12,450,000' },
          { source: 'Display Ads', value: '6,230,000' },
          { source: 'Sponsored Products', value: '3,211,371' },
        ],
        total: '21,891,371',
      },
    };

    const data = breakdownData[metricName] || breakdownData['Impressions'];

    return (
      <div className="w-full">
        <div className="text-sm [color:var(--ld-semantic-color-text)] leading-5 mb-3">
          Here's how <strong>{metricName}</strong> is calculated:
        </div>
        <DataTable rounded>
          <thead>
            <DataTableRow>
              <DataTableHeader alignment="left">Source</DataTableHeader>
              <DataTableHeader alignment="right">Value</DataTableHeader>
            </DataTableRow>
          </thead>
          <tbody>
            {data.rows.map((row, i) => (
              <DataTableRow key={i}>
                <DataTableCell>{row.source}</DataTableCell>
                <DataTableCell variant="numeric">{row.value}</DataTableCell>
              </DataTableRow>
            ))}
            <DataTableRow>
              <DataTableCell UNSAFE_style={{ fontWeight: 700 }}>Total</DataTableCell>
              <DataTableCell variant="numeric" UNSAFE_style={{ fontWeight: 700 }}>{data.total}</DataTableCell>
            </DataTableRow>
          </tbody>
        </DataTable>
      </div>
    );
  };

  // Watch for pendingMessage from context and auto-send
  useEffect(() => {
    if (!pendingMessage) return;
    const msg = pendingMessage;
    setPendingMessage(null);

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: msg,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setUserMessage('');
    setIsTyping(true);

    if (viewState === 'welcome') {
      setAvatarExiting(true);
      safeTimeout(() => {
        setAvatarExiting(false);
        setViewState('chat');
      }, 350);
    }

    const contextMatch = msg.match(/^Tell me about this: (.+)$/i);
    const metricMatch = !contextMatch ? msg.match(/^Tell me about (.+)$/i) : null;
    if (contextMatch) {
      const context = contextMatch[1];
      safeTimeout(async () => {
        const assistantId = (Date.now() + 1).toString();
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: assistantId,
          role: 'assistant',
          content: '',
          timestamp: new Date(),
          feedback: null,
        }]);
        await animateResponse(assistantId, generateContextualResponse(context));
      }, 900);
    } else if (metricMatch) {
      const metricName = metricMatch[1];
      safeTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '',
          timestamp: new Date(),
          type: 'metricBreakdown',
          metricName,
          feedback: null,
        }]);
      }, 900);
    } else {
      const response = generateMockResponse(msg);
      safeTimeout(async () => {
        const assistantId = (Date.now() + 1).toString();
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: assistantId,
          role: 'assistant',
          content: '',
          timestamp: new Date(),
          feedback: null,
        }]);
        await animateResponse(assistantId, response);
      }, 800);
    }
  }, [pendingMessage]);

  // Quick prompts portal — rendered independently so it works in ANY state (docked, minimized, etc.)
  const quickPromptsPortal = showQuickPrompts ? createPortal(
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[10003]"
        onClick={() => setShowQuickPrompts(false)}
      />
      {/* Palette */}
      <div
        className="fixed z-[10004] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] rounded-xl border shadow-2xl overflow-hidden"
        style={{
          background: '#ffffff',
          borderColor: 'var(--ld-semantic-color-border-subtle)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="px-4 py-3 border-b flex items-center justify-between"
          style={{
            borderColor: 'var(--ld-semantic-color-border-subtle)',
            background: '#f5f5f5',
          }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--ld-semantic-color-text-subtle)' }}>Quick Prompts</span>
            <span className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ background: 'var(--ld-semantic-color-fill-surface-hover)', color: 'var(--ld-semantic-color-text-subtle)' }}>Esc Esc</span>
          </div>
          <button
            className="text-xs"
            style={{ color: 'var(--ld-semantic-color-text-subtle)' }}
            onClick={() => setShowQuickPrompts(false)}
          >
            Esc to close
          </button>
        </div>
        {/* Prompt list */}
        <div className="py-1">
          {QUICK_PROMPTS.map((p, i) => (
            <button
              key={i}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors hover:[background:var(--ld-semantic-color-fill-surface-hover)]"
              onClick={() => sendQuickPrompt(p.text)}
            >
              <span
                className="w-6 h-6 flex-shrink-0 rounded flex items-center justify-center text-xs font-bold font-mono"
                style={{
                  background: 'var(--ld-semantic-color-fill-brand-subtle)',
                  color: 'var(--ld-semantic-color-text-brand)',
                }}
              >
                {i + 1}
              </span>
              <span className="flex-1 text-sm" style={{ color: 'var(--ld-semantic-color-text)' }}>{p.text}</span>
              <span className="text-xs px-1.5 py-0.5 rounded" style={{
                background: 'var(--ld-semantic-color-fill-surface-hover)',
                color: 'var(--ld-semantic-color-text-subtle)',
              }}>{p.category}</span>
            </button>
          ))}
          {/* Reset Marty — separate from numbered prompts */}
          <div className="border-t" style={{ borderColor: 'var(--ld-semantic-color-border-subtle)' }}>
            <button
              className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors hover:[background:var(--ld-semantic-color-fill-surface-hover)]"
              onClick={handleResetMarty}
            >
              <span
                className="w-6 h-6 flex-shrink-0 rounded flex items-center justify-center text-xs font-bold font-mono"
                style={{
                  background: 'var(--ld-semantic-color-fill-destructive-subtle, #fde8e8)',
                  color: 'var(--ld-semantic-color-text-negative, #c2290a)',
                }}
              >
                0
              </span>
              <span className="flex-1 text-sm" style={{ color: 'var(--ld-semantic-color-text)' }}>Reset Marty</span>
              <span className="text-xs px-1.5 py-0.5 rounded" style={{
                background: 'var(--ld-semantic-color-fill-surface-hover)',
                color: 'var(--ld-semantic-color-text-subtle)',
              }}>Reset</span>
            </button>
          </div>
        </div>
        {/* Footer hint */}
        <div
          className="px-4 py-2 border-t text-xs text-center"
          style={{
            borderColor: 'var(--ld-semantic-color-border-subtle)',
            color: 'var(--ld-semantic-color-text-subtle)',
            background: '#f5f5f5',
          }}
        >
          Press <kbd className="font-mono px-1 py-0.5 rounded border" style={{ borderColor: 'var(--ld-semantic-color-border-subtle)' }}>1</kbd>–<kbd className="font-mono px-1 py-0.5 rounded border" style={{ borderColor: 'var(--ld-semantic-color-border-subtle)' }}>9</kbd> to fill prompt &nbsp;·&nbsp; <kbd className="font-mono px-1 py-0.5 rounded border" style={{ borderColor: 'var(--ld-semantic-color-border-subtle)' }}>0</kbd> reset &nbsp;·&nbsp; <kbd className="font-mono px-1 py-0.5 rounded border" style={{ borderColor: 'var(--ld-semantic-color-border-subtle)' }}>Esc</kbd> close
        </div>
      </div>
    </>,
    document.body
  ) : null;

  // Minimized "Ask Marty" FAB — only shown when free-floating (undocked).
  // When docked (masthead or a named section like the campaigns table), the
  // dock location has its own indicator — e.g. DockedMartyButton in the
  // table — so the free-floating FAB stays hidden instead of duplicating it.
  if (isMinimized && isDocked) {
    return quickPromptsPortal;
  }

  if (isMinimized) {
    return (
      <>
        {quickPromptsPortal}
        <div
          className={`${styles.desktopFab} fixed z-[9999]`}
          style={{
            bottom: hasMoved ? 'auto' : '32px',
            right: hasMoved ? 'auto' : '32px',
            top: hasMoved ? `${fabPosition.y}px` : 'auto',
            left: hasMoved ? `${fabPosition.x}px` : 'auto',
          cursor: isDragging ? 'grabbing' : 'move'
        }}
        >
          <button
            ref={fabButtonRef}
            onMouseDown={handleMouseDown}
            onClick={(e) => {
              // Only expand if this was a click (not a drag)
              if (!isDraggingRef.current) {
                openBottomSheetChat(e);
              }
              // Reset the ref after handling click
              safeTimeout(() => {
                isDraggingRef.current = false;
              }, 100);
            }}
            className={`${styles.fabButton} inline-flex justify-center items-center rounded-full shadow-[0_-1px_3px_0_rgba(0,0,0,0.10),0_3px_5px_2px_rgba(0,0,0,0.15)] relative group transition-all duration-200 ease-out overflow-visible`}
            style={{
              cursor: isDragging ? 'grabbing' : 'move'
            }}
          >
            {/* Background */}
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: 'linear-gradient(134deg, var(--ld-semantic-color-border-magic-start) 10.5%, var(--ld-semantic-color-border-magic-middle) 71.77%, var(--ld-semantic-color-border-magic-stop) 102.41%)' }}
            />

            {/* Content — white surface sits on gradient to show it only as border */}
            <div className={`${styles.fabSurface} flex items-center rounded-full relative z-10 transition-all duration-200 ease-out justify-center`} style={{ background: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)' }}>
              {/* Marty Mascot Logo */}
              <div className={`${styles.fabIcon} flex justify-center items-center rounded-full flex-shrink-0 relative`}>
                <div className="rounded-full w-full h-full flex items-center justify-center overflow-hidden">
                  <div
                    style={{
                      width: FAB_AVATAR_SIZE,
                      height: FAB_AVATAR_SIZE,
                      transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`,
                      transition: 'transform 0.1s ease-out'
                    }}
                  >
                    <img
                      src="/assets/sparky-wink.png"
                      alt=""
                      width={FAB_AVATAR_SIZE}
                      height={FAB_AVATAR_SIZE}
                      style={{ display: 'block', width: '100%', height: '100%' }}
                    />
                  </div>
                </div>

                {/* Speech Bubble Tooltip - Shows on hover */}
                <div
                  className={`absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-[60] ${
                    !hasMoved ? '-top-16 left-1/2 -translate-x-1/2' :
                    tooltipPosition === 'top' ? '-top-16 left-1/2 -translate-x-1/2' :
                    tooltipPosition === 'right' ? 'top-1/2 -translate-y-1/2 -right-52' :
                    tooltipPosition === 'left' ? 'top-1/2 -translate-y-1/2 -left-52' :
                    'top-full left-1/2 -translate-x-1/2 mt-2'
                  }`}
                >
                  <div className="rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.15)] px-3 py-2 relative whitespace-nowrap" style={{ background: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)' }}>
                    <span
                      className="text-sm [color:var(--ld-semantic-color-text)] font-normal"
                      style={{ transition: 'opacity 150ms ease', opacity: tooltipFading ? 0 : 1 }}
                    >{!hasMoved ? 'Move me' : dynamicTooltip}</span>
                      {/* Speech bubble arrow - position changes based on tooltip location */}
                    {(!hasMoved || tooltipPosition === 'top') && (
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white drop-shadow-sm" />
                    )}
                    {hasMoved && tooltipPosition === 'right' && (
                      <div className="absolute top-1/2 -translate-y-1/2 -left-2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-white drop-shadow-sm" />
                    )}
                    {hasMoved && tooltipPosition === 'left' && (
                      <div className="absolute top-1/2 -translate-y-1/2 -right-2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[8px] border-l-white drop-shadow-sm" />
                    )}
                    {hasMoved && tooltipPosition === 'bottom' && (
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-white drop-shadow-sm" />
                    )}
                  </div>
                </div>
              </div>

            </div>
          </button>
        </div>
      </>
    );
  }

  const handleCloseSidePanel = () => {
    setIsSidePanel(false);
    setIsMinimized(true);
    setIsExpanded(false);
  };

  // Resize handler for side panel
  const handleResizeMouseDown = (e: React.MouseEvent) => {
    if (!isSidePanel) return;
    e.preventDefault();
    isResizingRef.current = true;
    resizeStartXRef.current = e.clientX;
    resizeStartWidthRef.current = panelWidth;

    const onMouseMove = (mv: MouseEvent) => {
      if (!isResizingRef.current) return;
      const delta = resizeStartXRef.current - mv.clientX;
      const newWidth = Math.max(350, Math.min(800, resizeStartWidthRef.current + delta));
      setPanelWidth(newWidth);
    };

    const onMouseUp = () => {
      isResizingRef.current = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  // Full Panel - New Figma Design
  const panelClasses = isSidePanel
    ? isExpanded
      ? 'fixed inset-0 z-[99999] flex flex-col'
      : 'relative z-[9999] h-full flex flex-col border-l flex-shrink-0'
    : 'fixed bottom-0 right-4 z-[9999] w-[425px] h-[752px] rounded-t-2xl shadow-[0_-1px_4px_0_rgba(0,0,0,0.10),0_5px_10px_3px_rgba(0,0,0,0.15)] flex flex-col border animate-slide-up-panel';

  const fabJsx = isSidePanel && !isDocked && (
    <div
      className={`${styles.desktopFab} fixed z-[9999]`}
      style={{
        bottom: hasMoved ? 'auto' : '32px',
        right: hasMoved ? 'auto' : '32px',
        top: hasMoved ? `${fabPosition.y}px` : 'auto',
        left: hasMoved ? `${fabPosition.x}px` : 'auto',
        cursor: isDragging ? 'grabbing' : 'move'
      }}
    >
      <button
        onMouseDown={handleMouseDown}
        onClick={(e) => {
          if (!isDraggingRef.current) {
            openBottomSheetChat(e);
          }
          safeTimeout(() => {
            isDraggingRef.current = false;
          }, 100);
        }}
        className={`${styles.fabButton} inline-flex justify-center items-center rounded-full shadow-[0_-1px_3px_0_rgba(0,0,0,0.10),0_3px_5px_2px_rgba(0,0,0,0.15)] relative group transition-all duration-200 ease-out ${
          hasMoved ? 'overflow-visible' : 'overflow-hidden'
        }`}
        style={{
          cursor: isDragging ? 'grabbing' : 'move'
        }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{ background: 'linear-gradient(134deg, var(--ld-semantic-color-border-magic-start) 10.5%, var(--ld-semantic-color-border-magic-middle) 71.77%, var(--ld-semantic-color-border-magic-stop) 102.41%)' }}
        />
        <div className={`${styles.fabSurface} flex items-center rounded-full relative z-10 transition-all duration-200 ease-out justify-center`} style={{ background: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)' }}>
          <div className={`${styles.fabIcon} flex justify-center items-center rounded-full flex-shrink-0 relative`}>
            <div className="rounded-full overflow-hidden w-full h-full flex items-center justify-center">
              <div style={{ width: FAB_AVATAR_SIZE, height: FAB_AVATAR_SIZE }}>
                <img
                  src="/assets/sparky-wink.png"
                  alt=""
                  width={FAB_AVATAR_SIZE}
                  height={FAB_AVATAR_SIZE}
                  style={{ display: 'block', width: '100%', height: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );

  return (
    <>
    {fabJsx}
    <div className={panelClasses} style={{ background: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', borderColor: 'var(--ld-semantic-color-separator, #e3e4e5)', width: isSidePanel && !isExpanded ? `${panelWidth}px` : undefined }}>
      {/* Resize handle for side panel */}
      {isSidePanel && (
        <div
          onMouseDown={handleResizeMouseDown}
          className="absolute left-0 top-0 bottom-0 w-1 cursor-col-resize z-[10000] hover:[background:var(--ld-semantic-color-action-fill-primary)] active:[background:var(--ld-semantic-color-action-fill-primary)] transition-colors"
          style={{ marginLeft: '-2px' }}
        />
      )}
      {/* Navbar */}
      <div className="flex w-full h-[60px] px-4 py-3 justify-between items-center rounded-t-2xl border-b flex-shrink-0" style={{ background: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', borderColor: 'var(--ld-semantic-color-separator, #e3e4e5)' }}>
        {(viewState === 'campaignForm' || viewState === 'campaignSetup') ? (
          <div className="flex h-9 items-center gap-3">
            <button onClick={handleBack} className="w-6 h-6 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M12 5L5 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="flex pb-0.5 justify-center items-center">
              <div className="[color:var(--ld-semantic-color-text)] font-bold text-lg leading-6">Create campaign</div>
            </div>
          </div>
        ) : (
          <div className="flex h-9 items-center gap-1.5">
            <div className="[color:var(--ld-semantic-color-text)] font-bold text-lg leading-6">AI Assistant</div>

            {/* Beta Tag */}
            <Tag variant="tertiary" color="gray">Beta</Tag>
          </div>
        )}

        <div className="flex justify-end items-center gap-2">
          {/* More options menu */}
          <div ref={menuRef} className="relative">
            <IconButton
              aria-label="More options"
              variant="ghost"
              size="small"
              onClick={() => setMenuOpen(prev => !prev)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="5" cy="12" r="1.5" fill="currentColor"/>
                <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
                <circle cx="19" cy="12" r="1.5" fill="currentColor"/>
              </svg>
            </IconButton>
            {menuOpen && (
              <>
                {/* Click-outside overlay */}
                <div className="fixed inset-0 z-[10001]" onClick={() => setMenuOpen(false)} />
                <div
                  className="absolute right-0 top-full mt-1 z-[10002] min-w-[160px] rounded-lg border shadow-lg py-1 bg-white"
                  style={{
                    backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
                    borderColor: 'var(--ld-semantic-color-separator)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                  }}
                >
                  <button
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors hover:[background:var(--ld-semantic-color-fill-surface-hover)]"
                    style={{ color: 'var(--ld-semantic-color-text)' }}
                    onClick={handleClearChat}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 4h12M5 4V2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5V4M6 7v5M10 7v5M3 4l1 9.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5L13 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Clear chat
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Reports Icon with Notification */}
          <IconButton aria-label="Reports" variant="ghost" size="small" UNSAFE_className="relative">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 19.5V4C2 3.44772 2.44772 3 3 3H7.08579C7.351 3 7.60536 3.10536 7.79289 3.29289L10.2071 5.70711C10.3946 5.89464 10.649 6 10.9142 6H21.5C22.0523 6 22.5 6.44772 22.5 7V19.5C22.5 20.0523 22.0523 20.5 21.5 20.5H3C2.44772 20.5 2 20.0523 2 19.5Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M2 9H22.5" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </IconButton>

          {/* Expand / Collapse Icon */}
          <IconButton aria-label={isExpanded ? 'Collapse' : 'Expand'} variant="ghost" size="small" onClick={handleToggleExpand}>
            {isExpanded ? (
              // Compress / collapse icon
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 14H10V20" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M10 14L4 20" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M20 10H14V4" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M14 10L20 4" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            ) : (
              // Expand icon
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 4H20V10" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M14 10L20 4" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M10 20L4 20L4 14" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M10 14L4 20" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            )}
          </IconButton>

          {/* Close / Minimize Icon */}
          <IconButton
            aria-label={isSidePanel ? "Close panel" : "Minimize"}
            variant="ghost"
            size="small"
            onClick={isSidePanel ? handleCloseSidePanel : handleMinimize}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 18L18 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </IconButton>
        </div>
      </div>

      {/* Mark connection indicator */}
      {connectedToMark && (
        <div
          className="flex w-full px-4 py-2 items-center justify-between gap-2 border-b flex-shrink-0"
          style={{
            background: 'var(--ld-semantic-color-fill-brand-subtle, #e6f0ff)',
            borderColor: 'var(--ld-semantic-color-separator, #e3e4e5)',
          }}
        >
          <div className="flex items-center gap-2">
            <MarkAvatar size={22} />
            <span className="text-xs font-semibold" style={{ color: 'var(--ld-semantic-color-text)' }}>
              Mark is connected
            </span>
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: 'var(--ld-semantic-color-text-positive, #2a8703)' }}
            />
          </div>
          <button
            onClick={() => {
              setConnectedToMark(false);
              setMarkConcernIndex(0);
              setInputPlaceholder('How can I help?');
              const disconnectId = (Date.now()).toString();
              setMessages(prev => [...prev, {
                id: disconnectId,
                role: 'assistant',
                content: 'Mark has left the chat. You can reconnect anytime by asking me to connect you with Mark.',
                timestamp: new Date(),
                feedback: null,
              }]);
            }}
            className="text-xs font-semibold px-2 py-1 rounded transition-colors hover:[background:var(--ld-semantic-color-fill-surface-hover)]"
            style={{ color: 'var(--ld-semantic-color-text-subtle)' }}
          >
            Disconnect
          </button>
        </div>
      )}

      {/* Content - Changes based on viewState */}
      <div className="transition-all duration-300 ease-in-out flex-1 flex flex-col overflow-hidden" style={{ background: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)' }}>
      {viewState === 'welcome' && (
        <div className="flex w-full px-4 py-4 flex-col items-center gap-6 flex-1 overflow-y-auto" style={{ background: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)' }}>
          <div className="flex flex-col items-center gap-6 self-stretch">
            {/* Avatar + Greeting stacked */}
            <div
              className="flex flex-col items-center gap-4 self-stretch"
              style={{
                transition: 'transform 350ms ease, opacity 350ms ease',
                transform: avatarExiting ? 'translateY(-48px)' : 'translateY(0)',
                opacity: avatarExiting ? 0 : 1,
              }}
            >
              <div className="flex flex-col items-center gap-2 text-center">
                <h1
                  className="font-bold text-2xl leading-8"
                  style={{
                    background: 'linear-gradient(134deg, var(--ld-semantic-color-text-magic-start) 10.5%, var(--ld-semantic-color-text-magic-middle) 71.77%, var(--ld-semantic-color-text-magic-stop) 102.41%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  {t('greeting')}
                </h1>
                <p className="[color:var(--ld-semantic-color-text)] text-sm leading-5">
                  {t('welcomeMessage')}
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

      {viewState === 'chat' && (
        <div className="flex w-full flex-col flex-1 overflow-hidden" style={{ background: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)' }}>
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-4 py-4" style={{ background: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)' }}>
            {messages.length === 0 ? (
              <div className="flex flex-col items-start gap-4 h-full justify-center">
                <h1
                  className="self-stretch font-bold text-2xl leading-8"
                  style={{
                    background: 'linear-gradient(134deg, var(--ld-semantic-color-text-magic-start) 10.5%, var(--ld-semantic-color-text-magic-middle) 71.77%, var(--ld-semantic-color-text-magic-stop) 102.41%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  {t('greeting')}
                </h1>
                <p className="self-stretch [color:var(--ld-semantic-color-text)] text-sm leading-5">
                  {t('welcomeMessage')}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex w-full flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    {message.type === 'recommendations' ? (
                      <div className="w-full">
                        <MartyRecommendationsCarousel />
                      </div>
                    ) : message.type === 'performance' ? (
                      <div className="w-full">
                        <MartyCampaignPerformanceList />
                      </div>
                    ) : message.type === 'metricBreakdown' ? (
                      <div className="w-full rounded-lg border [border-color:var(--ld-semantic-color-separator)] p-3">
                        {renderMetricBreakdownTable(message.metricName || 'Impressions')}
                      </div>
                    ) : (
                    <div
                      className={`flex max-w-[85%] items-start gap-2 ${
                      message.role === 'user'
                        ? '[background:var(--Full-Color-Palette-Gray-Gray-10,#F1F1F2)] rounded-lg px-4 py-2 flex-col'
                        : message.role === 'mark'
                        ? 'flex-row'
                        : 'flex-col'
                    }`}
                    >
                      {message.role === 'mark' && <MarkAvatar />}
                      <div className={`flex flex-col gap-1 ${message.role === 'mark' ? 'flex-1' : ''}`}>
                        {message.role === 'mark' && (
                          <span className="text-xs font-bold leading-4" style={{ color: 'var(--ld-semantic-color-action-fill-primary)' }}>Mark</span>
                        )}
                      {(() => {
                        const synthesisMatch = message.role === 'user' && message.content.match(/^Context selected: (.+)\nUser question: (.*)$/s);
                        if (synthesisMatch) {
                          const labels = synthesisMatch[1].split(' | ');
                          const question = synthesisMatch[2].trim();
                          return (
                            <div className="flex flex-col gap-1">
                              <div className="flex flex-wrap gap-1 mb-0.5">
                                {labels.map((label, i) => (
                                  <Tag key={i} variant="tertiary" color="info">{label}</Tag>
                                ))}
                              </div>
                              <div className="[color:var(--ld-semantic-color-text)] text-sm leading-5">
                                {question === 'Tell me about these' ? 'Tell me about these' : question}
                              </div>
                            </div>
                          );
                        }
                        return <div className="[color:var(--ld-semantic-color-text)] text-sm leading-5 whitespace-pre-wrap">{renderMarkdown(message.content)}</div>;
                      })()}
                      </div>
                    </div>
                    )}
                    {message.role === 'assistant' && message.type === 'performance' && (
                      <div className="flex items-center mt-2">
                        <span className="[color:var(--ld-semantic-color-text)] text-xs leading-4 mr-1">Was this helpful?</span>
                        <button
                          onClick={() => handleFeedback(message.id, 'up')}
                          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:[background:var(--ld-semantic-color-fill-subtle)] active:[background:var(--ld-semantic-color-separator)]"
                          aria-label="Helpful"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.1035 6C11.8808 6 11.7094 5.68176 11.7842 5.47205C11.8968 5.15649 12 4.6814 12 4V3.49988C12 2.11914 10.8807 1 9.5 1C8.94772 1 8.5 1.44775 8.5 2V3.58008C8.5 4.16394 8.24487 4.71863 7.80157 5.09863L5.69843 6.90137C5.25513 7.28137 5 7.83606 5 8.41992V10.5C5 12.7091 6.79086 14.5 9 14.5H11.9296C12.5983 14.5 13.2228 14.1658 13.5937 13.6094L13.8321 13.252C13.9416 13.0876 14 12.8947 14 12.6973V12.2361C14 12.1364 14.0149 12.0375 14.044 11.9427C14.0602 11.89 14.0807 11.8385 14.1056 11.7888L14.1295 11.741C14.3667 11.2665 14.4058 10.7173 14.238 10.2141L14.1867 10.0601C14.0736 9.7207 14.1751 9.3468 14.4442 9.11133C15.6779 8.03186 14.9144 6 13.2752 6H12.1035ZM13.2351 11.2937L13.2112 11.3417C13.0723 11.6194 13 11.9255 13 12.2361V12.6973L12.7617 13.0547C12.5762 13.3329 12.264 13.5 11.9296 13.5H9C7.34314 13.5 6 12.1569 6 10.5V8.41992C6 8.12793 6.12756 7.85059 6.34921 7.66064L8.45236 5.85791C9.11731 5.28796 9.5 4.45593 9.5 3.58008V2C10.3285 2 11 2.67151 11 3.49988V4C11 4.57935 10.9125 4.93933 10.8424 5.13586C10.6786 5.59497 10.8051 6.03687 10.9673 6.31641C11.1247 6.58777 11.4966 7 12.1035 7H13.2752C13.9911 7 14.3245 7.88733 13.7857 8.35876C13.2134 8.8595 12.9975 9.65479 13.238 10.3762L13.2893 10.5303C13.3732 10.7819 13.3537 11.0565 13.2351 11.2937Z" fill="currentColor"/>
                            <path d="M2.70001 7C1.76111 7 1 7.76111 1 8.69995V12.3C1 13.2389 1.76111 14 2.70001 14H3.9996V13H2.70001C2.31342 13 2 12.6866 2 12.3V8.69995C2 8.31335 2.31342 8 2.70001 8H3.9996V7H2.70001Z" fill="currentColor"/>
                          </svg>
                        </button>
                        <button
                          onClick={() => handleFeedback(message.id, 'down')}
                          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:[background:var(--ld-semantic-color-fill-subtle)] active:[background:var(--ld-semantic-color-separator)]"
                          aria-label="Not helpful"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.1035 10.0117C11.8808 10.0117 11.7094 10.33 11.7842 10.5397C11.8968 10.8552 12 11.3303 12 12.0117V12.5118C12 13.8926 10.8807 15.0117 9.5 15.0117C8.94772 15.0117 8.5 14.564 8.5 14.0117V12.4316C8.5 11.8478 8.24487 11.2931 7.80157 10.9131L5.69843 9.11035C5.25513 8.73035 5 8.17566 5 7.5918V5.51172C5 3.30261 6.79086 1.51172 9 1.51172H11.9296C12.5983 1.51172 13.2228 1.84595 13.5937 2.40234L13.8321 2.75977C13.9416 2.92407 14 3.11707 14 3.31445V3.77563C14 3.87537 14.0149 3.97424 14.044 4.06897C14.0602 4.1217 14.0807 4.17322 14.1056 4.2229L14.1295 4.27075C14.3667 4.74524 14.4058 5.29443 14.238 5.79761L14.1867 5.95166C14.0736 6.29102 14.1751 6.66492 14.4442 6.90039C15.6779 7.97986 14.9144 10.0117 13.2752 10.0117H12.1035ZM13.2351 4.71802L13.2112 4.67004C13.0723 4.39233 13 4.08618 13 3.77563V3.31445L12.7617 2.95703C12.5762 2.67883 12.264 2.51172 11.9296 2.51172H9C7.34314 2.51172 6 3.85486 6 5.51172V7.5918C6 7.88379 6.12756 8.16113 6.34921 8.35107L8.45236 10.1538C9.11731 10.7238 9.5 11.5558 9.5 12.4316V14.0117C10.3285 14.0117 11 13.3402 11 12.5118V12.0117C11 11.4324 10.9125 11.0724 10.8424 10.8759C10.6786 10.4167 10.8051 9.97485 10.9673 9.69531C11.1247 9.42395 11.4966 9.01172 12.1035 9.01172H13.2752C13.9911 9.01172 14.3245 8.12439 13.7857 7.65295C13.2134 7.15222 12.9975 6.35693 13.238 5.6355L13.2893 5.48145C13.3732 5.22986 13.3537 4.9552 13.2351 4.71802Z" fill="currentColor"/>
                            <path d="M2.70001 9.01172C1.76111 9.01172 1 8.25061 1 7.31177V3.71167C1 2.77283 1.76111 2.01172 2.70001 2.01172H3.9996V3.01172H2.70001C2.31342 3.01172 2 3.32507 2 3.71167V7.31177C2 7.69836 2.31342 8.01172 2.70001 8.01172H3.9996V9.01172H2.70001Z" fill="currentColor"/>
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                ))}

                {/* Thinking Indicator — only while waiting for first content, not during animation.
                    Text-only — no mascot/avatar icon, to match the rest of the chat. */}
                {isTyping && (
                  <div className="flex w-full items-center gap-1.5 py-1">
                    <div className="[color:var(--ld-semantic-color-text)] text-sm leading-5">
                      {t('thinking')}<span className="inline-flex">
                        <span className="animate-[bounce_1.4s_ease-in-out_infinite]" style={{ animationDelay: '0ms' }}>.</span>
                        <span className="animate-[bounce_1.4s_ease-in-out_infinite]" style={{ animationDelay: '200ms' }}>.</span>
                        <span className="animate-[bounce_1.4s_ease-in-out_infinite]" style={{ animationDelay: '400ms' }}>.</span>
                      </span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>
      )}

      {viewState === 'campaignSetup' && (
        <div className="flex w-full flex-col flex-1 overflow-hidden" style={{ background: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)' }}>
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-4 py-4" style={{ background: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)' }}>
            <div className="flex flex-col gap-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex w-full flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`flex max-w-[85%] flex-col items-start gap-2 ${
                      message.role === 'user'
                        ? '[background:var(--Full-Color-Palette-Gray-Gray-10,#F1F1F2)] rounded-lg px-4 py-2'
                        : '[background:var(--ld-semantic-color-fill-surface-primary)] rounded-lg'
                    }`}
                  >
                    <div className="[color:var(--ld-semantic-color-text)] text-sm leading-5 whitespace-pre-wrap">
                      {renderMarkdown(message.content)}
                    </div>
                  </div>
                  {message.role === 'assistant' && (
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleFeedback(message.id, 'up')}
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:[background:var(--ld-semantic-color-fill-subtle)] active:[background:var(--ld-semantic-color-separator)]"
                      >
                        {message.feedback === 'up' ? (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.1035 6C11.8808 6 11.7094 5.68176 11.7842 5.47205C11.8968 5.15649 12 4.6814 12 4V3.49988C12 2.11914 10.8807 1 9.5 1C8.94772 1 8.5 1.44775 8.5 2V3.58008C8.5 4.16394 8.24487 4.71863 7.80157 5.09863L5.69843 6.90137C5.25513 7.28137 5 7.83606 5 8.41992V10.5C5 12.7091 6.79086 14.5 9 14.5H11.9296C12.5983 14.5 13.2228 14.1658 13.5937 13.6094L13.8321 13.252C13.9416 13.0876 14 12.8947 14 12.6973V12.2361C14 12.1364 14.0149 12.0375 14.044 11.9427C14.0602 11.89 14.0807 11.8385 14.1056 11.7888L14.1295 11.741C14.3667 11.2665 14.4058 10.7173 14.238 10.2141L14.1867 10.0601C14.0736 9.7207 14.1751 9.3468 14.4442 9.11133C15.6779 8.03186 14.9144 6 13.2752 6H12.1035Z" fill="currentColor"/>
                            <path d="M2.70001 7C1.76111 7 1 7.76111 1 8.69995V12.3C1 13.2389 1.76111 14 2.70001 14H3.9996V13H2.70001C2.31342 13 2 12.6866 2 12.3V8.69995C2 8.31335 2.31342 8 2.70001 8H3.9996V7H2.70001Z" fill="currentColor"/>
                          </svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.1035 6C11.8808 6 11.7094 5.68176 11.7842 5.47205C11.8968 5.15649 12 4.6814 12 4V3.49988C12 2.11914 10.8807 1 9.5 1C8.94772 1 8.5 1.44775 8.5 2V3.58008C8.5 4.16394 8.24487 4.71863 7.80157 5.09863L5.69843 6.90137C5.25513 7.28137 5 7.83606 5 8.41992V10.5C5 12.7091 6.79086 14.5 9 14.5H11.9296C12.5983 14.5 13.2228 14.1658 13.5937 13.6094L13.8321 13.252C13.9416 13.0876 14 12.8947 14 12.6973V12.2361C14 12.1364 14.0149 12.0375 14.044 11.9427C14.0602 11.89 14.0807 11.8385 14.1056 11.7888L14.1295 11.741C14.3667 11.2665 14.4058 10.7173 14.238 10.2141L14.1867 10.0601C14.0736 9.7207 14.1751 9.3468 14.4442 9.11133C15.6779 8.03186 14.9144 6 13.2752 6H12.1035ZM13.2351 11.2937L13.2112 11.3417C13.0723 11.6194 13 11.9255 13 12.2361V12.6973L12.7617 13.0547C12.5762 13.3329 12.264 13.5 11.9296 13.5H9C7.34314 13.5 6 12.1569 6 10.5V8.41992C6 8.12793 6.12756 7.85059 6.34921 7.66064L8.45236 5.85791C9.11731 5.28796 9.5 4.45593 9.5 3.58008V2C10.3285 2 11 2.67151 11 3.49988V4C11 4.57935 10.9125 4.93933 10.8424 5.13586C10.6786 5.59497 10.8051 6.03687 10.9673 6.31641C11.1247 6.58777 11.4966 7 12.1035 7H13.2752C13.9911 7 14.3245 7.88733 13.7857 8.35876C13.2134 8.8595 12.9975 9.65479 13.238 10.3762L13.2893 10.5303C13.3732 10.7819 13.3537 11.0565 13.2351 11.2937Z" fill="currentColor"/>
                            <path d="M2.70001 7C1.76111 7 1 7.76111 1 8.69995V12.3C1 13.2389 1.76111 14 2.70001 14H3.9996V13H2.70001C2.31342 13 2 12.6866 2 12.3V8.69995C2 8.31335 2.31342 8 2.70001 8H3.9996V7H2.70001Z" fill="currentColor"/>
                          </svg>
                        )}
                      </button>
                      <button
                        onClick={() => handleFeedback(message.id, 'down')}
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:[background:var(--ld-semantic-color-fill-subtle)] active:[background:var(--ld-semantic-color-separator)]"
                      >
                        {message.feedback === 'down' ? (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.1035 10.0117C11.8808 10.0117 11.7094 10.33 11.7842 10.5397C11.8968 10.8552 12 11.3303 12 12.0117V12.5118C12 13.8926 10.8807 15.0117 9.5 15.0117C8.94772 15.0117 8.5 14.564 8.5 14.0117V12.4316C8.5 11.8478 8.24487 11.2931 7.80157 10.9131L5.69843 9.11035C5.25513 8.73035 5 8.17566 5 7.5918V5.51172C5 3.30261 6.79086 1.51172 9 1.51172H11.9296C12.5983 1.51172 13.2228 1.84595 13.5937 2.40234L13.8321 2.75977C13.9416 2.92407 14 3.11707 14 3.31445V3.77563C14 3.87537 14.0149 3.97424 14.044 4.06897C14.0602 4.1217 14.0807 4.17322 14.1056 4.2229L14.1295 4.27075C14.3667 4.74524 14.4058 5.29443 14.238 5.79761L14.1867 5.95166C14.0736 6.29102 14.1751 6.66492 14.4442 6.90039C15.6779 7.97986 14.9144 10.0117 13.2752 10.0117H12.1035Z" fill="currentColor"/>
                            <path d="M2.70001 9.01172C1.76111 9.01172 1 8.25061 1 7.31177V3.71167C1 2.77283 1.76111 2.01172 2.70001 2.01172H3.9996V3.01172H2.70001C2.31342 3.01172 2 3.32507 2 3.71167V7.31177C2 7.69836 2.31342 8.01172 2.70001 8.01172H3.9996V9.01172H2.70001Z" fill="currentColor"/>
                          </svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.1035 10.0117C11.8808 10.0117 11.7094 10.33 11.7842 10.5397C11.8968 10.8552 12 11.3303 12 12.0117V12.5118C12 13.8926 10.8807 15.0117 9.5 15.0117C8.94772 15.0117 8.5 14.564 8.5 14.0117V12.4316C8.5 11.8478 8.24487 11.2931 7.80157 10.9131L5.69843 9.11035C5.25513 8.73035 5 8.17566 5 7.5918V5.51172C5 3.30261 6.79086 1.51172 9 1.51172H11.9296C12.5983 1.51172 13.2228 1.84595 13.5937 2.40234L13.8321 2.75977C13.9416 2.92407 14 3.11707 14 3.31445V3.77563C14 3.87537 14.0149 3.97424 14.044 4.06897C14.0602 4.1217 14.0807 4.17322 14.1056 4.2229L14.1295 4.27075C14.3667 4.74524 14.4058 5.29443 14.238 5.79761L14.1867 5.95166C14.0736 6.29102 14.1751 6.66492 14.4442 6.90039C15.6779 7.97986 14.9144 10.0117 13.2752 10.0117H12.1035ZM13.2351 4.71802L13.2112 4.67004C13.0723 4.39233 13 4.08618 13 3.77563V3.31445L12.7617 2.95703C12.5762 2.67883 12.264 2.51172 11.9296 2.51172H9C7.34314 2.51172 6 3.85486 6 5.51172V7.5918C6 7.88379 6.12756 8.16113 6.34921 8.35107L8.45236 10.1538C9.11731 10.7238 9.5 11.5558 9.5 12.4316V14.0117C10.3285 14.0117 11 13.3402 11 12.5118V12.0117C11 11.4324 10.9125 11.0724 10.8424 10.8759C10.6786 10.4167 10.8051 9.97485 10.9673 9.69531C11.1247 9.42395 11.4966 9.01172 12.1035 9.01172H13.2752C13.9911 9.01172 14.3245 8.12439 13.7857 7.65295C13.2134 7.15222 12.9975 6.35693 13.238 5.6355L13.2893 5.48145C13.3732 5.22986 13.3537 4.9552 13.2351 4.71802Z" fill="currentColor"/>
                            <path d="M2.70001 9.01172C1.76111 9.01172 1 8.25061 1 7.31177V3.71167C1 2.77283 1.76111 2.01172 2.70001 2.01172H3.9996V3.01172H2.70001C2.31342 3.01172 2 3.32507 2 3.71167V7.31177C2 7.69836 2.31342 8.01172 2.70001 8.01172H3.9996V9.01172H2.70001Z" fill="currentColor"/>
                          </svg>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Campaign Type Options - Hidden when on campaign page or after selection */}
              {!isTyping && location.pathname !== '/campaign' && messages.length <= 2 && (
                <div className="flex w-full justify-start">
                  <div className="flex flex-col gap-2 max-w-[85%]">
                    <Button
                      onClick={() => handleCampaignTypeSelection(t('campaignTypes.sponsoredAutomatic'))}
                      variant="tertiary"
                      UNSAFE_className="text-sm"
                    >
                      {t('campaignTypes.sponsoredAutomatic')}
                    </Button>
                    <Button
                      onClick={() => handleCampaignTypeSelection(t('campaignTypes.sponsoredManual'))}
                      variant="tertiary"
                      UNSAFE_className="text-sm"
                    >
                      {t('campaignTypes.sponsoredManual')}
                    </Button>
                    <Button
                      onClick={() => handleCampaignTypeSelection(t('campaignTypes.display'))}
                      variant="tertiary"
                      UNSAFE_className="text-sm"
                    >
                      {t('campaignTypes.display')}
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Thinking Indicator — only while waiting for first content, not during animation */}
              {isTyping && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex w-full items-center gap-1.5 py-1">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                    <path d="M11.6786 0.242428C13.0883 1.95515 14.4645 4.10004 16.1422 5.5576C18.2759 7.41066 22.7618 8.11712 21.974 11.828C21.6009 13.5838 19.1051 15.4321 17.9904 16.9056C16.3862 19.0265 15.8567 21.5271 13.6672 23.2318C13.3275 23.4965 12.94 23.8952 12.4759 23.8697C10.052 23.4567 9.48425 21.5685 7.77631 20.0599C6.93749 19.32 5.58677 18.3647 4.61081 17.8162C2.28093 16.5069 -0.500249 15.987 0.0770371 12.4101C0.36568 10.6272 3.62049 8.3643 4.8851 6.72653C6.13694 5.10471 7.26122 1.86903 8.59759 0.902638C9.75854 0.0622249 9.859 0.0111936 11.0327 3.06028e-05C11.3373 -0.00315882 11.5542 0.244022 11.6786 0.240833V0.242428ZM9.92439 4.52583C9.08557 4.35041 8.3217 5.19879 8.1718 5.9515C8.37752 6.14765 10.3358 4.91653 9.92439 4.52583ZM15.6638 5.63096C16.1326 4.93885 13.192 5.13501 13.4471 5.77927C13.6991 6.05197 14.2237 6.08067 14.3848 6.18752C14.4853 6.25449 15.3735 7.7902 15.7419 8.17293C17.0528 9.52844 17.0687 8.45679 16.4898 7.27032C16.2506 6.77915 15.7499 6.0711 15.1853 5.94831L15.6622 5.63096H15.6638ZM9.84465 6.11256C9.26099 6.51284 9.40132 7.41863 9.48744 8.05173C9.55282 8.53015 10.0775 10.4486 10.7967 10.2317C11.5159 10.0148 10.7457 6.46021 9.84465 6.11256ZM20.1305 10.2317C20.6122 9.74532 17.3908 6.78553 18.783 9.6002C16.3941 12.2091 12.4408 12.316 9.12703 12.4531L9.05208 11.3384C8.57207 10.6415 8.11917 12.0226 8.0506 12.4101C7.99638 12.7195 7.85764 14.0048 8.40941 13.8788L8.90856 13.0735C11.744 13.5375 16.0672 13.1676 18.303 11.1869C19.0206 10.5506 19.0127 9.80273 20.1321 10.2317H20.1305Z" fill="#A88BFF"/>
                    <path d="M12.4759 23.8713C12.94 23.8952 13.3275 23.4981 13.6672 23.2334C15.8567 21.5287 16.3862 19.0281 17.9905 16.9072C19.1052 15.4337 21.6009 13.5838 21.9741 11.8296C22.7618 8.11872 18.2759 7.41226 16.1422 5.5592C14.4661 4.10164 13.0899 1.95675 11.6786 0.244025C13.243 0.204157 15.0785 3.0252 16.2187 4.05379C16.7227 4.50829 17.4435 5.06484 18.0064 5.44757C20.113 6.87803 23.6995 7.551 23.9627 10.4661C24.2433 13.5647 22.2165 14.0207 20.4431 15.8595C19.507 16.8322 18.4768 18.2547 17.8134 19.4284C16.7769 21.2607 16.5967 23.1154 14.2636 23.8266C13.3977 24.0914 13.2845 24.0084 12.4744 23.8713H12.4759Z" fill="#9170FE"/>
                    <path d="M20.1305 10.2317C19.0111 9.80272 19.019 10.5506 18.3014 11.1869C16.0656 13.1692 11.744 13.5375 8.90696 13.0735L8.40782 13.8788C7.85764 14.0048 7.99478 12.7179 8.049 12.4101C8.11758 12.0226 8.57048 10.6415 9.05048 11.3384L9.12544 12.4531C12.4392 12.316 16.3925 12.2091 18.7814 9.60019C17.3892 6.78553 20.6106 9.74531 20.129 10.2317H20.1305Z" fill="#011B56"/>
                    <path d="M15.6638 5.63098L15.187 5.94832C15.7499 6.07112 16.2506 6.77757 16.4914 7.27034C17.0703 8.45681 17.0544 9.52845 15.7435 8.17295C15.3751 7.79181 14.4869 6.25451 14.3864 6.18753C14.2253 6.08068 13.7007 6.05039 13.4487 5.77928C13.1936 5.13502 16.1326 4.93887 15.6654 5.63098H15.6638Z" fill="#011B56"/>
                    <path d="M9.8447 6.11255C10.7457 6.4586 11.5191 10.0148 10.7967 10.2317C10.0743 10.4486 9.55286 8.53013 9.48748 8.05172C9.40137 7.42021 9.26263 6.51441 9.8447 6.11255Z" fill="#011B56"/>
                    <path d="M9.92434 4.52583C10.3358 4.91494 8.37747 6.14766 8.17175 5.95151C8.32166 5.1988 9.08552 4.35042 9.92434 4.52583Z" fill="#011B56"/>
                  </svg>
                  <div className="[color:var(--ld-semantic-color-text)] text-sm leading-5">
                    {t('thinking')}<span className="inline-flex">
                      <span className="animate-[bounce_1.4s_ease-in-out_infinite]" style={{ animationDelay: '0ms' }}>.</span>
                      <span className="animate-[bounce_1.4s_ease-in-out_infinite]" style={{ animationDelay: '200ms' }}>.</span>
                      <span className="animate-[bounce_1.4s_ease-in-out_infinite]" style={{ animationDelay: '400ms' }}>.</span>
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Footer Section */}
          <div className="flex w-full px-4 py-4 flex-col items-center gap-3 [background:var(--ld-semantic-color-fill-surface-primary)] border-t [border-color:var(--ld-semantic-color-separator)]">
            {/* Input Field */}
            <div className="flex max-h-44 px-4 py-3 items-end justify-start gap-6 self-stretch rounded-[30px] border [border-color:var(--ld-semantic-color-separator)] [background:var(--ld-semantic-color-fill-surface-primary)] transition-colors focus-within:[border-color:var(--ld-semantic-color-action-fill-primary)] focus-within:shadow-[0_0_0_1px_var(--ld-semantic-color-action-fill-primary)]">
              <textarea
                ref={textareaRef}
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={inputPlaceholder}
              rows={1}
              className="flex-1 [color:var(--ld-semantic-color-text)] text-sm leading-5 outline-none bg-transparent placeholder:[color:var(--ld-semantic-color-text-subtle)] resize-none overflow-y-auto max-h-[152px] py-0.5 self-stretch my-auto"
              disabled={isTyping}
              style={{ minHeight: '20px', height: 'auto' }}
              />
              <IconButton
                aria-label={isTyping ? 'Stop generation' : 'Send message'}
                variant="primary"
                shape="rounded"
                size="medium"
                onClick={isTyping ? handleStopGeneration : handleSendMessage}
                disabled={!isTyping && !userMessage.trim() && inputPlaceholder !== 'Show me recommendations'}
              >
                {isTyping ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="12" height="12" rx="2" fill="currentColor"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 3L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M3 8L8 3L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </IconButton>
            </div>

            {/* Disclaimer */}
            <div className="w-full [color:var(--ld-semantic-color-text-subtle)] text-center text-xs leading-4">
              {t('disclaimer')} <span className="underline hover:no-underline cursor-pointer">{t('disclaimerLink')}</span>.
            </div>
          </div>
        </div>
      )}

      {viewState === 'campaignForm' && (
        <div className="flex w-full h-[692px] flex-col items-start flex-shrink-0">
          <div className="flex px-4 py-4 flex-col items-center gap-4 flex-1 self-stretch overflow-y-auto">
            {/* Campaign Type */}
            <div className="flex flex-col items-start gap-1 self-stretch">
              <div className="flex pb-1 items-center gap-1 self-stretch">
                <div className="flex-1 [color:var(--ld-semantic-color-text)] text-xs font-bold leading-4">
                  {t('campaign.type')}
                </div>
              </div>
              <div className="flex h-10 px-3 py-2 items-center gap-2 self-stretch rounded-lg border [border-color:var(--ld-semantic-color-field-border)] [background:var(--ld-semantic-color-fill-surface-primary)] focus-within:[border-color:var(--ld-semantic-color-action-fill-primary)] transition-colors">
                <div className="flex h-6 py-0.5 justify-center items-center flex-1">
                  <input
                    type="text"
                    value={campaignData.campaignType}
                    onChange={(e) => setCampaignData({...campaignData, campaignType: e.target.value})}
                    className="w-full [color:var(--ld-semantic-color-text)] text-sm leading-5 outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Campaign Name */}
            <div className="flex flex-col items-start gap-1 self-stretch">
              <div className="flex pb-1 items-center gap-1 self-stretch">
                <div className="flex-1 [color:var(--ld-semantic-color-text)] text-xs font-bold leading-4">
                  {t('campaign.name')}
                </div>
              </div>
              <div className="flex h-10 px-3 py-2 items-center gap-2 self-stretch rounded-lg border [border-color:var(--ld-semantic-color-field-border)] [background:var(--ld-semantic-color-fill-surface-primary)] focus-within:[border-color:var(--ld-semantic-color-action-fill-primary)] transition-colors">
                <div className="flex h-6 py-0.5 justify-center items-center flex-1">
                  <input
                    type="text"
                    value={campaignData.campaignName}
                    onChange={(e) => setCampaignData({...campaignData, campaignName: e.target.value})}
                    className="w-full [color:var(--ld-semantic-color-text)] text-sm leading-5 outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Start Date */}
            <div className="flex flex-col items-start gap-1 self-stretch">
              <div className="self-stretch [color:var(--ld-semantic-color-text)] text-xs font-bold leading-4">
                {t('campaign.startDate')}
              </div>
              <div className="flex h-10 px-3 py-0 pr-1 items-center gap-3 self-stretch rounded-lg border [border-color:var(--ld-semantic-color-field-border)] [background:var(--ld-semantic-color-fill-surface-primary)] focus-within:[border-color:var(--ld-semantic-color-action-fill-primary)] transition-colors">
                <input
                  type="text"
                  value={campaignData.startDate}
                  onChange={(e) => setCampaignData({...campaignData, startDate: e.target.value})}
                  placeholder="mm/dd/yyyy"
                  className="flex-1 [color:var(--ld-semantic-color-text)] text-sm leading-5 outline-none bg-transparent"
                />
                <button className="flex p-2 flex-col items-start rounded-full border border-transparent bg-transparent hover:[background:var(--ld-primitive-color-gray-10)] active:[background:var(--ld-primitive-color-gray-20)] transition-colors">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="4" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M3 6H13" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M5 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M11 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Daily Budget */}
            <div className="flex flex-col items-start gap-1 self-stretch">
              <div className="flex pb-1 items-center gap-1 self-stretch">
                <div className="flex-1 [color:var(--ld-semantic-color-text)] text-xs font-bold leading-4">
                  {t('campaign.dailyBudget')}
                </div>
              </div>
              <div className="flex h-10 px-3 py-2 items-center gap-2 self-stretch rounded-lg border [border-color:var(--ld-semantic-color-field-border)] [background:var(--ld-semantic-color-fill-surface-primary)] focus-within:[border-color:var(--ld-semantic-color-action-fill-primary)] transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex flex-shrink-0">
                  <path fillRule="evenodd" clipRule="evenodd" d="M8.75 1.75C8.75 1.33579 8.41421 1 8 1C7.58579 1 7.25 1.33579 7.25 1.75V2.25C6.14924 2.31595 5.24291 2.59963 4.58058 3.10296C3.86609 3.64503 3.5 4.41052 3.5 5.25C3.5 6.08948 3.86609 6.85497 4.58058 7.39704C5.24291 7.90037 6.14924 8.18405 7.25 8.25V11.75C6.69238 11.7149 6.21735 11.6125 5.84467 11.4528C5.46842 11.2915 5.25 11.1018 5.25 10.75C5.25 10.3358 4.91421 10 4.5 10C4.08579 10 3.75 10.3358 3.75 10.75C3.75 11.5895 4.11609 12.355 4.83058 12.897C5.49291 13.4004 6.39924 13.684 7.5 13.75V14.25C7.5 14.6642 7.83579 15 8.25 15C8.66421 15 9 14.6642 9 14.25V13.75C10.1008 13.684 11.0071 13.4004 11.6694 12.897C12.3839 12.355 12.75 11.5895 12.75 10.75C12.75 9.91052 12.3839 9.14503 11.6694 8.60296C11.0071 8.09963 10.1008 7.81595 9 7.75V4.25C9.55762 4.28514 10.0327 4.38754 10.4053 4.54721C10.7816 4.70848 11 4.89824 11 5.25C11 5.66421 11.3358 6 11.75 6C12.1642 6 12.5 5.66421 12.5 5.25C12.5 4.41052 12.1339 3.64503 11.4194 3.10296C10.7571 2.59963 9.85076 2.31595 8.75 2.25V1.75ZM7.25 6.75C6.30762 6.71486 5.71735 6.48754 5.33058 6.16046C5.00891 5.89503 5 5.62552 5 5.25C5 4.87448 5.00891 4.60497 5.33058 4.33954C5.71735 4.01246 6.30762 3.78514 7.25 3.75V6.75ZM8.75 9.25C9.69238 9.28514 10.2827 9.51246 10.6694 9.83954C10.9911 10.105 11 10.3745 11 10.75C11 11.1255 10.9911 11.395 10.6694 11.6605C10.2827 11.9875 9.69238 12.2149 8.75 12.25V9.25Z" fill="#74767C"/>
                </svg>
                <div className="flex h-6 py-0.5 justify-center items-center flex-1">
                  <input
                    type="text"
                    value={campaignData.dailyBudget}
                    onChange={(e) => setCampaignData({...campaignData, dailyBudget: e.target.value})}
                    className="w-full [color:var(--ld-semantic-color-text)] text-sm leading-5 outline-none bg-transparent"
                    placeholder=""
                  />
                </div>
              </div>
            </div>

            {/* Item List */}
            <div className="flex flex-col items-start gap-1 self-stretch">
              <div className="flex pb-1 items-center gap-1 self-stretch">
                <div className="flex-1 [color:var(--ld-semantic-color-text)] text-xs font-bold leading-4">
                  {t('campaign.itemList')}
                </div>
              </div>
              <div className="flex h-10 pl-3 pr-3 items-center gap-2 self-stretch rounded-lg border [border-color:var(--ld-semantic-color-field-border)] [background:var(--ld-semantic-color-fill-surface-primary)]">
                <div className="flex h-6 py-0.5 justify-center items-center flex-1">
                  <div className="w-full [color:var(--ld-semantic-color-text)] text-sm leading-5">
                    {t('campaign.topSuggestions')}
                  </div>
                </div>
                <button className="text-sm leading-5 underline hover:no-underline">
                  {t('actions.edit', { ns: 'common' })}
                </button>
              </div>
            </div>

            {/* Additional Settings Accordion */}
            <div className="flex flex-col items-start gap-4 self-stretch">
              <button
                onClick={() => setIsAdditionalSettingsOpen(!isAdditionalSettingsOpen)}
                className="flex items-center gap-3 self-stretch [background:var(--ld-semantic-color-fill-surface-primary)] w-full"
              >
                <div className="flex flex-col justify-center items-start gap-1 flex-1">
                  <div className="flex items-center self-stretch">
                    <div className="[color:var(--ld-semantic-color-text)] font-bold text-base leading-6">
                      {t('campaign.additionalSettings')}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      transform: isAdditionalSettingsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 200ms ease-in-out'
                    }}
                  >
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>

              {/* Accordion Content */}
              {isAdditionalSettingsOpen && (
                <div className="flex flex-col items-start gap-4 self-stretch">
                  {/* Expanded Targeting */}
                  <div className="flex flex-col items-start gap-2 self-stretch">
                    <div className="flex pb-1 items-center gap-1 self-stretch">
                      <div className="flex-1 [color:var(--ld-semantic-color-text)] text-xs font-bold leading-4">
                        {t('campaign.expandedTargeting')}
                      </div>
                    </div>
                    <div className="text-[#000] text-xs leading-4">
                      {t('campaign.expandedTargetingDesc')} <span className="underline hover:no-underline cursor-pointer">{t('campaign.learnMore')}</span>
                    </div>

                    {/* Checkboxes */}
                    <div className="flex flex-col items-start gap-2 mt-2">
                      <Checkbox
                        label={t('campaign.brandTermTargeting')}
                        checked={campaignData.brandTermTargeting}
                        onCheckedChange={(checked) => setCampaignData({...campaignData, brandTermTargeting: !!checked})}
                      />
                      <Checkbox
                        label={t('campaign.complementaryTargeting')}
                        checked={campaignData.complementaryTargeting}
                        onCheckedChange={(checked) => setCampaignData({...campaignData, complementaryTargeting: !!checked})}
                      />
                    </div>
                  </div>

                  {/* End Date */}
                  <DateField
                    label={t('campaign.endDate')}
                    value={campaignData.endDate}
                    onChange={(e) => setCampaignData({...campaignData, endDate: e.target.value})}
                    showCalendarIcon
                  />

                  {/* Bidding Strategy */}
                  <div className="flex flex-col items-start gap-2 self-stretch">
                    <div className="flex pb-1 items-center gap-1 self-stretch">
                      <div className="flex-1 [color:var(--ld-semantic-color-text)] text-xs font-bold leading-4">
                        {t('campaign.biddingStrategy')}
                      </div>
                    </div>
                    <div className="text-[#000] text-xs leading-4">
                      {t('campaign.biddingStrategyDesc')} <span className="underline hover:no-underline cursor-pointer">{t('campaign.learnMore')}</span>
                    </div>

                    {/* Info Alert */}
                    <div className="flex px-3 py-2 items-start gap-2 self-stretch rounded border border-[#0053E2] bg-[#E9F1FE] relative justify-start">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0053E2] rounded-l"></div>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                        <circle cx="8" cy="8" r="7" stroke="#0053E2" strokeWidth="1.5"/>
                        <path d="M8 4V9" stroke="#0053E2" strokeWidth="1.5" strokeLinecap="round"/>
                        <circle cx="8" cy="11.5" r="0.75" fill="#0053E2"/>
                      </svg>
                      <div className="flex-1 text-[#002E99] text-sm leading-5">
                        {t('campaign.biddingInfo')}
                      </div>
                    </div>

                    {/* Radio Buttons */}
                    <div className="flex flex-col items-start gap-2 mt-2">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <div className="relative w-6 h-6">
                          <div
                            className="w-6 h-6 rounded-full border-2 transition-colors"
                            style={{
                              borderColor: '#2E2F32',
                              backgroundColor: campaignData.biddingStrategy === 'dynamic' ? '#2E2F32' : 'white'
                            }}
                          ></div>
                          {campaignData.biddingStrategy === 'dynamic' && (
                            <div className="absolute top-2 left-2 w-2 h-2 rounded-full [background:var(--ld-semantic-color-fill-surface-primary)]"></div>
                          )}
                        </div>
                        <input
                          type="radio"
                          name="biddingStrategy"
                          value="dynamic"
                          checked={campaignData.biddingStrategy === 'dynamic'}
                          onChange={(e) => setCampaignData({...campaignData, biddingStrategy: 'dynamic'})}
                          className="sr-only"
                        />
                        <span className="[color:var(--ld-semantic-color-text)] text-sm font-bold leading-5">{t('campaign.dynamicBidding')}</span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <div className="relative w-6 h-6">
                          <div
                            className="w-6 h-6 rounded-full border-2 transition-colors"
                            style={{
                              borderColor: '#2E2F32',
                              backgroundColor: campaignData.biddingStrategy === 'fixed' ? '#2E2F32' : 'white'
                            }}
                          ></div>
                          {campaignData.biddingStrategy === 'fixed' && (
                            <div className="absolute top-2 left-2 w-2 h-2 rounded-full [background:var(--ld-semantic-color-fill-surface-primary)]"></div>
                          )}
                        </div>
                        <input
                          type="radio"
                          name="biddingStrategy"
                          value="fixed"
                          checked={campaignData.biddingStrategy === 'fixed'}
                          onChange={(e) => setCampaignData({...campaignData, biddingStrategy: 'fixed'})}
                          className="sr-only"
                        />
                        <span className="[color:var(--ld-semantic-color-text)] text-sm leading-5">{t('campaign.fixedBidding')}</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sticky Footer Section */}
          <div className="flex flex-col items-start self-stretch [background:var(--ld-semantic-color-fill-surface-primary)]">
            <div className="flex h-6 px-4 justify-center items-center gap-2.5 self-stretch">
              <div className="flex-1 [color:var(--ld-semantic-color-text-subtle)] text-center text-xs leading-4">
                {t('campaign.saveReviewHint')}
              </div>
            </div>
            <div className="flex px-4 py-4 flex-col justify-center items-end gap-3 self-stretch border-t [border-color:var(--ld-semantic-color-separator)] [background:var(--ld-semantic-color-fill-surface-primary)]">
              <div className="flex items-center gap-4">
                <Button
                  onClick={handleSaveAndReview}
                  variant="secondary"
                  UNSAFE_className="text-base"
                >
                  {t('campaign.saveAndReview')}
                </Button>
                <Button
                  onClick={handleLaunchCampaign}
                  variant="primary"
                  UNSAFE_className="text-base"
                >
                  {t('campaign.launchCampaign')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {viewState === 'campaignReady' && (
        <div className="flex w-full h-[692px] flex-col items-start flex-shrink-0 overflow-y-auto">
          <div className="flex pb-80 flex-col items-center flex-1 self-stretch overflow-y-auto">
            <div className="flex w-full flex-col items-center gap-4">
              {/* System Message */}
              <div className="flex px-4 pt-4 flex-col items-start gap-6 self-stretch [background:var(--ld-semantic-color-fill-surface-primary)]">
                <div className="flex w-full flex-col items-start gap-1 [background:var(--ld-semantic-color-fill-surface-primary)]">
                  <div className="flex flex-col items-start gap-2 self-stretch">
                    <div className="self-stretch [color:var(--ld-semantic-color-text)] text-sm leading-5">
                      {t('campaign.readyMessage')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Prompt Suggestions */}
              <div className="flex w-full flex-col items-start gap-2 [background:var(--ld-semantic-color-fill-surface-primary)] px-4">
                <Button variant="tertiary" UNSAFE_className="max-w-[393px] text-sm">
                  {t('campaign.whatCanMartyDo')}
                </Button>
                <Button variant="tertiary" UNSAFE_className="max-w-[393px] text-sm">
                  {t('campaign.howToSetup')}
                </Button>
                <Button variant="tertiary" UNSAFE_className="max-w-[393px] text-sm">
                  {t('campaign.whichItems')}
                </Button>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="flex flex-col items-start gap-3 self-stretch border-t [border-color:var(--ld-semantic-color-separator)] [background:var(--ld-semantic-color-fill-surface-primary)]">
            <div className="flex px-4 py-4 flex-col items-center gap-3 self-stretch [background:var(--ld-semantic-color-fill-surface-primary)]">
              {/* Input Field */}
              <div className="flex max-h-44 px-4 py-3 items-end justify-start gap-6 self-stretch rounded-[30px] border [border-color:var(--ld-semantic-color-separator)] [background:var(--ld-semantic-color-fill-surface-primary)] transition-colors focus-within:[border-color:var(--ld-semantic-color-action-fill-primary)] focus-within:shadow-[0_0_0_1px_var(--ld-semantic-color-action-fill-primary)]">
                <div className="flex flex-col justify-center flex-1 self-stretch [color:var(--ld-semantic-color-text-subtle)] text-sm leading-5">
                  {t('inputPlaceholder')}
                </div>
                <button disabled className="flex p-2 flex-shrink-0 items-center justify-center rounded-full border border-transparent" style={{ backgroundColor: 'var(--ld-primitive-color-gray-50)' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 3L8 13" stroke="#74767C" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M3 8L8 3L13 8" stroke="#74767C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* Disclaimer */}
              <div className="w-full [color:var(--ld-semantic-color-text-subtle)] text-center text-xs leading-4">
                {t('disclaimer')} <span className="underline hover:no-underline cursor-pointer">{t('disclaimerLink')}</span>.
              </div>
            </div>
          </div>
        </div>
      )}

      {viewState === 'campaignScheduled' && (
        <div className="flex w-full h-[692px] flex-col items-start flex-shrink-0">
          <div className="flex px-4 py-4 flex-col items-start gap-6 flex-1 self-stretch overflow-y-auto">
            {/* User Message */}
            <div className="flex w-full pl-20 flex-col items-end gap-1">
              <div className="flex max-w-[608px] px-4 py-2 flex-col items-start gap-2 rounded-lg [background:var(--ld-semantic-color-background-subtle)]">
                <div className="self-stretch [color:var(--ld-semantic-color-text)] text-sm leading-5">
                  {t('campaign.launchCampaign')}
                </div>
              </div>
            </div>

            {/* Campaign Scheduled Success Content */}
            <div className="flex flex-col justify-center items-start gap-3 self-stretch">
              {/* Flag Icon */}
              <svg width="169" height="128" viewBox="0 0 169 132" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M92.6836 37.9863C92.6836 37.9863 111.078 42.4516 122.406 42.1449C135.168 41.7993 152.882 37.9863 152.882 37.9863L141.783 59.9654L161.159 80.073C161.159 80.073 143.445 83.886 130.684 84.2316C119.355 84.5383 100.961 80.073 100.961 80.073L92.6836 37.9863Z" fill="url(#paint0_linear_flag)"/>
                <path d="M29.0664 18.9955C29.0664 18.9955 50.8668 10.6244 65.4895 10.2304C81.9617 9.78659 106.769 18.9955 106.769 18.9955L117.453 73.0471C117.453 73.0471 92.6459 63.8381 76.1736 64.2819C61.5509 64.6759 39.7505 73.0471 39.7505 73.0471L29.0664 18.9955Z" fill="url(#paint1_linear_flag)"/>
                <path d="M88.4052 33.3566C89.6356 32.1228 89.6356 30.1226 88.4052 28.8889C87.1748 27.6551 85.1799 27.6551 83.9495 28.8889L68.3546 44.5258L62.9442 39.1007C61.7138 37.867 59.7189 37.867 58.4885 39.1007C57.2581 40.3345 57.2581 42.3347 58.4885 43.5684L68.3546 53.4612L88.4052 33.3566Z" fill="white"/>
                <path d="M30.6367 11.8164L52.24 128.001" stroke="#909196" strokeWidth="6.80019" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="paint0_linear_flag" x1="93.0641" y1="37.9863" x2="138.461" y2="102.496" gradientUnits="userSpaceOnUse">
                    <stop offset="0.1" stopColor="#993EF4"/>
                    <stop offset="0.7" stopColor="#4DBDF5"/>
                    <stop offset="1" stopColor="#00D0CD"/>
                  </linearGradient>
                  <linearGradient id="paint1_linear_flag" x1="29.5575" y1="10.2148" x2="92.2133" y2="94.8279" gradientUnits="userSpaceOnUse">
                    <stop offset="0.1" stopColor="#993EF4"/>
                    <stop offset="0.7" stopColor="#4DBDF5"/>
                    <stop offset="1" stopColor="#00D0CD"/>
                  </linearGradient>
                </defs>
              </svg>

              {/* Title and Message */}
              <div className="flex items-start self-stretch">
                <div className="flex-1 text-[#000] font-bold text-[32px] leading-10">
                  {t('campaign.scheduled')}
                </div>
              </div>

              <div className="flex min-w-[393px] flex-col items-start gap-1 self-stretch [background:var(--ld-semantic-color-fill-surface-primary)]">
                <div className="flex flex-col items-start gap-2 self-stretch">
                  <div className="self-stretch [color:var(--ld-semantic-color-text)] text-sm leading-5">
                    {t('campaign.scheduledMessage', { name: campaignData.campaignName, date: campaignData.startDate })}
                  </div>
                </div>
              </div>
            </div>

            {/* View Campaign Button */}
            <div className="flex w-full flex-col items-start gap-2 [background:var(--ld-semantic-color-fill-surface-primary)]">
              <Button
                onClick={() => navigate('/all-campaigns')}
                variant="tertiary"
                UNSAFE_className="max-w-[318px] text-sm"
              >
                {t('campaign.viewCampaign')}
              </Button>
            </div>
          </div>

          {/* Footer Section */}
          <div className="flex flex-col items-start gap-3 self-stretch">
            <div className="flex flex-col items-start gap-3 self-stretch border-t [border-color:var(--ld-semantic-color-separator)] [background:var(--ld-semantic-color-fill-surface-primary)]">
              <div className="flex px-4 py-4 flex-col items-center gap-3 self-stretch [background:var(--ld-semantic-color-fill-surface-primary)]">
              {/* Input Field */}
              <div className="flex max-h-44 px-4 py-3 items-end justify-start gap-6 self-stretch rounded-[30px] border [border-color:var(--ld-semantic-color-separator)] [background:var(--ld-semantic-color-fill-surface-primary)] transition-colors focus-within:[border-color:var(--ld-semantic-color-action-fill-primary)] focus-within:shadow-[0_0_0_1px_var(--ld-semantic-color-action-fill-primary)]">
                <div className="flex flex-col justify-center flex-1 self-stretch [color:var(--ld-semantic-color-text-subtle)] text-sm leading-5">
                  {t('inputPlaceholder')}
                </div>
                <button className="flex p-2 flex-shrink-0 items-center justify-center rounded-full border border-transparent" style={{ backgroundColor: 'var(--ld-primitive-color-gray-50)' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 3L8 13" stroke="#74767C" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M3 8L8 3L13 8" stroke="#74767C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* Disclaimer */}
              <div className="w-full [color:var(--ld-semantic-color-text-subtle)] text-center text-xs leading-4">
                {t('disclaimer')} <span className="underline hover:no-underline cursor-pointer">{t('disclaimerLink')}</span>.
              </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer - Input for welcome and chat views */}
      {(viewState === 'welcome' || viewState === 'chat') && (
        <div className="flex w-full px-4 py-4 flex-col items-center gap-3 [background:var(--ld-semantic-color-fill-surface-primary)] border-t [border-color:var(--ld-semantic-color-separator)]">
          {/* Suggestion chips above input — welcome only */}
          {viewState === 'welcome' && showChips && (
            <div
              className="self-stretch overflow-x-auto"
              style={{
                transition: 'opacity 200ms ease, transform 200ms ease',
                opacity: showChips ? 1 : 0,
              }}
            >
              <MartySkills
                onSkillClick={(skill) => {
                  setShowChips(false);
                  handleSkillClick(skill);
                }}
                categoryFilter={['campaigns']}
                compact
              />
            </div>
          )}
          {/* Input Field */}
          <div className={`flex px-4 py-3 justify-start gap-2 self-stretch rounded-[30px] border [border-color:var(--ld-semantic-color-separator)] [background:var(--ld-semantic-color-fill-surface-primary)] transition-colors focus-within:[border-color:var(--ld-semantic-color-action-fill-primary)] focus-within:shadow-[0_0_0_1px_var(--ld-semantic-color-action-fill-primary)] ${selectedElements.length > 0 ? 'flex-col items-stretch' : 'items-end max-h-44'}`}>
            {/* Selected element chips */}
            {selectedElements.length > 0 && (
              <div className="flex flex-wrap gap-1 pb-1">
                {selectedElements.map(el => (
                  <Tag key={el.id} variant="tertiary" color="info">
                    {el.label}
                    <button
                      onClick={() => removeSelectedElement(el.id)}
                      className="ml-1 flex-shrink-0 inline-flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
                      aria-label={`Remove ${el.label}`}
                    >
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L7 7M7 1L1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </Tag>
                ))}
              </div>
            )}
            {/* Bottom row: selector button + textarea + send */}
            <div className="flex w-full items-end gap-2">
              {/* Element selector button with count badge */}
              <div className="relative flex-shrink-0">
                <button
                  onClick={() => setIsElementSelecting(!isElementSelecting)}
                  className={`flex w-8 h-8 items-center justify-center rounded-full transition-colors ${
                    isElementSelecting
                      ? '[background:var(--ld-semantic-color-action-fill-primary)] [color:var(--ld-semantic-color-text-inverse)]'
                      : 'hover:[background:var(--ld-primitive-color-gray-10)] [color:var(--ld-semantic-color-text-subtle)]'
                  }`}
                  aria-label="Select element on page"
                  title="Click to select an element on the page"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="8" cy="8" r="2" fill="currentColor"/>
                    <path d="M8 0.5V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M8 13V15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M0.5 8H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M13 8H15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
                {selectedElements.length > 0 && (
                  <Badge
                    variant="info"
                    size="small"
                    value={selectedElements.length}
                    aria-label={`${selectedElements.length} elements selected`}
                    className="absolute -top-1 -right-1 pointer-events-none"
                  />
                )}
              </div>
              <textarea
                ref={textareaRef}
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={selectedElements.length > 0 ? 'Ask a question about selected items…' : inputPlaceholder}
                rows={1}
                className="flex-1 [color:var(--ld-semantic-color-text)] text-sm leading-5 outline-none bg-transparent placeholder:[color:var(--ld-semantic-color-text-subtle)] resize-none overflow-y-auto max-h-[152px] py-0.5 self-stretch my-auto"
                disabled={isTyping}
                style={{ minHeight: '20px', height: 'auto' }}
              />
              <IconButton
                aria-label={isTyping ? 'Stop generation' : 'Send message'}
                variant="primary"
                shape="rounded"
                size="medium"
                onClick={isTyping ? handleStopGeneration : handleSendMessage}
                disabled={!isTyping && !userMessage.trim() && selectedElements.length === 0 && inputPlaceholder !== 'Show me recommendations'}
              >
                {isTyping ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="12" height="12" rx="2" fill="currentColor"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 3L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M3 8L8 3L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </IconButton>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="w-full [color:var(--ld-semantic-color-text-subtle)] text-center text-xs leading-4">
            This smart assistant is powered by AI. It may make mistakes or use data from outside Walmart. Never share personally sensitive info. View <span className="underline hover:no-underline cursor-pointer">Disclaimer</span>.
          </div>
        </div>
      )}
      </div>
    </div>
      {quickPromptsPortal}
    </>
  );
}
