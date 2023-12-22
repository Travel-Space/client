import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

import { User } from "@/@types";
import { PLANET_ROLE } from "@/@types/Planet";
import { SPACESHIP_ROLE } from "@/@types/Spaceship";
import { UserRole } from "@/@types/User";

const { persistAtom } = recoilPersist();

export interface UserType {
  isAuth: boolean;
  id: number;
  nickName: string;
  role: UserRole;
  memberships: {
    planets: { planetId: number; role: PLANET_ROLE }[];
    spaceships: { spaceshipId: number; role: SPACESHIP_ROLE }[];
  };
}

export const userAtom = atom<UserType | null>({
  key: "user",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const profileState = atom<User | null>({
  key: "profile",
  default: null,
});
