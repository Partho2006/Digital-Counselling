import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Heart, MessageCircle, Book, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const BACKEND = process.env.BACKEND_URL || 'http://localhost:5000'; 

const CounsellingApp = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm here to listen and support you. Whatever you're going through, you're not alone. How are you feeling today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [messages]);
  useEffect(() => { adjustTextareaHeight(); }, [input]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input.trim(), timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${BACKEND}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.content, history: messages }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response, timestamp: new Date() }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    { icon: Book, text: "I'm stressed about exams", color: "from-emerald-500 to-teal-600" },
    { icon: Users, text: "I'm having social anxiety", color: "from-blue-500 to-indigo-600" },
    { icon: Heart, text: "I feel overwhelmed", color: "from-rose-500 to-pink-600" },
    { icon: MessageCircle, text: "I need someone to talk to", color: "from-amber-500 to-orange-600" }
  ];

  const handleQuickPrompt = (text) => {
    setInput(text);
    textareaRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-slate-200 relative overflow-hidden pt-4">

      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-700 rounded-full mix-blend-lighten blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-700 rounded-full mix-blend-lighten blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-cyan-700 rounded-full mix-blend-lighten blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-5xl">
        <header className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center justify-center mb-4 bg-slate-800/70 backdrop-blur-md px-8 py-3 rounded-full shadow-md border border-slate-700">
            <Sparkles className="w-6 h-6 text-teal-400 mr-2" />
            <Link to="/" className="text-3xl font-semibold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
              Student Wellness Space
            </Link>
          </div>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            A calm, confidential place to talk through what’s on your mind
          </p>
        </header>

        <div className="bg-slate-900/70 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-800 animate-slide-up">

          {messages.length === 1 && (
            <div className="p-6 border-b border-slate-800 bg-slate-900/40 backdrop-blur-sm">
              <p className="text-sm font-medium text-slate-400 mb-3">Quick start conversations:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {quickPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickPrompt(prompt.text)}
                    className="group flex items-center p-4 bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow hover:shadow-lg transition-all duration-300 border border-slate-700 hover:scale-[1.03]"
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${prompt.color} flex items-center justify-center mr-3 group-hover:scale-110 transition-transform`}>
                      <prompt.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm text-slate-200 font-medium">{prompt.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="h-[500px] overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-message-in`}>
                <div className={`max-w-[75%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>

                  {message.role === 'assistant' && (
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center mr-2 shadow">
                        <Heart className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs font-medium text-teal-400">Support Counsellor</span>
                    </div>
                  )}

                  <div className={`px-5 py-4 text-[15px] leading-relaxed whitespace-pre-wrap shadow ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-teal-600 to-cyan-700 text-white rounded-2xl rounded-tr-sm'
                      : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-2xl rounded-tl-sm'
                  }`}>
                    {message.content}
                    <span className={`text-xs mt-2 block ${
                      message.role === 'user' ? 'text-teal-200' : 'text-slate-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  {message.role === 'user' && (
                    <div className="flex items-center justify-end mt-2">
                      <span className="text-xs font-medium text-slate-400 mr-2">You</span>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow">
                        <span className="text-white text-sm font-bold">S</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start animate-message-in">
                <div className="max-w-[75%]">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center mr-2">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs font-medium text-teal-400">Support Counsellor</span>
                  </div>
                  <div className="rounded-2xl rounded-tl-sm px-5 py-4 bg-slate-800 border border-slate-700 shadow-sm">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-slate-800 bg-slate-900/60 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="flex items-end gap-3">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder="Share what's on your mind... (Press Enter to send)"
                className="w-full px-5 py-4 rounded-2xl border border-slate-700 focus:border-teal-500 focus:ring-4 focus:ring-teal-900 outline-none resize-none transition-all duration-300 bg-slate-800 text-slate-200 placeholder-slate-500 min-h-[60px] max-h-[200px]"
                rows="1"
                disabled={isLoading}
              />

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="px-6 py-4 bg-gradient-to-br from-teal-600 to-cyan-700 text-white rounded-2xl hover:scale-105 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed transition-all duration-300 shadow-md active:scale-95 flex items-center justify-center min-w-[60px]"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>

            <p className="text-xs text-slate-500 mt-3 text-center">
              Your conversations are confidential and supportive. For emergencies, contact campus security or local emergency services.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -40px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(40px, 40px) scale(1.05); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes message-in {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-blob { animation: blob 10s infinite ease-in-out; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
        .animate-message-in { animation: message-in 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default CounsellingApp;
