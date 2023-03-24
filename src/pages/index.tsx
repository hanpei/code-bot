import Head from "next/head";
import { useEffect, useState } from "react";
import Form from "@/components/form/Form";

export type Conversation = {
  type: "ask" | "answer";
  text: string;
  conversationId: string;
  id: string;
  parentMessageId: string;
  role: string;
};

export default function Home() {
  const [conversation, setConversation] = useState<Conversation[]>([]);
  return (
    <div className="min-h-screen w-full bg-slate-800">
      <h1 className="p-10 text-center text-3xl font-bold text-white">
        Hello World!
      </h1>
      <div className="flex w-full flex-col items-center">
        {conversation.map((item) => (
          <div
            key={item.id}
            className={`w-full  p-8  text-center text-gray-100 ${
              item.type === "ask" ? "bg-slate-800" : "bg-slate-700"
            }`}
          >
            <div className="mx-auto flex max-w-3xl flex-row text-left align-top">
              <div className="mr-4 flex h-8 w-8 items-center justify-center bg-slate-600 text-center text-sm">
                {item.type === "ask" ? "我" : "AI"}
              </div>
              <div className="mt-1 flex-1">{item.text}</div>
            </div>
          </div>
        ))}
      </div>

      <footer className="fixed bottom-10 w-full text-center">
        <div className="mx-auto w-full max-w-3xl p-4 text-center">
          <Form setConversation={setConversation} />
        </div>
      </footer>
    </div>
  );
}
