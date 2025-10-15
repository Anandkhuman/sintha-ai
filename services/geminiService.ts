
import { GoogleGenAI } from "@google/genai";
import { fileToBase64 } from '../utils/fileUtils';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const transcribeAudio = async (audioFile: File, targetLanguage: string): Promise<string> => {
  try {
    const { mimeType, data } = await fileToBase64(audioFile);

    const audioPart = {
      inlineData: {
        mimeType,
        data,
      },
    };

    const textPart = {
      text: `Transcribe the audio. The audio's language is auto-detected. Translate the final transcription to ${targetLanguage}.`,
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [audioPart, textPart] },
    });

    return response.text;
  } catch (error) {
    console.error('Error in Gemini API call:', error);
    throw new Error('Failed to communicate with the Gemini API.');
  }
};
