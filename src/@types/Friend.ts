import { User } from "./User";

export interface Follower {
  friendId: number;
  isMutual: boolean;
  user: User;
  userId: number;
  isFollowing: boolean;
}
export interface FollowersType {
  data: Follower[];
  total: number;
  page: number;
  limit: number;
}
export interface Following {
  friend: User;
  friendId: number;
  userId: number;
  isFollowing: boolean;
}
export interface FollowingsType {
  data: Following[];
  total: number;
  page: number;
  limit: number;
}
export interface Follow {
  friendId: number;
  userId: number;
}
