export type Message = {
  chatId?: string;
  id?: number;
  senderId?: string;
  senderName?: string;
  sentAt?: Date;
  text: string;
  byAI?: boolean;
};

export interface CreateMessageDTO {
  chatId: string;
  text: string;
  type: 'conversation' | 'group';
}
