import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

import { User } from "@/@types";
import { Role as PlanetRole } from "@/@types/Planet";
import { Role as SpaceshipRole } from "@/@types/Spaceship";
import { UserRole } from "@/@types/User";

const { persistAtom } = recoilPersist();

export interface UserType {
  isAuth: boolean;
  id: number;
  nickName: string;
  role: UserRole;
  memberships: {
    planets: { planetId: number; role: PlanetRole }[];
    spaceships: { spaceshipId: number; role: SpaceshipRole }[];
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
