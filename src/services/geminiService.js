export const generateItinerary = async (destination, days, interests) => {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'generateItinerary',
        destination,
        days,
        interests,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to fetch from Gemini API');
    }

    const data = await response.json();
    let text = data.text.trim();
    
    // Safely extract JSON array if surrounded by markdown or other text
    const jsonStart = text.indexOf('[');
    const jsonEnd = text.lastIndexOf(']');
    if (jsonStart !== -1 && jsonEnd !== -1) {
      text = text.substring(jsonStart, jsonEnd + 1);
    }
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Itinerary generation error:", error);
    throw error;
  }
};

export const chatWithAssistant = async (message, history = []) => {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'chatWithAssistant',
        message,
        history,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to fetch from Gemini API');
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Chat error:", error);
    throw error;
  }
};
