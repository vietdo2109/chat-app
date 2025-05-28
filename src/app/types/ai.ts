import { UserDTO } from './data';
import { Message } from './messages';

export type AI = {
  avatar: string;
  characterBase: string;
  createdAt: string;
  creatorId: string;
  creator: UserDTO;
  gender: number;
  id: string;
  latestActionDate: string;
  latestMessage?: Message;
  latestMessageId: number;
  name: string;
  systemPrompt: string;
};

export type AIChatSlot = {
  creator: UserDTO;
  id: string;
  avatar: string;
  name: string;
  latestActionDate: string;
  latestMessage?: Message;
};

export type GenContentRequest = {
  text: string;
  chatId: string;
  type: 'ai';
};

export type CreateAIModel = {
  avatar: string;
  gender: number;
  name: string;
  characterBase: string;
  systemPrompt: string;
};
