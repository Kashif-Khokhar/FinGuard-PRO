import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StatsOverview from './components/StatsOverview';
import TransactionForm from './components/TransactionForm';
import ExpenseChart from './components/ExpenseChart';
import TransactionList from './components/TransactionList';
import Background from './components/Background';

const CATEGORY_COLORS = {
  'Food': '#6366f1',      // Indigo
  'Transport': '#8b5cf6', // Violet
  'Bills': '#f43f5e',     // Rose
  'Shopping': '#ec4899',  // Pink
  'Groceries': '#10b981', // Emerald
  'Health': '#06b6d4',    // Cyan
  'Education': '#f59e0b', // Amber
  'Entertainment': '#3b82f6', // Blue
  'Travel': '#14b8a6',    // Teal
  'Personal': '#a855f7',  // Purple
  'Misc': '#64748b'       // Slate
};

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('finguard_data');
    return saved ? JSON.parse(saved) : [];
  });
  const [editIndex, setEditIndex] = useState(-1);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    localStorage.setItem('finguard_data', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (data) => {
    if (editIndex > -1) {
      const newTransactions = [...transactions];
      newTransactions[editIndex] = { ...data, id: transactions[editIndex].id, date: transactions[editIndex].date };
      setTransactions(newTransactions);
      setEditIndex(-1);
      setEditData(null);
    } else {
      setTransactions([{ ...data, id: Date.now(), date: new Date().toLocaleDateString() }, ...transactions]);
    }
  };

  const deleteTransaction = (index) => {
    if (window.confirm("Are you sure you want to remove this data point?")) {
      const newTransactions = transactions.filter((_, i) => i !== index);
      setTransactions(newTransactions);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditData(transactions[index]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditIndex(-1);
    setEditData(null);
  };

  return (
    <div className="min-h-screen text-slate-800 overflow-x-hidden relative">
      <Background />
      
      <div className="max-w-6xl mx-auto px-4 py-12 relative">
        <Header />
        
        <StatsOverview transactions={transactions} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <TransactionForm 
              onAdd={addTransaction} 
              editData={editData} 
              isEditing={editIndex > -1}
              onCancel={cancelEdit}
            />
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 p-10 rounded-[2.5rem] shadow-sm">
              <h2 className="text-2xl font-extrabold mb-10 text-center">Portfolio Concentration</h2>
              <div className="w-full max-w-md mx-auto">
                <ExpenseChart transactions={transactions} categoryColors={CATEGORY_COLORS} />
              </div>
            </div>

            <TransactionList 
              transactions={transactions} 
              onDelete={deleteTransaction} 
              onEdit={handleEdit}
              categoryColors={CATEGORY_COLORS}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
