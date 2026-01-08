
import { GoogleGenAI, Type } from "@google/genai";
import { BirthdayWish } from "../types";

export const generatePalakWish = async (): Promise<BirthdayWish> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `Generate a creative, elegant, and witty birthday wish for a friend named Palak. 
  Her nicknames are 'Kalii' and 'Dayan'. 
  The tone should be 'best friend energy' - funny, sophisticated, and slightly roasting.
  
  CRITICAL INSTRUCTIONS:
  1. Include advice in Hinglish like "thoda gussa kam kiya kar" (reduce your anger a bit) and "dusro ka gussa khud pe mat utara kar" (don't take others' frustration out on yourself).
  2. Mention that her nicknames 'Kalii Dayan' are actually amazing ("namm to mast rakha hai").
  3. Keep it sophisticated yet girlish (use blue aesthetic vibes in words).
  4. Mention her as the 'Chaotic and Anger Queen'.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: 'A catchy headline mentioning Anger Queen' },
            message: { type: Type.STRING, description: 'The main birthday message with the specific advice' },
            wittyRemark: { type: Type.STRING, description: 'A funny closing about Kalii Dayan' }
          },
          required: ['title', 'message', 'wittyRemark']
        }
      }
    });

    const result = JSON.parse(response.text);
    return result as BirthdayWish;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      title: "To our Chaotic Anger Queen, Palak!",
      message: "Happy Birthday! Seriously though, thoda gussa kam kiya kar aur dusro ka gussa khud pe mat utara kar. Baki, Kalii Dayan wala namm to mast rakha hai, suits your vibe perfectly!",
      wittyRemark: "Stay iconic, you absolute Dayan! 💅✨"
    };
  }
};
