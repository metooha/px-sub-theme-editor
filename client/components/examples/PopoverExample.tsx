import * as React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/Popover";
import { Button } from "@/components/ui/Button";

export function PopoverExample() {
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);

  return (
    <div style={{ padding: "40px", display: "flex", flexDirection: "column", gap: "40px" }}>
      {/* Basic Popover */}
      <div>
        <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: 700 }}>
          Basic Popover
        </h3>
        <Popover open={open1} onOpenChange={setOpen1}>
          <PopoverTrigger asChild>
            <Button variant="secondary">Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <h4 style={{ fontWeight: 700, fontSize: "14px", margin: 0 }}>
                Information
              </h4>
              <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.43 }}>
                This is a basic popover with text content. It can be dismissed by clicking outside or pressing Escape.
              </p>
              <Button size="small" onClick={() => setOpen1(false)}>
                Got it
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Popover with Arrow */}
      <div>
        <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: 700 }}>
          Popover with Arrow
        </h3>
        <Popover open={open2} onOpenChange={setOpen2}>
          <PopoverTrigger asChild>
            <Button variant="secondary">Open with Arrow</Button>
          </PopoverTrigger>
          <PopoverContent align="start">
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <h4 style={{ fontWeight: 700, fontSize: "14px", margin: 0 }}>
                Helpful Tip
              </h4>
              <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.43 }}>
                The arrow (nubbin) helps visually connect the popover to its trigger element.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Popover with Actions */}
      <div>
        <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: 700 }}>
          Popover with Actions
        </h3>
        <Popover open={open3} onOpenChange={setOpen3}>
          <PopoverTrigger asChild>
            <Button variant="secondary">More Options</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <h4 style={{ fontWeight: 700, fontSize: "14px", margin: 0, marginBottom: "8px" }}>
                  Choose an action
                </h4>
                <p style={{ margin: 0, fontSize: "12px", color: "var(--ld-semantic-color-text-subtle)" }}>
                  Select one of the options below
                </p>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <Button 
                  variant="secondary" 
                  size="small"
                  onClick={() => {
                    setOpen3(false);
                    alert("Cancelled");
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  size="small"
                  onClick={() => {
                    setOpen3(false);
                    alert("Confirmed");
                  }}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Different Alignments */}
      <div>
        <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: 700 }}>
          Alignment Options
        </h3>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="tertiary" size="small">Align Start</Button>
            </PopoverTrigger>
            <PopoverContent align="start">
              <p style={{ margin: 0, fontSize: "14px" }}>
                Aligned to the start
              </p>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="tertiary" size="small">Align Center</Button>
            </PopoverTrigger>
            <PopoverContent align="center">
              <p style={{ margin: 0, fontSize: "14px" }}>
                Aligned to the center
              </p>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="tertiary" size="small">Align End</Button>
            </PopoverTrigger>
            <PopoverContent align="end">
              <p style={{ margin: 0, fontSize: "14px" }}>
                Aligned to the end
              </p>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Popover with Custom Width */}
      <div>
        <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: 700 }}>
          Custom Width
        </h3>
        <Popover open={open4} onOpenChange={setOpen4}>
          <PopoverTrigger asChild>
            <Button variant="secondary">Wide Popover</Button>
          </PopoverTrigger>
          <PopoverContent 
            style={{ minWidth: "320px" }}
           
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <h4 style={{ fontWeight: 700, fontSize: "14px", margin: 0 }}>
                Custom Width Example
              </h4>
              <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.43 }}>
                You can customize the popover width using inline styles or className prop. The default min-width is 200px and max-width is 360px.
              </p>
              <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                <Button 
                  variant="secondary" 
                  size="small"
                  onClick={() => setOpen4(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
