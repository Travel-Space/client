import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

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

export const notMutualState = selector({
  key: "notMutualState",
  get: ({ get }) => {
    const friends = get(followerState);
    const result = friends.filter(item => item.isMutual === false);

    return result;
  },
});
