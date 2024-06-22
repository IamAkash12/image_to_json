const fs = require("fs");
const OpenAI = require("openai");

const OPENAI_API_KEY = "your-api-key-here";
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});
function encodeImage(imagePath) {
  const imageData = fs.readFileSync(imagePath);
  return imageData.toString('base64');
}

async function main() {
  const imagePath = "your-image-path-here";
  const base64Image = encodeImage(imagePath);

  const response = await openai.chat.completions.create({
    model: "gpt-4o", 
    messages: [
      {
        role: "system",
        content: "Please share the detailed information of each row and column in the image in nicely json format in human readable format.",
      },
      {
        role: "user",
        content: [
          { type: "text", text: "Please analyze this image:" },
          { type: "image_url", image_url: { url: `data:image/png;base64,${base64Image}` } },
        ],
      },
    ],
  });

  console.log(response.choices);
}
main();