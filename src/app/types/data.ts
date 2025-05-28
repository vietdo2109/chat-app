import { Message } from './Message';

export type UserDTO = {
  id: string;
  userName: string;
  email: string;
  isOnline: boolean;
};

export type ComposeChatSlot = {
  avatar?: string;
  id?: string;
  latestActionDate?: string;
  latestMessage?: Message;
  self?: UserDTO;
  name?: string;
  other?: UserDTO;
};
