import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

import { User } from "@/@types";
import { PlanetMembership } from "@/@types/Planet";
import { SpaceshipMember } from "@/@types/Spaceship";

const { persistAtom } = recoilPersist();

export interface UserType {
  isAuth: boolean;
  id: number;
  nickName: string;
  email: string;
  memberships: {
    planets: Partial<PlanetMembership[]>;
    spaceships: Partial<SpaceshipMember[]>;
  };
}

export const userAtom = atom<UserType>({
  key: "user",
  default: {
    isAuth: false,
    id: 0,
    nickName: "",
    email: "",
    memberships: {
      planets: [],
      spaceships: [],
    },
  },
  effects_UNSTABLE: [persistAtom],
});

export const profileState = atom<User | null>({
  key: "profile",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
