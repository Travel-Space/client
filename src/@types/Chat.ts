import { User } from "./User";

export interface Chat {
  id: number;
  chatMemberships: ChatMembership[];
  messages: Message[];
}

export interface ChatMembership {
  chatId: number;
  userId: number;
  chat: Chat;
  user: User;
}

export interface Message {
  id: number;
  content: string;
  senderId: number;
  chatId: number;
  createdAt: Date;
  chat: Chat;
  sender: User;
}
