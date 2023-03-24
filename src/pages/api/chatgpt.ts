// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import { OPENAI_MODEL } from "@/constants";
import { ChatGPTAPI, ChatGPTUnofficialProxyAPI } from "chatgpt";

type Data = {
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const api = new ChatGPTUnofficialProxyAPI({
    model: OPENAI_MODEL,
    accessToken: process.env.OPENAI_ACCESS_TOKEN || "",
  });

  try {
    const response = await api.sendMessage(req.body.prompt);
    console.log(response);
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(500).json({ data: error });
    // console.error('error', error);
  }
}
