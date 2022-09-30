export type User = {
  id: number;
  email: string;
  password: string;
  avatar: string;
  lastName: string;
  firstName: string;
  messages?: Message[] | undefined;
  participants?: Participant[];
  rooms?: Room[];
};
export type Message = {
  id: number;
  content: String;
  sender?: User;
  userId: number;
  room?: Room;
  roomId: number;
};

export type Room = {
  id: number;
  messages: Message[];
  participants?: Participant[];
  User?: User;
  userId: number;
  participantId: number
};

export type Participant = {
  id: number;
  room?: Room;
  roomId: number;
  user: User;
  userId: number;
};
