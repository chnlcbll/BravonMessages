import React from 'react';
import { Conversation } from '../types';
import { MessageCircle, Play, Square, Trash2 } from 'lucide-react';

interface SidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  isSimulating: boolean;
  onToggleSimulation: () => void;
  onClearHistory: () => void;
  isMobileViewActive: boolean;
}

const colorMap: Record<string, string> = {
  'R': 'text-red-400',
  'O': 'text-orange-400',
  'Y': 'text-yellow-400',
  'G': 'text-green-400',
  'B': 'text-blue-400',
  'P': 'text-purple-400'
};

export function Sidebar({
  conversations,
  activeId,
  onSelect,
  isSimulating,
  onToggleSimulation,
  onClearHistory,
  isMobileViewActive
}: SidebarProps) {
  return (
    <div className={`flex flex-col h-full bg-[#080808] border-r border-white/10 ${isMobileViewActive ? 'hidden md:flex' : 'flex'} w-full md:w-80 lg:w-[360px] shrink-0`}>
      <div className="px-6 py-4 border-b border-white/10 bg-[#0A0A0A]">
        <h1 className="text-lg font-bold tracking-tight text-white mb-4 flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
          BRAVON MESSAGES <span className="text-white/40 font-mono text-xs">v2.0.4</span>
        </h1>
        
        <div className="flex gap-2">
          <button
            onClick={onToggleSimulation}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-1.5 rounded-md font-semibold text-sm transition-colors ${
              isSimulating 
                ? 'text-white/40 bg-transparent border border-white/5 hover:text-white hover:bg-white/5' 
                : 'bg-white/10 text-white border border-transparent hover:bg-white/20'
            }`}
          >
            {isSimulating ? 'STOP MESSAGES' : 'START MESSAGES'}
          </button>
          
          <button
            onClick={onClearHistory}
            title="Clear History"
            className="px-3 py-1.5 border border-red-900/50 bg-red-950/20 text-red-400 text-xs rounded-md hover:bg-red-900/30 transition-colors flex items-center justify-center"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="h-full flex items-center justify-center text-white/30 text-sm p-4 text-center font-mono italic">
            No active nodes. Start messages.
          </div>
        ) : (
          <div className="flex flex-col space-y-[1px] bg-white/5">
            {conversations.map((conv) => {
              const lastMessage = conv.messages[conv.messages.length - 1];
              const timeString = new Date(lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              
              const isMe = lastMessage.sender === 'me';
              const firstChar = !isMe ? lastMessage.text.charAt(0) : 'W';
              const colorClass = colorMap[firstChar] || 'text-white/80';
              
              const msgPreview = isMe 
                ? `You: ${lastMessage.text}` 
                : lastMessage.text.split('\n').pop() || '';

              return (
                <button
                  key={conv.id}
                  onClick={() => onSelect(conv.id)}
                  className={`w-full text-left p-4 hover:bg-white/5 transition-colors flex items-start gap-3 border-l-2 ${
                    activeId === conv.id ? 'bg-blue-500/10 border-blue-500' : 'border-transparent bg-[#080808]'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <span className={`${colorClass} font-bold text-xs truncate pr-2`}>
                        {!isMe && `[${firstChar}] `}{conv.name}
                      </span>
                      <span className="text-[10px] text-white/30 whitespace-nowrap">{timeString}</span>
                    </div>
                    <p className={`text-[11px] truncate italic ${conv.unreadCount > 0 ? 'text-white/80 font-medium' : 'text-white/40'}`}>
                      {msgPreview}
                    </p>
                  </div>
                  {conv.unreadCount > 0 && (
                    <div className="shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-1.5 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
