import { GoogleGenAI, Type } from "@google/genai";
import { BirthdayWish } from "../types";

// Renamed for clarity
export const generateBirthdayWish = async (): Promise<BirthdayWish> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  // Updated prompt for Subhi
  const prompt = `Generate a creative, elegant, and witty birthday wish for a friend named Subhi. 
  The tone should be 'best friend energy' - funny, sophisticated, and slightly roasting.
  
  CRITICAL INSTRUCTIONS:
  1. Include advice in Hinglish like "thoda drama kam kiya kar" (reduce the drama a bit) or "dimag ka dahi mat kiya kar" (don't stress me out).
  2. Compliment her style but roast her chaos ("You look like a Queen but act like a cartoon").
  3. Keep it sophisticated yet girlish (use blue/pink aesthetic vibes in words).
  4. Mention her as the 'Queen of Chaos'.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash', // Updated to latest model if available, or keep existing
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: 'A catchy headline mentioning Chaos Queen' },
            message: { type: Type.STRING, description: 'The main birthday message with the specific advice' },
            wittyRemark: { type: Type.STRING, description: 'A funny closing about Subhi' }
          },
          required: ['title', 'message', 'wittyRemark']
        }
      }
    });

    const result = JSON.parse(response.text()); // Ensure .text() is called if using newer SDKs, or .text property
    return result as BirthdayWish;
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Updated Fallback for Subhi
    return {
      title: "To our Chaotic Queen, Subhi!",
      message: "Happy Birthday! Seriously though, thoda drama kam kiya kar. You're aging like fine wine but acting like a toddler. Love you regardless!",
      wittyRemark: "Stay iconic, you absolute Queen! 💅✨"
    };
  }
};