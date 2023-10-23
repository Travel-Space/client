import { User } from "./User";

export interface UserFriend {
  userId: number;
  friendId: number;
  friend: User;
  user: User;
}
