import Head from "next/head";
import { useEffect } from "react";
import Form from "@/components/form/Form";

export default function Home() {
  async function getData(value: string) {
    const response = await fetch("/api/prompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: value }),
    });
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    // getData("hello there");
  });

  return (
    <div className="min-h-screen w-full bg-slate-900">
      <div className="flex w-full flex-col items-center p-10">
        <main className="w-full max-w-3xl p-4 text-center">
          <h1 className="text-3xl font-bold text-white">Hello World!</h1>
        </main>
        <footer className="fixed bottom-10 w-full max-w-3xl">
          <Form />
        </footer>
      </div>
    </div>
  );
}
