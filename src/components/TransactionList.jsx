import React from 'react';

const TransactionItem = ({ transaction, index, onDelete, onEdit, categoryColors }) => {
  return (
    <li className="t-item bg-white/40 p-5 rounded-2xl border border-white/60 flex items-center justify-between group hover:bg-white/80 transition-all">
      <div className="flex items-center gap-4">
        <div 
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold" 
          style={{ background: categoryColors[transaction.category] || '#64748b' }}
        >
          {transaction.category.charAt(0)}
        </div>
        <div>
          <span className="block font-bold text-slate-800">{transaction.desc}</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] font-extrabold uppercase text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">{transaction.category}</span>
            <span className="text-[10px] font-bold text-slate-300">{transaction.date}</span>
          </div>
        </div>
      </div>
      <div className="text-right flex items-center gap-6">
        <span className="font-extrabold text-slate-800">PKR {parseFloat(transaction.amount).toLocaleString()}</span>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
          <button 
            onClick={() => onEdit(index)}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-indigo-600 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <button 
            onClick={() => onDelete(index)}
            className="p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-500 transition-all"
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
  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/40 p-10 rounded-[2.5rem] shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-extrabold">Transaction Matrix</h2>
        <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-bold uppercase">
          {transactions.length} Items
        </span>
      </div>
      <ul className="space-y-4">
        {transactions.map((t, index) => (
          <TransactionItem 
            key={t.id || index} 
            transaction={t} 
            index={index}
            onDelete={onDelete} 
            onEdit={onEdit}
            categoryColors={categoryColors}
          />
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
