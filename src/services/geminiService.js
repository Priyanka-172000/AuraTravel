import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI = null;
if (GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
}

export const generateItinerary = async (destination, days, interests) => {
  if (!genAI) {
    throw new Error("Gemini API key is missing");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Create a detailed ${days}-day travel itinerary for ${destination}. 
  The user is interested in: ${interests || 'general sightseeing'}.
  Please format the response EXACTLY as a JSON array where each item represents a day.
  Example format:
  [
    {
      "day": 1,
      "morning": "Activity description",
      "afternoon": "Activity description",
      "evening": "Activity description"
    }
  ]
  Return ONLY the JSON array, no markdown formatting (like \`\`\`json) or extra text.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();
    
    // Safely extract JSON array if surrounded by markdown or other text
    const jsonStart = text.indexOf('[');
    const jsonEnd = text.lastIndexOf(']');
    if (jsonStart !== -1 && jsonEnd !== -1) {
      text = text.substring(jsonStart, jsonEnd + 1);
    }
    
    return JSON.parse(text);
  } catch (error) {
    throw error;
  }
};

export const chatWithAssistant = async (message, history = []) => {
  if (!genAI) {
    throw new Error("Gemini API key is missing");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const chat = model.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    throw error;
  }
};
