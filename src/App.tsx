import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Conversation, Message } from './types';
import { generateRandomFilipinoName, generateRandomPhoneNumber, generatePaymentMessage, generateId, getRandomColor } from './utils';
import { Sidebar } from './components/Sidebar';
import { ChatArea } from './components/ChatArea';
import { ConfirmationModal } from './components/ConfirmationModal';

export default function App() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  // Using ref to store simulation timeout to easily clear it
  const simulationTimeoutRef = useRef<number | null>(null);

  // Generate a random incoming message
  const triggerIncomingMessage = useCallback(() => {
    setConversations((prev) => {
      // 10% chance to reply to an existing active conversation if one exists
      // to make it feel more alive, otherwise always a new person to build the 10000 illusion.
      const shouldAppendExisting = prev.length > 0 && Math.random() < 0.1;
      
      if (shouldAppendExisting) {
        // Find a random existing conversation
        const targetIndex = Math.floor(Math.random() * Math.min(prev.length, 10)); // Pick from recent 10
        const target = prev[targetIndex];
        
        const newMessage: Message = {
          id: generateId(),
          text: generatePaymentMessage(target.name, target.phone, target.color),
          timestamp: Date.now(),
          sender: 'them'
        };

        const updatedTarget = {
          ...target,
          messages: [...target.messages, newMessage],
          unreadCount: activeId === target.id ? 0 : target.unreadCount + 1
        };

        const newConversations = [...prev];
        newConversations.splice(targetIndex, 1);
        newConversations.unshift(updatedTarget); // Move to top
        
        return newConversations.slice(0, 500); // Keep max 500 in state to prevent memory issues
      } else {
        // Brand new person
        const name = generateRandomFilipinoName();
        const phone = generateRandomPhoneNumber();
        const color = getRandomColor();
        
        const newMessage: Message = {
          id: generateId(),
          text: generatePaymentMessage(name, phone, color),
          timestamp: Date.now(),
          sender: 'them'
        };

        const newConversation: Conversation = {
          id: generateId(),
          name,
          phone,
          color,
          messages: [newMessage],
          unreadCount: activeId === null ? 1 : 1 // if it's new and not active, it's unread
        };

        return [newConversation, ...prev].slice(0, 500);
      }
    });
  }, [activeId]);

  // Simulation loop
  useEffect(() => {
    if (!isSimulating) {
      if (simulationTimeoutRef.current) {
        clearTimeout(simulationTimeoutRef.current);
      }
      return;
    }

    const loop = () => {
      triggerIncomingMessage();
      // Chaos delay: random between 200ms and 1500ms
      const delay = Math.floor(Math.random() * 1300) + 200;
      simulationTimeoutRef.current = window.setTimeout(loop, delay);
    };

    // Start first tick
    loop();

    return () => {
      if (simulationTimeoutRef.current) {
        clearTimeout(simulationTimeoutRef.current);
      }
    };
  }, [isSimulating, triggerIncomingMessage]);

  // Clear unread count when selecting a conversation
  const handleSelectConversation = (id: string) => {
    setActiveId(id);
    setConversations((prev) => 
      prev.map(c => c.id === id ? { ...c, unreadCount: 0 } : c)
    );
  };

  const handleSendMessage = (conversationId: string, text: string) => {
    const newMessage: Message = {
      id: generateId(),
      text,
      timestamp: Date.now(),
      sender: 'me'
    };

    setConversations((prev) => {
      const idx = prev.findIndex(c => c.id === conversationId);
      if (idx === -1) return prev;
      
      const target = prev[idx];
      const updatedTarget = {
        ...target,
        messages: [...target.messages, newMessage]
      };

      const newConversations = [...prev];
      newConversations.splice(idx, 1);
      newConversations.unshift(updatedTarget);
      
      return newConversations;
    });
  };

  const clearHistory = () => {
    setConversations([]);
    setActiveId(null);
    setShowDeleteModal(false);
    setIsSimulating(false);
  };

  const activeConversation = conversations.find(c => c.id === activeId) || null;
  const isMobileViewActive = activeId === null; // On mobile, if no active, show list

  return (
    <div className="h-screen w-full bg-[#050505] text-[#E0E0E0] font-sans flex overflow-hidden">
      <Sidebar 
        conversations={conversations}
        activeId={activeId}
        onSelect={handleSelectConversation}
        isSimulating={isSimulating}
        onToggleSimulation={() => setIsSimulating(!isSimulating)}
        onClearHistory={() => setShowDeleteModal(true)}
        isMobileViewActive={isMobileViewActive}
      />
      
      {/* Mobile: Hide ChatArea if no active conversation. Desktop: Always show ChatArea. */}
      <div className={`flex-1 ${!activeId ? 'hidden md:flex' : 'flex'} w-full relative`}>
        <ChatArea 
          conversation={activeConversation}
          onBack={() => setActiveId(null)}
          onSendMessage={handleSendMessage}
        />
      </div>

      <ConfirmationModal 
        isOpen={showDeleteModal}
        title="CLEAR HISTORY"
        message="Are you sure you want to delete all messages? This action cannot be undone and will reset the messages."
        onConfirm={clearHistory}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
}
