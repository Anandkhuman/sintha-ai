
import React from 'react';
import type { LanguageOption } from '../types';

interface LanguageSelectorProps {
  selectedLanguage: LanguageOption;
  onLanguageChange: (language: LanguageOption) => void;
  languages: LanguageOption[];
  disabled: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onLanguageChange, languages, disabled }) => {

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const language = languages.find(lang => lang.value === selectedValue);
    if (language) {
      onLanguageChange(language);
    }
  };

  return (
    <div className="w-full">
      <label htmlFor="language-select" className="block text-sm font-medium text-content-200 mb-2">
        Target Language
      </label>
      <select
        id="language-select"
        value={selectedLanguage.value}
        onChange={handleChange}
        disabled={disabled}
        className="block w-full h-12 px-3 py-2 bg-base-100 border border-base-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm disabled:bg-gray-200"
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
       <p className="mt-2 text-xs text-content-200">
        The AI will auto-detect the source language and translate to this selection.
      </p>
    </div>
  );
};

export default LanguageSelector;
