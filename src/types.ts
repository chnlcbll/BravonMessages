export interface Message {
  id: string;
  text: string;
  timestamp: number;
  sender: 'them' | 'me';
}

export interface Conversation {
  id: string;
  name: string;
  phone: string;
  color: string;
  messages: Message[];
  unreadCount: number;
}
