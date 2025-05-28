import { UserDTO } from './data';
import { Message } from './Message';

export type Group = {
  id: string;
  latestMessage?: Message;
  createdAt: string; // or Date if you're parsing it
  latestActionDate: string; // or Date
  self: UserDTO;
  name: string;
  latestMessageId: number;
};

export type GroupChatSlot = {
  id?: string;
  name?: string;
  latestActionDate?: string;
  latestMessage?: Message;
  self?: UserDTO;
  other?: UserDTO;
};
