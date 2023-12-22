import { User } from "./User";
import { MembershipStatus } from "./Member";
import { Posting } from "./Posting";
import { Spaceship } from "./Spaceship";

export interface Planet {
  id: number;
  name: string;
  description: string;
  ownerId: number;
  memberLimit: number;
  spaceshipLimit: number;
  published: boolean;
  isActive: boolean;
  memberCount: number;
  shape: PlanetShape;
  hashtags: string[];
  createdAt: Date;
  deletedAt: Date;
  articles: Posting[];
  owner: User;
  planetBookMark: PlanetBookmark[];
  members: PlanetMembership[];
  spaceships: Spaceship[];
  totalPages: number;
  totalCount: number;
  currentPage: number;
  planets: Planet[];
  viewCountTotal: number;
}

export interface PlanetsType {
  data: Planet[];
  page: number;
  limit: number;
  totalCount: number;
}
export interface JoinedPlanets {
  data: Planet[];
  page: number;
  limit: number;
  totalMemberships: number;
}
export interface LikedPlanets {
  data: PlanetBookmark[];
  page: number;
  limit: number;
  totalCount: number;
}

export interface PlanetBookmark {
  userId: number;
  planetId: number;
  planet: Planet;
  createdAt: Date;
  totalMemberCount: number;
}

export interface PlanetMembership {
  planetId: number;
  userId: number;
  user: User;
  role: PLANET_ROLE;
  status: MembershipStatus;
}

export type PlanetShape =
  | "SHAPE1"
  | "SHAPE2"
  | "SHAPE3"
  | "SHAPE4"
  | "SHAPE5"
  | "SHAPE6"
  | "SHAPE7"
  | "SHAPE8"
  | "SHAPE9"
  | "SHAPE10"
  | "SHAPE11"
  | "SHAPE12"
  | "SHAPE13"
  | "SHAPE14"
  | "SHAPE15"
  | "SHAPE16"
  | "SHAPE17"
  | "SHAPE18";

export const PLANET_ROLE = {
  OWNER: "행성 관리자",
  ADMIN: "부관리자",
  MEMBER: "일반",
  GUEST: "게스트",
} as const;

export const PLANET_ROLE_NAME = {
  OWNER: "OWNER",
  ADMIN: "ADMIN",
  MEMBER: "MEMBER",
  GUEST: "GUEST",
} as const;

export type PLANET_ROLE = keyof typeof PLANET_ROLE;

export interface CancelLikePlanet {
  planetId: number;
  userId: number;
}
