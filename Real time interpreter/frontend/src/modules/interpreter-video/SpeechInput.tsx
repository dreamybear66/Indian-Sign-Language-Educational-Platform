import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { speechService } from '../../shared/speech';
import { convertToGloss } from '../../shared/textToGloss';
import { apiClient } from '../../app/apiClient';
import { matchSentence, getSupportedSentencesList } from './SentenceMatcher';
import VideoSequence from './VideoSequence';

type InterpreterStatus = 'IDLE' | 'LISTENING' | 'PROCESSING' | 'PLAYING' | 'ERROR';

/**
 * SpeechInput Component - Original Layout with Navigation Bar
 * Blue & White Sci-Fi Theme
 */
const SpeechInput: React.FC = () => {
    const [status, setStatus] = useState<InterpreterStatus>('IDLE');
    const [transcription, setTranscription] = useState('');
    const [gloss, setGloss] = useState('');
    const [matchedWords, setMatchedWords] = useState<string[] | null>(null);
    const [videoUrls, setVideoUrls] = useState<Record<string, string>>({});
    const [error, setError] = useState<string | null>(null);

    const handleSpeechResult = useCallback(async (text: string) => {
        setTranscription(text);
        setStatus('PROCESSING');

        const resultGloss = convertToGloss(text);
        setGloss(resultGloss);

        const words = matchSentence(resultGloss);
        if (words) {
            try {
                // Parallel API calls for better performance
                const signPromises = words.map(word =>
                    apiClient.get<{ videoUrl: string }>(`/signs/${word}`)
                );
                const signMetadataArray = await Promise.all(signPromises);

                const urlMap: Record<string, string> = {};
                words.forEach((word, index) => {
                    urlMap[word] = signMetadataArray[index].videoUrl;
                });

                setVideoUrls(urlMap);
                setMatchedWords(words);
                setStatus('PLAYING');
            } catch (err) {
                console.error('Sign metadata error:', err);
                setError('Failed to load sign videos. Please ensure the backend is running.');
                setStatus('IDLE');
            }
        } else {
            setError('None of the signs in this sentence are currently available. Please check the browser console (F12) for network errors.');
            setStatus('IDLE');
        }
    }, []);

    const handleSpeechError = useCallback((err: string) => {
        setError(`Speech Error: ${err}`);
        setStatus('IDLE');
    }, []);

    useEffect(() => {
        speechService.init(handleSpeechResult, handleSpeechError);
    }, [handleSpeechResult, handleSpeechError]);

    const toggleListening = () => {
        if (status === 'LISTENING') {
            speechService.stop();
            setStatus('IDLE');
        } else {
            setError(null);
            setTranscription('');
            setGloss('');
            setMatchedWords(null);
            speechService.start();
            setStatus('LISTENING');
        }
    };

    const handlePlaybackComplete = () => {
        setStatus('IDLE');
    };

    // Memoize supported sentences list to prevent re-computation
    const supportedSentences = useMemo(() => getSupportedSentencesList(), []);

    return (
        <div className="min-h-screen flex flex-col">
            {/* Sci-Fi Grid Background */}
            <div className="sci-fi-grid"></div>

            {/* Navigation Bar */}
            <nav className="relative z-20 glass-card border-b border-blue-200/50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-cyan-600 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-black bg-gradient-to-r from-blue-800 to-blue-700 bg-clip-text text-transparent uppercase tracking-tight">
                            ISL Interpreter
                        </h1>
                    </div>
                    <div className="flex items-center gap-6">
                        <button className="glass-card px-4 py-2 rounded-xl font-bold text-sm text-slate-700 hover:bg-blue-50/50 transition-all duration-300 hover-lift">
                            Home
                        </button>
                        <button className="glass-card px-4 py-2 rounded-xl font-bold text-sm text-slate-700 hover:bg-blue-50/50 transition-all duration-300 hover-lift">
                            About
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content - 2 Column Layout */}
            <div className="relative z-10 flex-1 max-w-7xl mx-auto w-full p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">

                    {/* Left Half - Voice Input (Top) and Supported Sentences (Bottom) */}
                    <div className="flex flex-col gap-8">

                        {/* Voice Input Section */}
                        <div className="glass-card rounded-3xl p-8">
                            <div className="space-y-6">
                                <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-6">Voice Input</h2>

                                <button
                                    disabled={status === 'PROCESSING'}
                                    onClick={toggleListening}
                                    className={`w-full group relative px-8 py-6 rounded-2xl text-lg font-black shadow-xl transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden ${status === 'LISTENING'
                                        ? 'bg-gradient-to-r from-red-500 to-red-600 text-white pulse-ring'
                                        : 'bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 text-white hover:shadow-blue-700/50 hover:scale-105'
                                        }`}
                                >
                                    <div className="flex items-center justify-center gap-3">
                                        {status === 'LISTENING' ? (
                                            <>
                                                <div className="w-4 h-4 bg-white rounded-sm animate-pulse"></div>
                                                LISTENING...
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                                                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                                                </svg>
                                                TAP TO SPEAK
                                            </>
                                        )}
                                    </div>
                                </button>

                                {status === 'LISTENING' && (
                                    <div className="flex justify-center gap-2 py-4">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <div
                                                key={i}
                                                className="w-1 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-full animate-pulse"
                                                style={{
                                                    height: `${20 + i * 8}px`,
                                                    animationDelay: `${i * 0.1}s`
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}

                                <div className="glass-card p-4 rounded-xl border-l-4 border-blue-500">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">English Input</span>
                                    <p className="text-base font-bold text-slate-800 capitalize">{transcription || 'Tap Microphone To Speak...'}</p>
                                </div>

                                <div className="glass-card p-4 rounded-xl border-l-4 border-cyan-500">
                                    <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-wider block mb-2">Interpreter Output (ISL)</span>
                                    <p className="text-base font-black bg-gradient-to-r from-blue-900 to-blue-800 bg-clip-text text-transparent">{gloss || 'Translation will appear here...'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Supported Sentences Section */}
                        <div className="glass-card rounded-3xl p-8 flex-1">
                            <div className="space-y-6">
                                <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-6">Try Saying</h2>

                                <div className="space-y-3">
                                    {supportedSentences.map((sentence: string, idx: number) => (
                                        <div
                                            key={idx}
                                            onClick={() => handleSpeechResult(sentence)}
                                            className="glass-card px-4 py-3 text-slate-700 text-sm font-bold rounded-xl border border-blue-200/50 hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300 cursor-pointer hover-lift"
                                        >
                                            "{sentence}"
                                        </div>
                                    ))}
                                </div>

                                {error && (
                                    <div className="glass-card p-4 border-l-4 border-red-500 rounded-xl text-red-700 font-medium mt-6">
                                        <div className="flex items-start gap-3">
                                            <span className="text-xl">⚠️</span>
                                            <span className="text-sm">{error}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Half - Interpreter Output (Video Playback) */}
                    <div className="glass-card rounded-3xl p-8">
                        <div className="h-full flex flex-col">
                            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-6">Interpreter Output</h2>

                            <div className="flex-1 flex items-center justify-center min-h-[500px]">
                                {status === 'PLAYING' && matchedWords ? (
                                    <VideoSequence
                                        words={matchedWords}
                                        videoUrls={videoUrls}
                                        onComplete={handlePlaybackComplete}
                                    />
                                ) : status === 'PROCESSING' ? (
                                    <div className="text-center space-y-6">
                                        <div className="relative w-20 h-20 mx-auto">
                                            <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
                                            <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                            <div className="absolute inset-2 border-4 border-cyan-400 border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
                                        </div>
                                        <p className="text-slate-600 font-bold">⚡ Processing...</p>
                                    </div>
                                ) : (
                                    <div className="text-center p-12 border-2 border-dashed border-blue-300/50 rounded-3xl">
                                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                            </svg>
                                        </div>
                                        <p className="text-slate-500 font-semibold">Listening to you...</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpeechInput;
