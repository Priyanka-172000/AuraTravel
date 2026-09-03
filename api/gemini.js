import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server.' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const { action, destination, days, interests, message, history } = req.body;

    if (action === 'generateItinerary') {
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

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt
      });

      return res.status(200).json({ text: response.text });
    } 
    else if (action === 'chatWithAssistant') {
      const contents = (history || []).map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.parts[0].text }]
      }));
      contents.push({ role: 'user', parts: [{ text: message }] });

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: contents
      });

      return res.status(200).json({ text: response.text });
    } 
    else {
      return res.status(400).json({ error: 'Unknown action' });
    }
  } catch (error) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ error: 'Failed to process request with Gemini.' });
  }
}
