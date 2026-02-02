import React, { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ transactions, categoryColors }) => {
  const chartData = useMemo(() => {
    let totals = {};
    transactions.forEach(t => {
      const cat = t.category || 'Misc';
      if (!totals[cat]) totals[cat] = 0;
      totals[cat] += parseFloat(t.amount || 0);
    });
    
    const labels = Object.keys(totals);
    const dataValues = Object.values(totals);
    const backgroundColors = labels.map(cat => categoryColors[cat] || '#cbd5e1');

    return {
      labels,
      datasets: [{
        data: dataValues,
        backgroundColor: backgroundColors,
        borderWidth: 0,
        hoverOffset: 15,
        borderRadius: 8,
        spacing: 4
      }]
    };
  }, [transactions, categoryColors]);

  const totalSpent = useMemo(() => {
    return transactions.reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
  }, [transactions]);

  const centerTextPlugin = useMemo(() => ({
    id: 'centerText',
    beforeDraw: (chart) => {
      const { ctx, chartArea } = chart;
      if (!chartArea) return;
      const { width, height, top, left } = chartArea;
      
      ctx.save();
      ctx.font = 'bold 1.5rem Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#0f172a';
      
      const text = `PKR ${totalSpent.toLocaleString()}`;
      ctx.fillText(text, left + width / 2, top + height / 2);
      ctx.restore();
    }
  }), [totalSpent]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '82%',
    layout: {
      padding: 10
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleFont: { family: 'Outfit', size: 14, weight: 'bold' },
        bodyFont: { family: 'Outfit', size: 13 },
        padding: 14,
        cornerRadius: 16,
        displayColors: true,
        boxPadding: 6
      }
    },
    animation: {
      duration: 750,
      easing: 'easeOutQuart'
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-slate-300 gap-4">
        <div className="w-32 h-32 rounded-full border-4 border-dashed border-slate-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
        </div>
        <p className="text-sm font-semibold uppercase tracking-widest opacity-40">No Data Detected</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[300px] flex items-center justify-center">
      <Doughnut 
        data={chartData} 
        options={options} 
        plugins={[centerTextPlugin]}
      />
    </div>
  );
};

export default ExpenseChart;
