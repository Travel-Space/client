import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

import { Follower, Following } from "@/@types";

const { persistAtom } = recoilPersist();

export const followerState = atom<Follower[]>({
  key: "follower",
  default: [],
});

export const followingState = atom<Following[]>({
  key: "following",
  default: [],
});

export const notMutualState = selector({
  key: "notMutualState",
  get: ({ get }) => {
    const friends = get(followerState);
    const result = friends.filter(item => item.isMutual === false);

    return result;
  },
});
