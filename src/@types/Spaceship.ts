import { User } from "./User";
import { Planet } from "./Planet";

export interface Spaceship {
  id: number;
  name: string;
  image: string;
  description: string;
  maxMembers: number;
  ownerId: number;
  status: SPACESHIP_STATUS;
  startDate: Date;
  endDate: Date;
  planetId: number;
  createdAt: Date;
  updatedAt: Date;
  planet: Planet;
  members: SpaceshipMember[];
  applications: SpaceshipApplication[];
  spaceship: String;
}

export interface SpaceshipMember {
  id: number;
  spaceshipId: number;
  userId: number;
  joinedAt: Date;
  spaceship: Spaceship;
  user: User;
  role: SPACESHIP_ROLE;
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

export const SPACESHIP_STATUS = {
  UPCOMING: "여행 준비",
  ONGOING: "여행 중",
  COMPLETED: "여행 끝",
  CANCELED: "여행 취소",
} as const;

export const SPACESHIP_STATUS_NAME = {
  UPCOMING: "UPCOMING",
  ONGOING: "ONGOING",
  COMPLETED: "COMPLETED",
  CANCELED: "CANCELED",
} as const;

export type SPACESHIP_STATUS = keyof typeof SPACESHIP_STATUS;

export type ApplicationStatus = "PENDING" | "APPROVED" | "REJECTED";

export const SPACESHIP_ROLE = {
  OWNER: "우주선 방장",
  MEMBER: "일반",
} as const;

export type SPACESHIP_ROLE = keyof typeof SPACESHIP_ROLE;

export interface PlanetDataType {
  name: string;
  memberLimit: number;
  spaceshipLimit: number;
  ownerId: number;
}
