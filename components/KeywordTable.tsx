
import React from 'react';
import { KeywordEntry } from '../types';

interface KeywordTableProps {
  title: string;
  data: KeywordEntry[];
}

const KeywordTable: React.FC<KeywordTableProps> = ({ title, data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="mb-10 bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 bg-[#175066] text-white">
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-600 uppercase text-[11px] font-bold tracking-widest">
              <th className="px-6 py-4 border-b border-slate-200">Keyword</th>
              <th className="px-6 py-4 border-b border-slate-200 text-right">Avg Monthly Searches</th>
              <th className="px-6 py-4 border-b border-slate-200">SEO Difficulty</th>
              <th className="px-6 py-4 border-b border-slate-200 text-right">CPC (USD)</th>
              <th className="px-6 py-4 border-b border-slate-200">Search Intent</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                <td className={`px-6 py-4 font-semibold text-slate-800 ${item.language === 'Arabic' ? 'font-arabic text-right' : ''}`} dir={item.language === 'Arabic' ? 'rtl' : 'ltr'}>
                  {item.keyword}
                </td>
                <td className="px-6 py-4 text-right font-mono text-slate-600">
                  {item.avgMonthlySearches.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold ${getDifficultyColor(item.difficulty)}`}>
                    {item.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-mono text-emerald-600 font-bold">
                  ${item.cpc.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold ${getIntentColor(item.intent)}`}>
                    {item.intent}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const getDifficultyColor = (diff: string) => {
  const d = diff.toLowerCase();
  if (d.includes('low')) return 'bg-green-50 text-green-700 border border-green-200';
  if (d.includes('medium')) return 'bg-yellow-50 text-yellow-700 border border-yellow-200';
  return 'bg-red-50 text-red-700 border border-red-200';
};

const getIntentColor = (intent: string) => {
  const i = intent.toLowerCase();
  if (i.includes('informational')) return 'bg-blue-50 text-blue-700 border border-blue-200';
  if (i.includes('transactional')) return 'bg-purple-50 text-purple-700 border border-purple-200';
  if (i.includes('commercial')) return 'bg-indigo-50 text-indigo-700 border border-indigo-200';
  return 'bg-slate-50 text-slate-700 border border-slate-200';
};

export default KeywordTable;
