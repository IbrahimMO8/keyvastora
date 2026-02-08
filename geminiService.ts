
import { GoogleGenAI, Type } from "@google/genai";
import { SEOAnalysisResponse, SearchParams } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function generateKeywordAnalysis(params: SearchParams): Promise<SEOAnalysisResponse> {
  const model = "gemini-3-flash-preview";

  const prompt = `
    You are the core intelligence engine of "Key Vastora", developed by IM Vastora.
    
    CRITICAL INSTRUCTION: Language Selection Mode.
    The user has explicitly selected: ${params.targetLanguage}.
    
    RULES:
    1. GENERATION: Only generate keywords, titles, and descriptions in the selected language: ${params.targetLanguage}.
    2. ISOLATION: Do NOT generate equivalents, translations, or datasets in any other language.
    3. DATA REALISM: Maintain all SaaS-grade data modeling. Avg Monthly Searches must be realistic estimates (e.g., 720, 1300, 22000). CPC (USD) must be numeric and tied to commercial intent.
    4. INPUT HANDLING: Treat all calculations, expansions, and insights as restricted to the chosen language: ${params.targetLanguage}.
    
    INPUT DATA:
    Topic: ${params.topic}
    Target Market: ${params.country}
    Business Type: ${params.businessType}
    Goal: ${params.goal}

    STABLE DATA LOGIC (PROTECTED):
    - SEO Difficulty: Low, Medium, High.
    - Intent: Informational, Transactional, Commercial, Navigational.
    - SaaS-ready structured output.

    Output MUST be valid JSON.
  `;

  const keywordSchema = {
    type: Type.OBJECT,
    properties: {
      keyword: { type: Type.STRING },
      language: { type: Type.STRING, enum: [params.targetLanguage] },
      avgMonthlySearches: { type: Type.NUMBER },
      difficulty: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
      cpc: { type: Type.NUMBER },
      intent: { type: Type.STRING, enum: ["Informational", "Transactional", "Commercial", "Navigational"] }
    },
    required: ["keyword", "language", "avgMonthlySearches", "difficulty", "cpc", "intent"]
  };

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          primaryKeywords: { type: Type.ARRAY, items: keywordSchema },
          longTailKeywords: { type: Type.ARRAY, items: keywordSchema },
          questionKeywords: { type: Type.ARRAY, items: keywordSchema },
          commercialKeywords: { type: Type.ARRAY, items: keywordSchema },
          relatedEntities: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                term: { type: Type.STRING },
                type: { type: Type.STRING }
              },
              required: ["term", "type"]
            }
          },
          contentIdeas: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                cluster: { type: Type.STRING }
              },
              required: ["title", "cluster"]
            }
          },
          adGroups: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                groupName: { type: Type.STRING },
                keywords: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["groupName", "keywords"]
            }
          },
          summary: { type: Type.STRING }
        },
        required: ["primaryKeywords", "longTailKeywords", "questionKeywords", "commercialKeywords", "relatedEntities", "contentIdeas", "adGroups", "summary"]
      }
    }
  });

  return JSON.parse(response.text);
}
