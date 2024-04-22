"use client";

import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";

import { useState } from "react";

export default function SwitchForm(props: {
  handler: (e: React.ChangeEvent<HTMLFormElement>) => void;
  isPublic: boolean;
}) {
  const onChangeHander = (e) => {
    const checked = e.target.checked;
    setShowCopy(checked);
    props.handler(checked);
  };

  const [showCopy, setShowCopy] = useState(props.isPublic);

  return (
    <div>
      <form onChange={onChangeHander}>
        <div className="mt-3 flex items-center space-x-2">
          <Switch id="switch" defaultChecked={props.isPublic} />
          <Label htmlFor="switch">Shareable</Label>
        </div>
      </form>

      {showCopy && (
        <div className="flex flex-row items-center space-x-2 p-4">
          <CopySVG />
          <p> Click icon to image link to share with your friends!</p>
        </div>
      )}
    </div>
  );
}

function CopySVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
      />
    </svg>
  );
}
