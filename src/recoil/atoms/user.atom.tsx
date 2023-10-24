import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

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
