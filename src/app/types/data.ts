export type Conversation = {
  id: string;
  uid1: string;
  uid2: string;
  createdAt: string; // or Date if you're parsing it
  latestActionDate: string; // or Date
  self: UserDTO;
  other: UserDTO;
  latestMessage?: Message;
};

export type Group = {
  id: string;
  latestMessage?: Message;
  createdAt: string; // or Date if you're parsing it
  latestActionDate: string; // or Date
  self: UserDTO;
  name: string;
  latestMessageId: number;
};
export type UserDTO = {
  id: string;
  userName: string;
  email: string;
  isOnline: boolean;
};

export type GroupChatSlot = {
  id?: string;
  name?: string;
  latestActionDate?: string;
  latestMessage?: Message;
  self?: UserDTO;
  other?: UserDTO;
};

export type ConversationChatSlot = {
  id?: string;
  latestActionDate?: string;
  latestMessage?: Message;
  self?: UserDTO;
  other?: UserDTO;
};

export type Message = {
  chatId: string;
  id: number;
  senderId: string;
  senderName: string;
  sentAt: Date;
  text: string;
};

export type ComposeChatSlot = {
  id?: string;
  latestActionDate?: string;
  latestMessage?: Message;
  self?: UserDTO;
  name?: string;
  other?: UserDTO;
};

export interface CreateMessageDTO {
  chatId: string;
  text: string;
  type: 'conversation' | 'group';
}
