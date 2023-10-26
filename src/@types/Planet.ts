import { User } from "./User";
import { MembershipStatus } from "./Member";
import { Posting } from "./Posting";
import { Spaceship } from "./Spaceship";

export interface Planet {
  id: number;
  name: string;
  description: string | null;
  ownerId: number;
  memberLimit: number;
  published: boolean;
  isActive: boolean;
  shape: PlanetShape;
  hashtags: string[] | null;
  deletedAt: Date | null;
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
  administrator: boolean;
  status: MembershipStatus;
  planet: Planet;
  user: User;
}

export type PlanetShape = "SHAPE1" | "SHAPE2" | "SHAPE3";
