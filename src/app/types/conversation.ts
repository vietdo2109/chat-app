import { UserDTO } from './data';
import { Message } from './messages';

export type ConversationChatSlot = {
  id?: string;
  latestActionDate?: string;
  latestMessage?: Message;
  self?: UserDTO;
  other?: UserDTO;
};

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
