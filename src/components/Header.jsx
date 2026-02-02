import React from 'react';

const Header = () => {
  return (
    <header className="text-center mb-16">
      <div className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-extrabold uppercase tracking-widest mb-6 border border-indigo-100 shadow-sm">
        Next-Gen Finance
      </div>
      <h1 className="text-5xl font-extrabold tracking-tighter mb-4 text-slate-900">
        Fin<span className="text-indigo-600">Guard</span> <span className="text-slate-400 font-light">PRO</span>
      </h1>
      <p className="text-lg text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
        Experience high-fidelity expense tracking with real-time semantic analytics.
      </p>
    </header>
  );
};

export default Header;
