import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

import { User } from "@/@types";

const { persistAtom } = recoilPersist();

type UserType = {
  isAuth: boolean;
  id: number;
  nickName: string;
  email: string;
};

export const userAtom = atom<UserType>({
  key: "user",
  default: {
    isAuth: false,
    id: 0,
    nickName: "",
    email: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export const profileState = atom<User | null>({
  key: "profile",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
