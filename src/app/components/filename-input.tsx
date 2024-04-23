import { useState } from "react";

import { Button } from "~/components/ui/button";

export default function FileNameInput(props: {
  id: number;
  fileName: string;
  submitHandler: (fileName: string) => void;
  formHandler: () => void;
}) {
  const [inputValue, setInputValue] = useState(props.fileName);

  const onSubmitHandler = () => {
    props.submitHandler(inputValue);
    props.formHandler();
  };

  return (
    <form onSubmit={onSubmitHandler} className="mb-5">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="mb-3 w-full rounded-md border-2 border-gray-300 p-2 text-black"
      />
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onSubmitHandler}>
          Update name
        </Button>
        <Button variant="destructive" onClick={props.formHandler}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
