import { ArrowLeft, Calendar } from "@/components/icons";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";

type ViewState = "welcome" | "thinking" | "campaign-form";

export default function MartyAssistant() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [viewState, setViewState] = useState<ViewState>("welcome");
  const [dailyBudget, setDailyBudget] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const handleCreateCampaign = () => {
    setViewState("thinking");
    // Simulate thinking delay
    timerRef.current = setTimeout(() => {
      setViewState("campaign-form");
    }, 1500);
  };

  const handleBackToWelcome = () => {
    setViewState("welcome");
    setDailyBudget("");
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-30 flex w-[145px] h-[58px] p-0.5 justify-end items-center gap-2 rounded-full shadow-[0_-1px_3px_0_rgba(0,0,0,0.10),0_3px_5px_2px_rgba(0,0,0,0.15)] [background:var(--ld-semantic-color-fill-surface-primary)] hover:shadow-[0_-2px_4px_0_rgba(0,0,0,0.15),0_4px_6px_2px_rgba(0,0,0,0.20)] transition-shadow"
      >
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#993EF4] via-[#4DBDF5] to-[#00D0CD] opacity-0 hover:opacity-100 transition-opacity" style={{ padding: '2px' }}>
          <div className="w-full h-full [background:var(--ld-semantic-color-fill-surface-primary)] rounded-full"></div>
        </div>
        
        {/* Content */}
        <div className="relative flex items-center gap-2 flex-1 rounded-full px-1">
          {/* Marty Orb */}
          <div className="flex w-[38px] h-[38px] justify-center items-center rounded-full [background:var(--ld-semantic-color-fill-surface-primary)] flex-shrink-0">
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_marty_fab)">
                <rect width="38" height="38" rx="19" fill="white"/>
                <circle cx="19" cy="19" r="15" fill="url(#gradient_marty_fab)"/>
              </g>
              <defs>
                <linearGradient id="gradient_marty_fab" x1="4" y1="4" x2="34" y2="34" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" style={{ stopColor: 'var(--ld-primitive-color-magic-1, #993EF4)' }}/>
                  <stop offset="50%" style={{ stopColor: 'var(--ld-primitive-color-magic-2, #4DBDF5)' }}/>
                  <stop offset="100%" style={{ stopColor: 'var(--ld-primitive-color-magic-3, #00D0CD)' }}/>
                </linearGradient>
                <clipPath id="clip0_marty_fab">
                  <rect width="38" height="38" rx="19" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </div>
          
          {/* Text */}
          <div className="[color:var(--ld-semantic-color-text)] text-right text-base font-bold leading-6 pr-3">Ask Marty</div>
        </div>
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 right-4 z-30 w-[425px] h-[652px] rounded-t-xl border [border-color:var(--ld-semantic-color-separator)] shadow-[0_-1px_4px_0_rgba(0,0,0,0.10),0_5px_10px_3px_rgba(0,0,0,0.15)] [background:var(--ld-semantic-color-fill-surface-primary)] flex flex-col">
      {/* Navbar */}
      <div className="flex w-full h-[60px] px-4 py-3 justify-between items-center rounded-t-2xl border-b [border-color:var(--ld-semantic-color-separator)] [background:var(--ld-semantic-color-fill-surface-primary)] flex-shrink-0">
        {viewState === "welcome" ? (
          <div className="flex items-center gap-1.5">
            {/* Marty Orb */}
            <div className="flex w-6 h-6 justify-center items-center rounded-full">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_marty_assistant)">
                  <rect width="24" height="24" rx="12" fill="white"/>
                  <circle cx="12" cy="12" r="9.5" fill="url(#gradient_marty_assistant)"/>
                </g>
                <defs>
                  <linearGradient id="gradient_marty_assistant" x1="2.5" y1="2.5" x2="21.5" y2="21.5" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" style={{ stopColor: 'var(--ld-primitive-color-magic-1, #993EF4)' }}/>
                    <stop offset="50%" style={{ stopColor: 'var(--ld-primitive-color-magic-2, #4DBDF5)' }}/>
                    <stop offset="100%" style={{ stopColor: 'var(--ld-primitive-color-magic-3, #00D0CD)' }}/>
                  </linearGradient>
                  <clipPath id="clip0_marty_assistant">
                    <rect width="24" height="24" rx="12" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </div>

            <div className="flex pr-1.5 justify-center items-center">
              <div className="[color:var(--ld-semantic-color-text)] font-bold text-lg leading-6">Marty</div>
            </div>

            {/* Beta Tag */}
            <Tag variant="secondary" color="gray">Beta</Tag>
          </div>
        ) : (
          <div className="flex h-9 items-center gap-3">
            <Button variant="tertiary" onClick={handleBackToWelcome} UNSAFE_className="p-0.5 min-h-0 h-auto">
              <ArrowLeft className="w-6 h-6" strokeWidth={1.5} />
            </Button>
            <div className="flex justify-center items-center gap-2.5">
              <div className="[color:var(--ld-semantic-color-text)] font-bold text-lg leading-6">Create campaign</div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end items-center gap-4">
          {/* Reports Icon with Notification */}
          <Button variant="tertiary" UNSAFE_className="p-0 min-h-0 h-6 w-6">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/1835b749ef39843ef58643bf8eaf007c6cbe63ff?width=24"
              alt="Reports"
              className="w-6 h-6"
            />
          </Button>

          {/* Expand Icon */}
          <Button variant="tertiary" UNSAFE_className="p-0 min-h-0 h-6 w-6">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/4b9543883bac0cc8b18c7c87ebc16153e09ba6ae?width=24"
              alt="Expand"
              className="w-6 h-6"
            />
          </Button>

          {/* Minimize Icon */}
          <Button
            onClick={() => setIsOpen(false)}
            variant="tertiary"
            UNSAFE_className="p-0 min-h-0 h-6 w-6"
          >
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/e7b3a2f3ac0042faea6b580042a0890da69e644e?width=24"
              alt="Minimize"
              className="w-6 h-6"
            />
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        {viewState === "welcome" && (
          <div className="flex flex-col items-start gap-6 px-4 pt-4 pb-0 [background:var(--ld-semantic-color-fill-surface-primary)]">
            <div className="flex flex-col items-start gap-4 self-stretch">
              {/* Greeting */}
              <div className="self-stretch text-[32px] font-bold leading-10 bg-clip-text text-transparent bg-gradient-to-r from-[#2E2F32] to-[#2E2F32]">
                <span className="[color:var(--ld-semantic-color-text)]">Hi, Gabriela</span>
              </div>
              
              {/* Description */}
              <div className="self-stretch [color:var(--ld-semantic-color-text)] text-sm leading-5">
                I'm your smart assistant, here to help you launch campaigns, get insights and find answers. What can I help you with today?
              </div>
            </div>

            {/* Prompt Suggestions */}
            <div className="flex w-full flex-col items-start gap-2 [background:var(--ld-semantic-color-fill-surface-primary)]">
              <Button
                onClick={handleCreateCampaign}
                variant="tertiary"
                UNSAFE_className="max-w-[318px] text-sm"
              >
                Create a campaign
              </Button>

              <Button variant="tertiary" UNSAFE_className="max-w-[318px] text-sm">
                Help & FAQs
              </Button>
            </div>
          </div>
        )}

        {viewState === "thinking" && (
          <div className="flex flex-col items-start gap-6 px-4 pt-6 [background:var(--ld-semantic-color-fill-surface-primary)]">
            {/* User Message */}
            <div className="flex w-full px-0 pl-20 flex-col items-end gap-1 [background:var(--ld-semantic-color-fill-surface-primary)]">
              <div className="flex max-w-[608px] flex-col items-start gap-2 rounded-lg">
                <div className="self-stretch [color:var(--ld-semantic-color-text)] text-sm leading-5">Create a campaign</div>
              </div>
            </div>

            {/* Thinking State */}
            <div className="flex w-full h-8 min-w-full px-0 py-1 items-center gap-1.5 flex-shrink-0 [background:var(--ld-semantic-color-fill-surface-primary)]">
              <div className="text-sm leading-5 bg-clip-text text-transparent bg-gradient-to-r from-[#993EF4] via-[#4DBDF5] to-[#00D0CD]">
                Thinking…
              </div>
            </div>
          </div>
        )}

        {viewState === "campaign-form" && (
          <div className="flex flex-col items-center gap-4 px-4 py-4">
            {/* Campaign Type */}
            <div className="flex flex-col items-start gap-1 self-stretch">
              <label className="flex-1 [color:var(--ld-semantic-color-text)] text-xs font-bold leading-4">Campaign type</label>
              <div className="flex h-10 items-center gap-2 self-stretch rounded border [border-color:var(--ld-semantic-color-separator)] px-3">
                <div className="flex-1 [color:var(--ld-semantic-color-text)] text-sm leading-5">Sponsored Products Automatic</div>
              </div>
            </div>

            {/* Campaign Name */}
            <div className="flex flex-col items-start gap-1 self-stretch">
              <label className="flex-1 [color:var(--ld-semantic-color-text)] text-xs font-bold leading-4">Campaign name</label>
              <div className="flex h-10 items-center gap-2 self-stretch rounded border [border-color:var(--ld-semantic-color-separator)] px-3">
                <input 
                  type="text"
                  defaultValue="Free Rein Coffee Campaign Fall 2025"
                  className="flex-1 [color:var(--ld-semantic-color-text)] text-sm leading-5 outline-none bg-transparent"
                />
              </div>
            </div>

            {/* Start Date */}
            <div className="flex flex-col items-start gap-1 self-stretch">
              <label className="self-stretch [color:var(--ld-semantic-color-text)] text-xs font-bold leading-4">Start date (mm/dd/yyyy)</label>
              <div className="flex h-10 items-center gap-3 self-stretch rounded border [border-color:var(--ld-semantic-color-separator)] px-3">
                <div className="flex-1 [color:var(--ld-semantic-color-text)] text-sm leading-5">10/01/2025</div>
                <button className="flex p-2 flex-col items-start rounded-full border border-transparent bg-transparent hover:[background:var(--ld-semantic-color-fill-subtle)] transition-colors">
                  <Calendar className="w-4 h-4 [color:var(--ld-semantic-color-text)]" />
                </button>
              </div>
            </div>

            {/* Daily Budget */}
            <div className="flex flex-col items-start gap-1 self-stretch">
              <label className="flex-1 [color:var(--ld-semantic-color-text)] text-xs font-bold leading-4">Daily budget</label>
              <div className="flex h-10 items-center gap-2 self-stretch rounded border [border-color:var(--ld-semantic-color-separator)] px-3">
                <span className="[color:var(--ld-semantic-color-text-subtle)] text-base font-medium">$</span>
                <input
                  type="text"
                  value={dailyBudget}
                  onChange={(e) => setDailyBudget(e.target.value)}
                  className="flex-1 [color:var(--ld-semantic-color-text)] text-sm leading-5 outline-none bg-transparent"
                  placeholder=""
                />
              </div>
            </div>

            {/* Items Section */}
            <div className="flex flex-col items-start gap-4 self-stretch">
              <div className="flex flex-col justify-center items-start self-stretch">
                <div className="self-stretch [color:var(--ld-semantic-color-text)] text-xs font-bold leading-4">Items</div>
                <div className="self-stretch [color:var(--ld-semantic-color-text-subtle)] text-sm leading-5">Your recommended items</div>
              </div>

              <div className="flex flex-col items-start gap-2.5 self-stretch">
                <div className="flex items-center gap-3 self-stretch">
                  <div className="flex h-[69px] flex-col justify-center items-center gap-2 flex-1 aspect-square rounded-lg border [border-color:var(--ld-semantic-color-separator)]">
                    <img src="https://api.builder.io/api/v1/image/assets/TEMP/b6b4cdf9361b1ac23ec99887ba61e7a25ca3b0ca?width=106" alt="Free Rein Coffee product 1" className="w-[53px] h-[53px] mix-blend-multiply" />
                  </div>
                  <div className="flex h-[69px] flex-col justify-center items-center gap-2 flex-1 aspect-square rounded-lg border [border-color:var(--ld-semantic-color-separator)]">
                    <img src="https://api.builder.io/api/v1/image/assets/TEMP/2a290bc40ba4ec7f8f862e2a3a3faad72e8d3d18?width=106" alt="Free Rein Coffee product 2" className="w-[53px] h-[53px] mix-blend-multiply" />
                  </div>
                  <div className="flex h-[69px] flex-col justify-center items-center gap-2 flex-1 aspect-square rounded-lg border [border-color:var(--ld-semantic-color-separator)]">
                    <img src="https://api.builder.io/api/v1/image/assets/TEMP/4af3fdb6e6f24421ca5071fdbd5ba9c3bcc9bde3?width=106" alt="Free Rein Coffee product 3" className="w-[53px] h-[53px] mix-blend-multiply" />
                  </div>
                  <div className="flex h-[69px] flex-col justify-center items-center gap-2 flex-1 aspect-square rounded-lg border [border-color:var(--ld-semantic-color-separator)]">
                    <img src="https://api.builder.io/api/v1/image/assets/TEMP/58079636d483927c7a6b8c0fd5f2a2c348acd83e?width=106" alt="Free Rein Coffee product 4" className="w-[53px] h-[53px] mix-blend-multiply" />
                  </div>
                  <div className="h-[69px] flex-1 aspect-square rounded-lg border [border-color:var(--ld-semantic-color-separator)] relative">
                    <div className="w-[53px] [color:var(--ld-semantic-color-text-subtle)] text-center text-base font-bold leading-6 absolute left-2 top-2.5">+16</div>
                    <button className="inline-flex h-8 justify-center items-center gap-2 absolute left-1.5 top-7">
                      <div className="text-sm leading-5 underline hover:no-underline cursor-pointer">View/edit</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Settings Accordion */}
            <div className="flex items-center gap-3 self-stretch [background:var(--ld-semantic-color-fill-surface-primary)]">
              <div className="flex flex-col justify-center items-start gap-1 flex-1">
                <div className="flex items-center self-stretch">
                  <div className="[color:var(--ld-semantic-color-text)] text-base font-bold leading-6">Additional settings</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="flex h-6 justify-center items-center gap-2.5 self-stretch">
              <div className="flex-1 [color:var(--ld-semantic-color-text-subtle)] text-center text-xs leading-4">
                Click "Save and review" to view item list and all campaign creation options
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      {viewState === "welcome" && (
        <div className="flex w-full px-4 py-4 flex-col items-center gap-3 [background:var(--ld-semantic-color-fill-surface-primary)] border-t [border-color:var(--ld-semantic-color-separator)] flex-shrink-0">
          {/* Input Container */}
          <div className="flex max-w-[760px] max-h-[176px] items-end gap-6 self-stretch rounded-lg border [border-color:var(--ld-semantic-color-separator)] shadow-[0_-1px_3px_0_rgba(0,0,0,0.10),0_3px_5px_2px_rgba(0,0,0,0.15)] px-3 py-2">
            <div className="flex flex-col justify-center flex-1 self-stretch [color:var(--ld-semantic-color-text-subtle)] text-sm leading-5">
              <span>How can I help?</span>
            </div>
            
            {/* Send Button (disabled state) */}
            <div className="flex p-2 flex-col items-start rounded-full bg-[#E3E4E5]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 12L8 4M8 4L11 7M8 4L5 7" stroke="#C2C3C6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="w-full [color:var(--ld-semantic-color-text-subtle)] text-center text-xs leading-4">
            <span>I'm powered by AI and can make mistakes. Don't share sensitive info. </span>
            <span className="underline cursor-pointer hover:no-underline">Disclaimer</span>
          </div>
        </div>
      )}

      {viewState === "campaign-form" && (
        <div className="flex px-4 py-4 flex-col justify-center items-end gap-3 self-stretch border-t [border-color:var(--ld-semantic-color-separator)] [background:var(--ld-semantic-color-fill-surface-primary)] flex-shrink-0">
          <div className="flex items-center gap-4">
            <Button
              variant="secondary"
              UNSAFE_className="text-base"
            >
              Save and review
            </Button>
            <Button
              disabled={!dailyBudget}
              onClick={() => navigate('/campaign')}
              variant="primary"
              UNSAFE_className="text-base"
            >
              Launch campaign
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
