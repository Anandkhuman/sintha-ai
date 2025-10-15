
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-dark tracking-tight">
        AI Audio Converter
      </h1>
      <p className="mt-3 text-lg sm:text-xl text-content-200 max-w-2xl mx-auto">
        Upload any audio file, and our AI will detect the language and transcribe it into your chosen language.
      </p>
    </header>
  );
};

export default Header;
