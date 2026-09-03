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
    
    // Attempt to extract JSON array
    let jsonStart = text.indexOf('[');
    let jsonEnd = text.lastIndexOf(']');
    
    // If no array found, try to find an object and see if it contains an itinerary array
    if (jsonStart === -1 || jsonEnd === -1) {
      jsonStart = text.indexOf('{');
      jsonEnd = text.lastIndexOf('}');
    }

    if (jsonStart !== -1 && jsonEnd !== -1) {
      text = text.substring(jsonStart, jsonEnd + 1);
    }
    
    const parsed = JSON.parse(text);
    
    // If the model wrapped it in an object like { "itinerary": [...] }
    if (parsed && !Array.isArray(parsed)) {
      const arrayVals = Object.values(parsed).find(val => Array.isArray(val));
      if (arrayVals) {
        return arrayVals;
      }
      throw new Error("Returned JSON was not an array format as requested.");
    }

    return parsed;
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
