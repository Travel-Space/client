import { atom } from "recoil";

import { Follower, Following } from "@/@types";

export const followerState = atom<Follower[]>({
  key: "follower",
  default: [],
});

export const totalFollowersState = atom<number>({
  key: "totalFollowers",
  default: 0,
});

export const followingState = atom<Following[]>({
  key: "following",
  default: [],
});

export const totalFollowingsState = atom<number>({
  key: "totalFollowings",
  default: 0,
});

export const notMutualState = atom<Follower[]>({
  key: "notMutualFriends",
  default: [],
});
