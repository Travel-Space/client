import { User } from "./User";

export interface Follower {
  friendId: number;
  isMutual: boolean;
  user: User;
  userId: number;
}
export interface Following {
  friend: User;
  friendId: number;
  userId: number;
}
export interface Follow {
  friendId: number;
  userId: number;
}
