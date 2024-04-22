"use client";

import { useState } from "react";

const BASE_URL = "https://t3-gallery-zeta.vercel.app/img/";

export default function CopyURL(props: { imageId: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="flex cursor-pointer flex-row items-center space-x-2 p-4"
      onClick={() => copyToClipboard(BASE_URL + props.imageId)}
    >
      {isCopied ? <span className="font-semibold">Copied!</span> : <CopySVG />}
      {!isCopied && (
        <p>Click icon to copy a sharable link to your clipboard!</p>
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
