import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSpeechRecognition } from '../../shared/speech';
import { convertToGloss } from '../../shared/textToGloss';
import { matchSentence, getSupportedSentencesList } from './SentenceMatcher';
import VideoSequence from './VideoSequence';
import { Mic, MicOff } from 'lucide-react';

type InterpreterStatus = 'IDLE' | 'LISTENING' | 'PROCESSING' | 'PLAYING' | 'ERROR';

/**
 * RealTime ISL Interpreter Component
 * Integrated into the main ISL Learning Platform
 */
export function RealTime() {
    const { isListening, transcript, startListening, stopListening } = useSpeechRecognition();
    const [status, setStatus] = useState<InterpreterStatus>('IDLE');
    const [transcription, setTranscription] = useState('');
    const [gloss, setGloss] = useState('');
    const [matchedWords, setMatchedWords] = useState<string[] | null>(null);
    const [videoUrls, setVideoUrls] = useState<Record<string, string>>({});
    const [error, setError] = useState<string | null>(null);

    // Update status when listening state changes
    useEffect(() => {
        if (isListening) {
            setStatus('LISTENING');
        } else if (status === 'LISTENING') {
            setStatus('IDLE');
        }
    }, [isListening, status]);

    // Process transcript when it changes
    useEffect(() => {
        if (transcript && !isListening) {
            handleSpeechResult(transcript);
        }
    }, [transcript, isListening]);

    const handleSpeechResult = useCallback(async (text: string) => {
        setTranscription(text);
        setStatus('PROCESSING');

        const resultGlossArray = convertToGloss(text);
        const resultGloss = resultGlossArray.join(' ');
        setGloss(resultGloss);

        const words = matchSentence(resultGloss);
        if (words) {
            try {
                // Build video URLs from backend
                const urlMap: Record<string, string> = {};
                words.forEach((word) => {
                    // Assuming backend serves videos at /api/signs/:word
                    urlMap[word] = `http://localhost:3000/api/signs/${word}/video`;
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
            setError('None of the signs in this sentence are currently available.');
            setStatus('IDLE');
        }
    }, []);

    const toggleListening = () => {
        if (isListening) {
            stopListening();
        } else {
            setError(null);
            setTranscription('');
            setGloss('');
            setMatchedWords(null);
            startListening();
        }
    };

    const handlePlaybackComplete = () => {
        setStatus('IDLE');
    };

    const supportedSentences = useMemo(() => getSupportedSentencesList(), []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-slate-800 mb-2">Real-Time ISL Interpreter</h1>
                    <p className="text-slate-600">Speak naturally and see your words translated into Indian Sign Language</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Voice Input & Supported Sentences */}
                    <div className="space-y-6">
                        {/* Voice Input Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">Voice Input</h2>

                            <button
                                disabled={status === 'PROCESSING'}
                                onClick={toggleListening}
                                className={`w-full group relative px-8 py-6 rounded-xl text-lg font-bold shadow-xl transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${status === 'LISTENING'
                                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white animate-pulse'
                                    : 'bg-gradient-to-r from-primary to-blue-600 text-white hover:shadow-2xl hover:scale-105'
                                    }`}
                            >
                                <div className="flex items-center justify-center gap-3">
                                    {status === 'LISTENING' ? (
                                        <>
                                            <MicOff className="w-6 h-6" />
                                            LISTENING...
                                        </>
                                    ) : (
                                        <>
                                            <Mic className="w-6 h-6" />
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
                                            className="w-1 bg-gradient-to-t from-primary to-blue-400 rounded-full animate-pulse"
                                            style={{
                                                height: `${20 + i * 8}px`,
                                                animationDelay: `${i * 0.1}s`
                                            }}
                                        />
                                    ))}
                                </div>
                            )}

                            <div className="mt-6 space-y-4">
                                <div className="bg-slate-50 p-4 rounded-xl border-l-4 border-primary">
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">English Input</span>
                                    <p className="text-base font-semibold text-slate-800 capitalize">{transcription || 'Tap microphone to speak...'}</p>
                                </div>

                                <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
                                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-2">ISL Gloss Output</span>
                                    <p className="text-base font-bold text-blue-900">{gloss || 'Translation will appear here...'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Supported Sentences Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">Try Saying</h2>

                            <div className="space-y-3">
                                {supportedSentences.map((sentence: string, idx: number) => (
                                    <div
                                        key={idx}
                                        onClick={() => handleSpeechResult(sentence)}
                                        className="bg-slate-50 px-4 py-3 text-slate-700 text-sm font-semibold rounded-xl border border-slate-200 hover:border-primary hover:bg-blue-50 transition-all duration-300 cursor-pointer hover:scale-105"
                                    >
                                        "{sentence}"
                                    </div>
                                ))}
                            </div>

                            {error && (
                                <div className="bg-red-50 p-4 border-l-4 border-red-500 rounded-xl text-red-700 font-medium mt-6">
                                    <div className="flex items-start gap-3">
                                        <span className="text-xl">⚠️</span>
                                        <span className="text-sm">{error}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Video Playback */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6">Interpreter Output</h2>

                        <div className="flex items-center justify-center min-h-[500px]">
                            {status === 'PLAYING' && matchedWords ? (
                                <VideoSequence
                                    words={matchedWords}
                                    videoUrls={videoUrls}
                                    onComplete={handlePlaybackComplete}
                                />
                            ) : status === 'PROCESSING' ? (
                                <div className="text-center space-y-6">
                                    <div className="relative w-20 h-20 mx-auto">
                                        <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
                                        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                                        <div className="absolute inset-2 border-4 border-blue-400 border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
                                    </div>
                                    <p className="text-slate-600 font-bold">⚡ Processing...</p>
                                </div>
                            ) : (
                                <div className="text-center p-12 border-2 border-dashed border-slate-300 rounded-3xl">
                                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-blue-500 rounded-2xl flex items-center justify-center">
                                        <Mic className="w-8 h-8 text-white" />
                                    </div>
                                    <p className="text-slate-500 font-semibold">Listening to you...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
