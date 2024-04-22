"use client";

import { useState } from "react";

import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";

export default function SwitchForm(props: {
  switchChangeHandler: (e: React.ChangeEvent<HTMLFormElement>) => void;
  isPublic: boolean;
  showCopyHandler: (checked: boolean) => void;
}) {
  const onChangeHander = (e) => {
    const checked = e.target.checked;
    setIsShared(checked);
    props.showCopyHandler(checked);
    props.switchChangeHandler(checked);
  };

  const [isShared, setIsShared] = useState(props.isPublic);

  return (
    <form onChange={onChangeHander}>
      <div className="mt-3 flex items-center space-x-2">
        <Switch id="switch" defaultChecked={props.isPublic} />
        <Label htmlFor="switch">
          <span>{isShared ? "Shareable" : "Click to share"}</span>
        </Label>
      </div>
    </form>
  );
}
