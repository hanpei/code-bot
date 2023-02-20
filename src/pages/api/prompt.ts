// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import { OPENAI_MODEL } from "@/constants";

type Data = {
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const response = await openai.createCompletion({
      model: OPENAI_MODEL,
      prompt: req.body.prompt,
      temperature: 0,
      max_tokens: 2000,
      top_p: 1.0,
      frequency_penalty: 0.5,
      presence_penalty: 0.0,
    });

    res.status(200).json({ data: response.data });
  } catch (error) {
    res.status(500).json({ data: error });
    // console.error('error', error);
  }
}
