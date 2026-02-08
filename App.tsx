
import React, { useState } from 'react';
import { SearchParams, SEOAnalysisResponse } from './types';
import { generateKeywordAnalysis } from './geminiService';
import KeywordTable from './components/KeywordTable';
import AnalysisCard from './components/AnalysisCard';

const Logo: React.FC<{ size?: string }> = ({ size = 'h-10 w-10' }) => (
  <div className={`${size} relative flex items-center justify-center shrink-0`}>
    <div className="absolute inset-0 bg-white rounded-full shadow-sm border border-slate-100 overflow-hidden">
      {/* Recreating the globe and magnifying glass aesthetic from the logo */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 rounded-full border border-blue-100 flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-full h-full text-[#175066] opacity-30" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
      </div>
      <div className="absolute bottom-1/4 w-full h-0.5 bg-[#93C450] rotate-[-10deg]"></div>
    </div>
    <svg viewBox="0 0 24 24" className="absolute top-0 right-0 h-3/5 w-3/5 text-[#175066] drop-shadow-sm" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  </div>
);

const App: React.FC = () => {
  const [params, setParams] = useState<SearchParams>({
    topic: '',
    country: 'UAE, Saudi Arabia & Global',
    targetLanguage: 'Arabic',
    businessType: '',
    goal: 'SEO',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SEOAnalysisResponse | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!params.topic) return;

    setLoading(true);
    setError(null);
    try {
      const data = await generateKeywordAnalysis(params);
      setResult(data);
    } catch (err) {
      setError('Key Vastora Data Core encountered an issue. Please refine your query.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f8] text-slate-900 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Logo size="h-10 w-10" />
            <div className="flex items-center space-x-1.5">
              <div className="w-3 h-3 bg-[#F15A24] rounded-sm"></div>
              <div>
                <h1 className="text-2xl font-black text-[#F15A24] tracking-tighter leading-none uppercase">Key Vastora</h1>
                <span className="text-[10px] font-bold text-[#175066] uppercase tracking-widest">By <a 
  href="https://www.imvastora.com/" 
  target="_blank" 
  rel="noopener noreferrer"
  className="text-[10px] font-bold text-[#175066] uppercase tracking-widest"
>
  IM Vastora
</a>
</span>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex items-center space-x-4">
            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">Discover. Optimize. Grow.</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar / Controls */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 sticky top-28">
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-50 pb-2">Analysis Parameters</h2>
              <form onSubmit={handleSearch} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Topic / Seed / URL</label>
                  <input
                    type="text"
                    name="topic"
                    value={params.topic}
                    onChange={handleInputChange}
                    placeholder="Enter keyword or website..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#175066] focus:border-transparent transition-all outline-none text-slate-700 bg-slate-50 font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Target Market</label>
                  <input
                    type="text"
                    name="country"
                    value={params.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#175066] focus:border-transparent transition-all outline-none text-slate-700 bg-slate-50 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Analysis Language</label>
                  <select
                    name="targetLanguage"
                    value={params.targetLanguage}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#175066] focus:border-transparent transition-all outline-none text-slate-700 bg-slate-50 appearance-none font-bold cursor-pointer"
                  >
                    <option value="Arabic">Arabic (العربية)</option>
                    <option value="English">English</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Goal & Intent</label>
                  <select
                    name="goal"
                    value={params.goal}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#175066] focus:border-transparent transition-all outline-none text-slate-700 bg-slate-50 appearance-none font-medium cursor-pointer"
                  >
                    <option value="SEO">Organic Search (SEO)</option>
                    <option value="Ads">Paid Performance (PPC)</option>
                    <option value="Content">Content Strategy</option>
                    <option value="Product research">Market Demand</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 px-6 rounded-xl font-black text-white transition-all transform active:scale-95 shadow-lg ${
                    loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-[#175066] hover:bg-[#0e3b4d] shadow-[#175066]/20'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center space-x-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Initializing...</span>
                    </span>
                  ) : (
                    'Run Intelligence'
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Result Area */}
          <div className="lg:col-span-3">
            {!result && !loading && (
              <div className="flex flex-col items-center justify-center py-40 bg-white rounded-2xl border border-dashed border-slate-300">
                <div className="text-slate-200 mb-6 scale-150">
                  <Logo size="h-16 w-16" />
                </div>
                <h3 className="text-xl font-bold text-slate-400">Key Vastora Intelligence Core</h3>
                <p className="text-slate-400 text-sm mt-2">Discover profitable keyword clusters with SaaS-grade accuracy.</p>
              </div>
            )}

            {loading && (
              <div className="space-y-10">
                <div className="h-48 bg-slate-200 animate-pulse rounded-2xl"></div>
                <div className="h-96 bg-slate-200 animate-pulse rounded-2xl"></div>
              </div>
            )}

            {result && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                {/* Brand Banner Summary */}
                <div className="relative overflow-hidden bg-white border border-slate-100 p-8 rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-8">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#93C450] opacity-5 -mr-16 -mt-16 rounded-full"></div>
                  <div className="bg-[#175066] p-2 rounded-2xl shrink-0">
                    <Logo size="h-12 w-12" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-[#F15A24] mb-2 uppercase">Intelligence Summary</h2>
                    <p className="text-slate-600 leading-relaxed font-medium italic">
                      "{result.summary}"
                    </p>
                  </div>
                </div>

                {/* Unified Dataset Stream */}
                <div className="space-y-10">
                  <div className="flex items-center space-x-2 border-l-4 border-[#F15A24] pl-4 py-1">
                    <h2 className="text-xl font-black text-[#175066] uppercase tracking-tight">
                      {params.targetLanguage.toUpperCase()} PERFORMANCE STREAM
                    </h2>
                  </div>

                  <KeywordTable title="A) Primary Strategic Keywords" data={result.primaryKeywords} />
                  <KeywordTable title="B) Market-Aligned Long-Tail Variations" data={result.longTailKeywords} />
                  <KeywordTable title="C) User Intent & Contextual Questions" data={result.questionKeywords} />
                  <KeywordTable title="D) High-Intent Commercial Targets" data={result.commercialKeywords} />
                </div>

                {/* Analysis & Strategy */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
                  <AnalysisCard 
                    title="Semantic Entities (LSI)" 
                    icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>}
                  >
                    <div className="space-y-2">
                      {result.relatedEntities.map((ent, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 rounded-lg bg-slate-50 border border-slate-100">
                           <div className="flex flex-col">
                             <span className="text-[10px] font-bold text-[#175066] uppercase">{ent.type}</span>
                             <span className={`font-bold text-slate-700 ${params.targetLanguage === 'Arabic' ? 'font-arabic text-right' : ''}`} dir={params.targetLanguage === 'Arabic' ? 'rtl' : 'ltr'}>
                               {ent.term}
                             </span>
                           </div>
                        </div>
                      ))}
                    </div>
                  </AnalysisCard>

                  <AnalysisCard 
                    title="Content Architecture Clusters" 
                    icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
                  >
                    <div className="space-y-4">
                      {result.contentIdeas.map((idea, idx) => (
                        <div key={idx} className="p-4 border-l-4 border-[#93C450] bg-[#93C450]/5 rounded-r-xl">
                          <p className="text-[10px] font-bold text-[#93C450] uppercase mb-1">{idea.cluster}</p>
                          <p className={`text-slate-800 font-bold mb-1 leading-tight ${params.targetLanguage === 'Arabic' ? 'font-arabic text-right' : ''}`} dir={params.targetLanguage === 'Arabic' ? 'rtl' : 'ltr'}>
                            {idea.title}
                          </p>
                        </div>
                      ))}
                    </div>
                  </AnalysisCard>

                  <div className="md:col-span-2">
                    <AnalysisCard 
                      title="Performance Ad Group Architecture" 
                      icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {result.adGroups.map((group, idx) => (
                          <div key={idx} className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col">
                            <h4 className={`text-[#175066] font-black text-sm mb-3 border-b border-slate-200 pb-2 uppercase tracking-tight ${params.targetLanguage === 'Arabic' ? 'font-arabic text-right' : ''}`} dir={params.targetLanguage === 'Arabic' ? 'rtl' : 'ltr'}>
                              {group.groupName}
                            </h4>
                            <div className="flex flex-wrap gap-1.5 mt-auto">
                              {group.keywords.map((kw, i) => (
                                <span key={i} className={`text-[10px] font-bold bg-white border border-slate-200 px-2 py-1 rounded-md text-slate-500 hover:text-[#175066] transition-colors ${params.targetLanguage === 'Arabic' ? 'font-arabic' : ''}`}>
                                  {kw}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </AnalysisCard>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="mt-20 border-t border-slate-200 bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex flex-col items-center">
             <div className="flex items-center space-x-3 mb-4">
                <Logo size="h-10 w-10" />
                <div className="flex items-center space-x-1.5">
                  <div className="w-3 h-3 bg-[#F15A24] rounded-sm"></div>
                  <span className="text-xl font-black text-[#F15A24] uppercase">Key Vastora</span>
                </div>
             </div>
             <p className="text-slate-400 text-sm font-bold uppercase tracking-[0.2em]">Developed by <a 
  href="https://www.imvastora.com/" 
  target="_blank" 
  rel="noopener noreferrer"
  className="text-[10px] font-bold text-[#175066] uppercase tracking-widest"
>
  IM Vastora
</a>
</p>
             <p className="text-slate-300 text-[11px] mt-6">Discover. Optimize. Grow. | © 2024 Key Vastora Intelligence Core.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
