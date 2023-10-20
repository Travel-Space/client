import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

type UserType = {
  isAuth: boolean;
};

export const userAtom = atom<UserType>({
  key: "user",
  default: {
    isAuth: false,
  },
  effects_UNSTABLE: [persistAtom],
});
