export const users = [
  {
    id: 90871230000001,
    username: 'alice',
    email: 'alice@example.com',
    password: 'hashed-password',
    isOnline: true,
    createdAt: new Date('2024-04-01T09:00:00'),
  },
  {
    id: 90871230000002,
    username: 'bob',
    email: 'bob@example.com',
    password: 'hashed-password',
    isOnline: false,
    createdAt: new Date('2024-04-01T09:05:00'),
  },
  {
    id: 90871230000003,
    username: 'carol',
    email: 'carol@example.com',
    password: 'hashed-password',
    isOnline: true,
    createdAt: new Date('2024-04-01T09:10:00'),
  },
  {
    id: 90871230000004,
    username: 'dave',
    email: 'dave@example.com',
    password: 'hashed-password',
    isOnline: false,
    createdAt: new Date('2024-04-01T09:15:00'),
  },
];

export const conversations = [
  {
    id: 50000001,
    uid1: 90871230000001, // alice
    uid2: 90871230000002, // bob
    createdAt: new Date('2024-04-01T10:00:00'),
  },
  {
    id: 50000002,
    uid1: 90871230000003, // carol
    uid2: 90871230000004, // dave
    createdAt: new Date('2024-04-01T10:30:00'),
  },
];

export const groups = [
  {
    id: 60000001,
    name: 'Frontend Squad',
    members: [
      90871230000001, // alice
      90871230000002, // bob
      90871230000003, // carol
    ],
    createdAt: new Date('2024-04-01T11:00:00'),
  },
];

export const messages = [
  // --- Conversation: Alice & Bob ---
  {
    id: 1,
    senderId: 90871230000001,
    text: 'Hey Bob!',
    sentAt: new Date('2024-04-01T10:01:00'),
    chatId: 50000001,
    chatType: 'conversation',
  },
  {
    id: 2,
    senderId: 90871230000002,
    text: "Hey Alice! What's up?",
    sentAt: new Date('2024-04-01T10:02:00'),
    chatId: 50000001,
    chatType: 'conversation',
  },
  {
    id: 3,
    senderId: 90871230000001,
    text: 'Just working on the new UI mockups. Got a sec?',
    sentAt: new Date('2024-04-01T10:03:00'),
    chatId: 50000001,
    chatType: 'conversation',
  },
  {
    id: 4,
    senderId: 90871230000002,
    text: 'Sure. Want to hop on a quick call?',
    sentAt: new Date('2024-04-01T10:04:00'),
    chatId: 50000001,
    chatType: 'conversation',
  },
  {
    id: 5,
    senderId: 90871230000001,
    text: 'Yes! Sending invite now.',
    sentAt: new Date('2024-04-01T10:05:00'),
    chatId: 50000001,
    chatType: 'conversation',
  },

  // --- Conversation: Carol & Dave ---
  {
    id: 6,
    senderId: 90871230000003,
    text: 'Did you check the deployment logs?',
    sentAt: new Date('2024-04-01T10:31:00'),
    chatId: 50000002,
    chatType: 'conversation',
  },
  {
    id: 7,
    senderId: 90871230000004,
    text: 'Yeah, looks like a config error.',
    sentAt: new Date('2024-04-01T10:32:00'),
    chatId: 50000002,
    chatType: 'conversation',
  },
  {
    id: 8,
    senderId: 90871230000003,
    text: "I'll patch it and redeploy.",
    sentAt: new Date('2024-04-01T10:34:00'),
    chatId: 50000002,
    chatType: 'conversation',
  },

  // --- Group Chat: Frontend Squad ---
  {
    id: 9,
    senderId: 90871230000003,
    text: 'Morning team!',
    sentAt: new Date('2024-04-01T11:01:00'),
    chatId: 60000001,
    chatType: 'group',
  },
  {
    id: 10,
    senderId: 90871230000001,
    text: 'Hi Carol 👋',
    sentAt: new Date('2024-04-01T11:02:00'),
    chatId: 60000001,
    chatType: 'group',
  },
  {
    id: 11,
    senderId: 90871230000002,
    text: 'Good morning!',
    sentAt: new Date('2024-04-01T11:03:00'),
    chatId: 60000001,
    chatType: 'group',
  },
  {
    id: 12,
    senderId: 90871230000003,
    text: 'The Figma designs were updated btw.',
    sentAt: new Date('2024-04-01T11:04:00'),
    chatId: 60000001,
    chatType: 'group',
  },
  {
    id: 13,
    senderId: 90871230000001,
    text: 'Nice. I’ll review them after this stand-up.',
    sentAt: new Date('2024-04-01T11:05:00'),
    chatId: 60000001,
    chatType: 'group',
  },
  {
    id: 14,
    senderId: 90871230000002,
    text: 'Same here. Let’s sync up after lunch?',
    sentAt: new Date('2024-04-01T11:06:00'),
    chatId: 60000001,
    chatType: 'group',
  },
  {
    id: 15,
    senderId: 90871230000003,
    text: 'Perfect 👍',
    sentAt: new Date('2024-04-01T11:07:00'),
    chatId: 60000001,
    chatType: 'group',
  },
];
