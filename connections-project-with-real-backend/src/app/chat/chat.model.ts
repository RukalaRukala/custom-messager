import { IString } from '../auth/auth.model';

export interface IGroupItem {
  id: IString;
  name: IString;
  createdAt: IString;
  createdBy: IString;
  isMyGroup?: boolean;
  messages?: IMessage[];
  lastUnix?: string;
}

export interface IChatGroupList {
  Count: number;
  Items: IGroupItem[];
}

export interface IGroupId {
  groupID: string;
}

export interface IUserItem {
  name: IString;
  uid: IString;
  conversationId?: string;
  messages?: IMessage[];
  lastUnix?: string;
}

export interface IUsers {
  Count: number;
  Items: IUserItem[];
}

export interface ICompanion {
  conversationID: string;
}

export interface IConversation {
  id: IString;
  companionID: IString;
}

export interface IConversations {
  Count: number;
  Items: IConversation[];
}

export interface IMessage {
  authorID: IString;
  message: IString;
  createdAt: IString;
}

export interface IMessages {
  Count: number;
  Items: IMessage[];
}
