// 4. To try out cursor on your own projects, go to file menu (top left) and open a folder.
const openai = require("openai");
const api_key = "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";

openai.api_key = api_key;

async function generateText(prompt) {
  const gptResponse = await openai.Completion.create({
    engine: "davinci",
    prompt: prompt,
    max_tokens: 1024,
    n: 1,
    stop: ["\n"],
  });
  const text = gptResponse.choices[0].text.trim();
  return text;
}

(async () => {
  const prompt =
    "Write a function that takes in a string and returns the length of the string.";
  const generatedText = await generateText(prompt);
  console.log(generatedText);
})();
