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

export type SpaceshipStatus = "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELED";

export type ApplicationStatus = "PENDING" | "APPROVED" | "REJECTED";

export type Role = "OWNER" | "MEMBER";
