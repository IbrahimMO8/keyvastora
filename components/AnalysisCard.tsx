
import React from 'react';

interface AnalysisCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const AnalysisCard: React.FC<AnalysisCardProps> = ({ title, icon, children }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-full">
      <div className="flex items-center space-x-2 mb-4">
        <div className="text-indigo-600">{icon}</div>
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default AnalysisCard;
