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
  console.log(req.body.prompt);

  try {
    const response = await openai.createCompletion({
      model: OPENAI_MODEL,
      prompt:
        "You: How do I combine arrays?\nJavaScript chatbot: You can use the concat() method.\nYou: How do you make an alert appear after 10 seconds?\nJavaScript chatbot",
      temperature: 0,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.5,
      presence_penalty: 0.0,
      stop: ["You:"],
    });

    if (response.data?.choices?.length > 0) {
      res.status(200).json({ data: response.data?.choices[0] });
    } else {
      res.status(500).json({ data: "No response from OpenAI" });
    }
  } catch (error) {
    res.status(500).json({ data: error });
    // console.error('error', error);
  }
}
