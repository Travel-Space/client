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
  data: Planet[];
  page: number;
  limit: number;
  totalCount: number;
}

export interface PlanetBookmark {
  userId: number;
  planetId: number;
  planet: Planet;
  user: User;
}

export interface PlanetMembership {
  planetId: number;
  userId: number;
  user: User;
  role: Role;
  status: MembershipStatus;
}

export type PlanetShape = "SHAPE1" | "SHAPE2" | "SHAPE3";

export type Role = "OWNER" | "ADMIN" | "MEMBER";

export enum RoleName {
  OWNER = "행성 관리자",
  ADMIN = "부관리자",
  MEMBER = "일반 멤버",
}

export interface CancelLikePlanet {
  planetId: number;
  userId: number;
}
