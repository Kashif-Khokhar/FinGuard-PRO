import React from 'react';

const Background = () => {
  return (
    <>
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/40 rounded-full blur-[120px] animate-pulse -z-10"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-100/50 rounded-full blur-[120px] animate-pulse -z-10" style={{ animationDelay: '2s' }}></div>
      <div className="fixed top-[20%] right-[10%] w-[20%] h-[20%] bg-teal-50/60 rounded-full blur-[100px] -z-10"></div>
    </>
  );
};

export default Background;
