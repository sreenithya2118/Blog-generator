
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBlogPost = async (title: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Write a comprehensive and engaging blog post about "${title}". The post should be well-structured with an introduction, several main points, and a conclusion. Format the output in HTML, using tags like <h2> for headings, <p> for paragraphs, <ul> and <li> for lists, and <strong> for bold text. Do not include <html>, <head>, or <body> tags.`,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating blog post:", error);
    return "<p>Failed to generate content. Please try again.</p>";
  }
};
