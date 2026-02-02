import React from 'react';

const StatsOverview = ({ transactions }) => {
  const total = transactions.reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
  
  const getCategoryData = () => {
    let totals = {};
    transactions.forEach(t => {
      if (!totals[t.category]) totals[t.category] = 0;
      totals[t.category] += parseFloat(t.amount || 0);
    });
    return totals;
  };

  const catData = getCategoryData();
  const topCat = Object.keys(catData).length > 0 
    ? Object.keys(catData).reduce((a, b) => catData[a] > catData[b] ? a : b) 
    : "None";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div className="bg-white/60 backdrop-blur-xl border border-white/40 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-all duration-300 group">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Gross Expenditure</p>
        <h3 className="text-3xl font-extrabold text-indigo-600">PKR {total.toLocaleString()}</h3>
        <div className="mt-4 h-1 w-12 bg-indigo-200 rounded-full group-hover:w-full transition-all duration-500"></div>
      </div>
      <div className="bg-white/60 backdrop-blur-xl border border-white/40 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-all duration-300 group">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Volume</p>
        <h3 className="text-3xl font-extrabold text-slate-800">{transactions.length} <span className="text-sm font-semibold text-slate-400 ml-1">Entries</span></h3>
        <div className="mt-4 h-1 w-12 bg-slate-200 rounded-full group-hover:w-full transition-all duration-500"></div>
      </div>
      <div className="bg-white/60 backdrop-blur-xl border border-white/40 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-all duration-300 group">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Core Exposure</p>
        <h3 className="text-3xl font-extrabold text-slate-800">{topCat}</h3>
        <div className="mt-4 h-1 w-12 bg-emerald-200 rounded-full group-hover:w-full transition-all duration-500"></div>
      </div>
    </div>
  );
};

export default StatsOverview;
