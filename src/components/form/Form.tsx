import IconSend from "@/assets/send.svg";
import { Conversation } from "@/pages";
import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import useAutoHeightTextArea from "./useAutoHeightTextArea";

type Props = {
  setConversation: (conversation: any) => void;
};

export default function Form({ setConversation }: Props) {
  const [value, setValue] = useState("");
  const [disabled, setDisabled] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutoHeightTextArea(textAreaRef.current, value);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setValue(value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sendPrompt();
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!textAreaRef.current) return;

    const { key } = e;

    if (e.key === "Enter" && e.shiftKey) {
      console.log("aaaa");
      e.preventDefault();
      const start = textAreaRef.current.selectionStart;
      const end = textAreaRef.current.selectionEnd;
      const value = textAreaRef.current.value;
      textAreaRef.current.value =
        value.substring(0, start) + "\n" + value.substring(end);
      textAreaRef.current.selectionStart = textAreaRef.current.selectionEnd =
        start + 1;
      textAreaRef.current;
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    } else if (key === "Enter") {
      e.preventDefault();
      setDisabled(true);
      setValue("...");
      sendPrompt();
      // TODO: loading state and disable send button
    }
  };

  const sendPrompt = useCallback(async () => {
    const prompt = textAreaRef.current?.value;
    if (!prompt) return;
    setConversation((prev: any) => {
      return [
        ...prev,
        {
          type: "ask",
          text: prompt,
          id: Date.now().toString(),
        },
      ];
    });

    // TODO: call api to send prompt
    console.log("sending prompt: ", prompt);
    const response = await request(prompt);
    console.log("🚀 ~ response:", response);
    const { data } = response;
    setValue("");
    setConversation((prev: any) => {
      return [
        ...prev,
        {
          type: "answer",
          text: data.text,
          conversationId: data.conversationId,
          id: data.id,
          parentMessageId: data.parentMessageId,
          role: data.role,
        },
      ];
    });
    setDisabled(false);
  }, [setConversation]);

  const request = async (value: string) => {
    const response = await fetch("/api/chatgpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: value }),
    });
    const data = await response.json();
    return data;
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
        onKeyDown={handleEnter}
        disabled={disabled}
      ></textarea>

      <button disabled={disabled}>
        <IconSend className="text-lg text-white" onClick={handleSubmit} />
      </button>
    </form>
  );
}
