"use client";

import { useState } from "react";

import SwitchForm from "./switch-form";
import CopyURL from "./copy-url";

export default function SwitchCopyBlock(props: {
  changeHandler: (e: React.ChangeEvent<HTMLFormElement>) => void;
  isPublic: boolean;
  imageURL: string;
}) {
  const [showCopy, setShowCopy] = useState(props.isPublic);

  const showCopyHandler = (checked: boolean) => {
    setShowCopy(checked);
  };

  return (
    <>
      <SwitchForm
        switchChangeHandler={props.changeHandler}
        isPublic={props.isPublic}
        showCopyHandler={showCopyHandler}
      />
      {showCopy && <CopyURL imageId={props.imageURL} />}
    </>
  );
}
