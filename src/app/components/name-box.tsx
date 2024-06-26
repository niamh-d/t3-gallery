"use client";

import { useState } from "react";
import FileNameInput from "./filename-input";

export default function NameBox(props: {
  fileName: string;
  id: number;
  isOwner: boolean;
  handler: (newfileName: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);

  let { fileName } = props;

  fileName =
    fileName.length > 30
      ? fileName.slice(0, 15) + "[...]" + fileName.slice(-15)
      : fileName;

  const openFormHandler = () => {
    setIsEditing(true);
  };

  const closeFormHandler = () => {
    setIsEditing(false);
  };

  if (!props.isOwner)
    return (
      <div className="file-name border-b-2 p-2 text-lg font-extralight tracking-wide">
        {fileName}
      </div>
    );

  return (
    <>
      {!isEditing && (
        <div className="file-name border-b-2 p-2 text-lg font-extralight tracking-wide">
          {fileName}
          <div onClick={openFormHandler} className="cursor-pointer">
            <PencilSVG />
          </div>
        </div>
      )}
      {isEditing && (
        <FileNameInput
          formhandler={closeFormHandler}
          fileName={props.fileName}
          id={props.id}
          submitHandler={props.handler}
        />
      )}
    </>
  );
}

const PencilSVG = () => {
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
        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
      />
    </svg>
  );
};
