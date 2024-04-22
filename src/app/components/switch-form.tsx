"use client";

import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";

export default function SwitchForm(props: {
  handler: (e: React.ChangeEvent<HTMLFormElement>) => void;
}) {
  const onChangeHander = (e) => {
    const checked = e.target.checked;
    props.handler(checked);
  };

  return (
    <form onChange={onChangeHander}>
      <div className="mt-3 flex items-center space-x-2">
        <Switch id="switch" />
        <Label htmlFor="switch">Shareable</Label>
      </div>
    </form>
  );
}
