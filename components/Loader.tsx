
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center my-8">
      <div className="w-12 h-12 border-4 border-brand-light border-t-brand-primary rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
