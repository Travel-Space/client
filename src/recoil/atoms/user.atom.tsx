import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

import { User } from "@/@types";
import { PlanetMembership } from "@/@types/Planet";
import { SpaceshipMember } from "@/@types/Spaceship";
import { UserRole } from "@/@types/User";

const { persistAtom } = recoilPersist();

export interface UserType {
  isAuth: boolean;
  id: number;
  role: UserRole;
  memberships: {
    planets: Partial<PlanetMembership[]>;
    spaceships: Partial<SpaceshipMember[]>;
  };
}

export const userAtom = atom<UserType | null>({
  key: "user",
  default: {
    isAuth: false,
    id: 0,
    role: "MEMBER",
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
