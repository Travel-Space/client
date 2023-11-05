import { User } from "./User";
import { Planet } from "./Planet";

export interface Spaceship {
  id: number;
  name: string;
  image: string;
  description: string;
  maxMembers: number;
  ownerId: number;
  status: SpaceshipStatus;
  startDate: Date;
  endDate: Date;
  planetId: number;
  createdAt: Date;
  updatedAt: Date;
  planet: Planet;
  members: SpaceshipMember[];
  applications: SpaceshipApplication[];
}

export interface SpaceshipMember {
  id: number;
  spaceshipId: number;
  userId: number;
  joinedAt: Date;
  spaceship: Spaceship;
  user: User;
  role: Role;
}

export interface SpaceshipApplication {
  id: number;
  userId: number;
  spaceshipId: number;
  status: ApplicationStatus;
  appliedAt: Date;
  user: User;
  spaceship: Spaceship;
}

export type SpaceshipStatus = keyof typeof SpaceshipStatusName;

export enum SpaceshipStatusName {
  UPCOMING = "여행 준비",
  ONGOING = "여행 중",
  COMPLETED = "여행 끝",
  CANCELED = "여행 취소",
}

export type ApplicationStatus = "PENDING" | "APPROVED" | "REJECTED";

export type Role = "OWNER" | "MEMBER";
