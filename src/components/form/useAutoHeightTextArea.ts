import { useEffect } from "react";

function useAutoHeightTextArea(
  textAreaRef: HTMLTextAreaElement | null,
  value: string
) {
  useEffect(() => {
    if (!textAreaRef) return;

    textAreaRef.style.height = "inherit";
    const { scrollHeight } = textAreaRef;
    textAreaRef.style.height = `${scrollHeight}px`;
  }, [value, textAreaRef]);
}

export default useAutoHeightTextArea;
