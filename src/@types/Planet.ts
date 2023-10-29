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
  shape: PlanetShape;
  hashtags: string[];
  deletedAt: Date;
  articles: Posting[];
  owner: User;
  planetBookMark: PlanetBookmark[];
  members: PlanetMembership[];
  spaceships: Spaceship[];
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
  role: Role;
  status: MembershipStatus;
}

export type PlanetShape = "SHAPE1" | "SHAPE2" | "SHAPE3";

export type Role = "OWNER" | "ADMIN" | "MEMBER";
