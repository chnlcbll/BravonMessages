import React, { useState, useRef, useEffect } from 'react';
import { Conversation, Message } from '../types';
import { generateId } from '../utils';
import { ArrowLeft, Send, X } from 'lucide-react';

interface ChatAreaProps {
  conversation: Conversation | null;
  onBack: () => void;
  onSendMessage: (conversationId: string, text: string) => void;
}

export function ChatArea({ conversation, onBack, onSendMessage }: ChatAreaProps) {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to bottom on new messages
  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages]);

  if (!conversation) {
    return (
      <div className="hidden md:flex flex-1 items-center justify-center bg-[#050505]">
        <div className="text-center text-white/30 font-mono">
           <div className="text-[120px] font-black text-white/5 leading-none select-none tracking-tighter">BRAVON</div>
           <p className="mt-4 text-xs tracking-widest uppercase">Waiting for incoming messages...</p>
        </div>
      </div>
    );
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(conversation.id, inputText.trim());
      setInputText('');
    }
  };

  return (
    <div className="flex flex-col h-full flex-1 bg-[#050505] min-w-0 relative">
      {/* Background Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden flex items-center justify-center z-0">
        <div className="text-[200px] font-black text-white leading-none select-none tracking-tighter -rotate-12">BRAVON</div>
      </div>

      {/* Header */}
      <div className="h-16 shrink-0 bg-[#0A0A0A] border-b border-white/5 flex items-center justify-between px-6 z-10">
        <div className="flex items-center gap-3 min-w-0">
          <button 
            onClick={onBack}
            className="md:hidden p-1.5 -ml-2 text-white/40 hover:text-white hover:bg-white/5 rounded-md transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <h2 className="text-xl font-medium text-white truncate">{conversation.name}</h2>
            <p className="text-xs text-blue-400 font-mono tracking-tight truncate">{conversation.phone} • Active Now</p>
          </div>
        </div>
        
        <button onClick={onBack} className="p-2 text-white/40 hover:text-red-400 transition-colors hidden md:block">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages list */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 z-10">
        {conversation.messages.map((msg) => {
          const isMe = msg.sender === 'me';
          const timeString = new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          
          if (isMe) {
            return (
              <div key={msg.id} className="flex justify-end">
                <div className="flex flex-col items-end">
                  <div className="max-w-xs bg-white/10 rounded-2xl rounded-tr-none p-4">
                    <p className="text-sm text-white/80 whitespace-pre-wrap break-words leading-relaxed">
                      {msg.text}
                    </p>
                  </div>
                  <span className="text-[10px] text-white/30 mt-1 italic pr-1">
                    Sent {timeString}
                  </span>
                </div>
              </div>
            );
          } else {
            const lines = msg.text.split('\n');
            const hasFormat = lines.length >= 4 && ['R', 'O', 'Y', 'G', 'B', 'P'].includes(lines[0]);

            return (
              <div key={msg.id} className="flex justify-start">
                <div className="max-w-md space-y-2 w-full md:w-auto">
                  <div className="bg-white/5 rounded-2xl rounded-tl-none p-4 border border-white/10 backdrop-blur-sm">
                    {hasFormat ? (
                      <>
                        <p className="text-sm mb-4 text-white/80 font-mono text-xs">
                          {lines[0]}<br/>
                          {lines[1]}<br/>
                          {lines[2]}
                        </p>
                        
                        <div className="bg-gradient-to-br from-blue-600/40 to-blue-900/40 rounded-xl p-4 border border-blue-400/30">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-blue-200">Payment Sent</span>
                            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] text-white">✓</div>
                          </div>
                          <div className="text-2xl font-semibold text-white mb-1">Php 50.00</div>
                          <div className="text-[10px] text-blue-200/60 font-mono truncate">{lines.slice(3).join('\n')}</div>
                        </div>
                      </>
                    ) : (
                      <p className="text-sm text-white/80 whitespace-pre-wrap break-words">{msg.text}</p>
                    )}
                  </div>
                  <span className="text-[10px] text-white/30 ml-1 italic">
                    Received {timeString}
                  </span>
                </div>
              </div>
            );
          }
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-6 border-t border-white/10 bg-[#080808] z-10">
        <form onSubmit={handleSend} className="relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Reply to ${conversation.name.split(' ')[0]}...`}
            className="w-full bg-white/5 border border-white/10 rounded-full pl-6 pr-24 py-3 text-sm text-white focus:outline-none focus:border-white/20 placeholder:text-white/20 transition-colors"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="absolute right-2 top-1.5 px-6 py-1.5 bg-white text-black font-bold text-xs rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-200 transition-all"
          >
            SEND
          </button>
        </form>
      </div>
    </div>
  );
}
