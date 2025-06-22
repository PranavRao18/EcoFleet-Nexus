const Groq = require('groq-sdk');
require('dotenv').config();

const groq = new Groq({
  apiKey: process.env.GROK_API,
});

getEcoScoreGroq()
// getEcoScoreGroq(product) //object of product

async function getEcoScoreGroq() {
  const product_name = "Organic Cotton T-Shirt";
  const description = "Made from 100% plastic";

  const prompt = `Given the following product details:
- Name: ${product_name}
- Description: ${description}

Task: Evaluate the sustainability of this product and assign an EcoScore rating from A+, A, B+, B. 
Pick only one among these 4 score. Dont add any header in response, only JSON format should be there.
Return your result in JSON format:
{"eco_score": "A+", "justification": "Explain why this score was given in less than 100 words."}`;

  try {
    const response = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama3-8b-8192", 
      temperature: 0.4,
      max_tokens: 200,
    });

    const text = response.choices[0].message.content.trim();
    console.log("Groq Response:", text);

    const result = JSON.parse(text);
    console.log("Parsed JSON Result:", result);
    return result;
  } catch (err) {
    console.error("Error:", err.message);
    return {
      eco_score: "B",
      justification: "Unable to determine exact sustainability. Defaulting to B."
    };
  }
}