
import React, { useState, useCallback } from 'react';
import { transcribeAudio } from './services/geminiService';
import Header from './components/Header';
import AudioUploader from './components/AudioUploader';
import LanguageSelector from './components/LanguageSelector';
import TranscriptionDisplay from './components/TranscriptionDisplay';
import Loader from './components/Loader';
import { LANGUAGES } from './constants';
import type { LanguageOption } from './types';

const App: React.FC = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [targetLanguage, setTargetLanguage] = useState<LanguageOption>(LANGUAGES[0]);
  const [transcription, setTranscription] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleFileChange = (file: File | null) => {
    setAudioFile(file);
    setTranscription('');
    setError('');
  };

  const handleLanguageChange = (language: LanguageOption) => {
    setTargetLanguage(language);
  };

  const handleTranscribe = useCallback(async () => {
    if (!audioFile) {
      setError('Please upload an audio file first.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setTranscription('');

    try {
      const result = await transcribeAudio(audioFile, targetLanguage.value);
      setTranscription(result);
    } catch (err) {
      console.error(err);
      setError('Failed to transcribe audio. Please check the console for details.');
    } finally {
      setIsLoading(false);
    }
  }, [audioFile, targetLanguage]);

  return (
    <div className="min-h-screen bg-base-200 text-content-100 flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-4xl">
        <Header />
        <main className="mt-8 bg-base-100 rounded-2xl shadow-2xl p-6 md:p-10 transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <AudioUploader file={audioFile} onFileChange={handleFileChange} disabled={isLoading} />
            <LanguageSelector
              selectedLanguage={targetLanguage}
              onLanguageChange={handleLanguageChange}
              languages={LANGUAGES}
              disabled={isLoading}
            />
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handleTranscribe}
              disabled={!audioFile || isLoading}
              className="px-8 py-3 bg-brand-primary hover:bg-brand-dark text-white font-bold rounded-full transition-all duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-brand-light disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none transform hover:scale-105 disabled:transform-none"
            >
              {isLoading ? 'Transcribing...' : 'Transcribe Audio'}
            </button>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
              {error}
            </div>
          )}

          {isLoading && <Loader />}
          
          {transcription && !isLoading && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4 text-center text-brand-dark">Transcription Result</h2>
              <TranscriptionDisplay text={transcription} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
