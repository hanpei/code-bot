import IconSend from "@/assets/send.svg";
import clsx from "clsx";
import { useRef, useState } from "react";
import useAutoHeightTextArea from "./useAutoHeightTextArea";

type Props = {};

export default function Form({}: Props) {
  const [value, setValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutoHeightTextArea(textAreaRef.current, value);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;

    setValue(val);
  };
  return (
    <form className="flex w-full flex-row items-end justify-between rounded-md border-2 border-transparent bg-slate-700/50 p-4 transition-all focus-within:border-yellow-100/20 focus-within:shadow-[0_0_15px_rgba(0,0,0,0.10)] focus-within:shadow-white/20 ">
      <textarea
        className="mr-4 max-h-72 w-full resize-none overflow-y-hidden border-none bg-transparent text-lg text-white outline-none"
        name="prompt"
        rows={1}
        placeholder="coding helper ..."
        value={value}
        ref={textAreaRef}
        onChange={handleChange}
      ></textarea>

      <button>
        <IconSend className="text-lg text-white" />
      </button>
    </form>
  );
}
