import React, { useMemo } from 'react';
import { Calendar, TrendingDown } from 'lucide-react';

const TransactionItem = ({ transaction, onDelete, onEdit, categoryColors }) => {
  return (
    <li className="t-item bg-white/40 p-5 rounded-2xl border border-white/60 flex items-center justify-between group hover:bg-white/80 transition-all">
      <div className="flex items-center gap-4">
        <div 
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold transition-transform group-hover:scale-110" 
          style={{ background: categoryColors[transaction.category] || '#64748b' }}
        >
          {transaction.category.charAt(0)}
        </div>
        <div>
          <span className="block font-bold text-slate-800">{transaction.desc}</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] font-extrabold uppercase text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md leading-none">{transaction.category}</span>
            <span className="text-[10px] font-bold text-slate-300">{transaction.date}</span>
          </div>
        </div>
      </div>
      <div className="text-right flex items-center gap-6">
        <span className="font-extrabold text-slate-800">PKR {parseFloat(transaction.amount).toLocaleString()}</span>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
          <button 
            onClick={() => onEdit(transaction.id)}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-indigo-600 transition-all"
            title="Edit Entry"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <button 
            onClick={() => onDelete(transaction.id)}
            className="p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-500 transition-all"
            title="Remove Entry"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
};

const TransactionList = ({ transactions, onDelete, onEdit, categoryColors }) => {
  const groupedTransactions = useMemo(() => {
    const groups = {};
    transactions.forEach(t => {
      // Use timestamp if available, fallback to Date parsing (though less reliable)
      const date = t.timestamp ? new Date(t.timestamp) : new Date(t.date);
      const label = !isNaN(date.getTime()) 
        ? date.toLocaleString('default', { month: 'long', year: 'numeric' })
        : 'Legacy Records';
      
      if (!groups[label]) groups[label] = { items: [], total: 0 };
      groups[label].items.push(t);
      groups[label].total += parseFloat(t.amount || 0);
    });
    
    // Convert to array of groups for easier rendering and order by date
    return Object.keys(groups).map(label => ({
      label,
      ...groups[label]
    })).sort((a, b) => {
      if (a.label === 'Legacy Records') return 1;
      if (b.label === 'Legacy Records') return -1;
      return new Date(b.items[0].timestamp || b.items[0].date) - new Date(a.items[0].timestamp || a.items[0].date);
    });
  }, [transactions]);

  if (transactions.length === 0) {
    return (
      <div className="bg-white/60 backdrop-blur-xl border border-white/40 p-20 rounded-[2.5rem] shadow-sm flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
          <TrendingDown className="text-slate-200" size={32} />
        </div>
        <h3 className="text-xl font-bold text-slate-400 mb-2">No Transactions Logged</h3>
        <p className="text-sm text-slate-300 max-w-xs">Your financial matrix is currently empty. Authorize your first transaction to begin tracking.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/40 p-10 rounded-[2.5rem] shadow-sm">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl font-extrabold">Transaction Matrix</h2>
        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-lg text-[10px] font-extrabold uppercase tracking-tight">
          {transactions.length} Verified Entries
        </span>
      </div>

      <div className="space-y-12">
        {groupedTransactions.map((group) => (
          <div key={group.label} className="space-y-6">
            <div className="flex items-center justify-between border-b border-indigo-50 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                  <Calendar size={16} />
                </div>
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-500">
                  {group.label}
                </h3>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-0.5">Monthly Burn</p>
                <p className="text-sm font-black text-indigo-600">PKR {group.total.toLocaleString()}</p>
              </div>
            </div>

            <ul className="space-y-4">
              {group.items.map((t) => (
                <TransactionItem 
                  key={t.id} 
                  transaction={t} 
                  onDelete={onDelete} 
                  onEdit={onEdit}
                  categoryColors={categoryColors}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
