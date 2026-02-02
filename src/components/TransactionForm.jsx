import React, { useState, useEffect } from 'react';

const TransactionForm = ({ onAdd, editData, isEditing, onCancel }) => {
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');

  useEffect(() => {
    if (editData) {
      setDesc(editData.desc);
      setAmount(editData.amount);
      setCategory(editData.category);
    } else {
      setDesc('');
      setAmount('');
      setCategory('Food');
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!desc || !amount) return alert("Please fill all fields");
    onAdd({ desc, amount, category });
    setDesc('');
    setAmount('');
    setCategory('Food');
  };

  return (
    <div className={`bg-white/70 backdrop-blur-2xl border border-white/50 p-10 rounded-[2.5rem] shadow-xl sticky top-8 ${isEditing ? 'edit-mode' : ''}`}>
      <h2 className="text-2xl font-extrabold mb-8 flex items-center gap-3">
        <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm ${isEditing ? 'bg-emerald-600' : 'bg-indigo-600'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d={isEditing ? "M5 13l4 4L19 7" : "M12 4v16m8-8H4"} />
          </svg>
        </span>
        {isEditing ? 'Update Entry' : 'New Transaction'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">Description</label>
          <input 
            type="text" 
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="What's this for?" 
            className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300 font-medium"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">Volume (PKR)</label>
          <input 
            type="number" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00" 
            className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300 font-bold"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">Sector</label>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all font-semibold text-slate-700 appearance-none"
          >
            <option value="Food">Food & Dining</option>
            <option value="Transport">Transport</option>
            <option value="Bills">Utilities & Bills</option>
            <option value="Shopping">Shopping</option>
            <option value="Groceries">Groceries</option>
            <option value="Health">Health & Medical</option>
            <option value="Education">Education</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Travel">Travel</option>
            <option value="Personal">Personal Care</option>
            <option value="Misc">Miscellaneous</option>
          </select>
        </div>
        <div className="flex flex-col gap-3">
          <button 
            type="submit"
            className={`w-full py-5 text-white font-extrabold rounded-2xl shadow-lg transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-3 ${isEditing ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'}`}
          >
            {isEditing ? 'Authorize Update' : 'Authorize Transaction'}
          </button>
          {isEditing && (
            <button 
              type="button"
              onClick={onCancel}
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl transition-all"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
