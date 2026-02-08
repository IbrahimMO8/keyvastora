
export enum Difficulty {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export enum Intent {
  INFORMATIONAL = 'Informational',
  NAVIGATIONAL = 'Navigational',
  TRANSACTIONAL = 'Transactional',
  COMMERCIAL = 'Commercial'
}

export type Language = 'Arabic' | 'English';

export interface KeywordEntry {
  keyword: string;
  language: Language;
  avgMonthlySearches: number;
  difficulty: Difficulty;
  cpc: number;
  intent: Intent;
}

export interface RelatedEntity {
  term: string;
  type: string;
}

export interface ContentIdea {
  title: string;
  cluster: string;
}

export interface AdGroup {
  groupName: string;
  keywords: string[];
}

export interface SEOAnalysisResponse {
  primaryKeywords: KeywordEntry[];
  longTailKeywords: KeywordEntry[];
  questionKeywords: KeywordEntry[];
  commercialKeywords: KeywordEntry[];
  relatedEntities: RelatedEntity[];
  contentIdeas: ContentIdea[];
  adGroups: AdGroup[];
  summary: string;
}

export interface SearchParams {
  topic: string;
  country: string;
  targetLanguage: 'Arabic' | 'English';
  businessType: string;
  goal: 'SEO' | 'Ads' | 'Content' | 'Product research';
}
