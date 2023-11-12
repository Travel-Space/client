import { Posting } from "./Posting";
import { Like } from "./Like";
import { ChatMembership, Message } from "./Chat";
import { Planet, PlanetBookmark, PlanetMembership, Role } from "./Planet";
import { SpaceshipMember, SpaceshipApplication } from "./Spaceship";
import { UserFriend } from "./Friend";
import { Comment } from "./Comment";

export interface CountryInfo {
  country_eng_nm: string;
  country_nm: string;
  download_url: string;
}

export interface CommonUserInfo {
  email: string;
  nickName: string;
  profileImage: string;
  role?: Role;
  userId: number;
  invited?: boolean;
}

export interface User {
  id: number;
  name: string;
  nickName: string;
  nationality: string;
  nationImage: string;
  email: string;
  code: string;
  createdAt: Date;
  oauthId: string | null;
  password: string;
  profileImage: string;
  applications: SpaceshipApplication[];
  provider: SocialProvider;
  status: UserStatus;
  role: UserRole;
  deletedAt: Date | null;
  posts: Posting[];
  chatMemberships: ChatMembership[];
  comments: Comment[];
  likedArticles: Like[];
  sentMessages: Message[];
  notifications: Notification[];
  ownedPlanet: Planet[];
  planetBookMark: PlanetBookmark[];
  planetsMembership: PlanetMembership[];
  reportsMade: Report[];
  spaceshipMemberships: SpaceshipMember[];
  friendedBy: UserFriend[];
  friends: UserFriend[];
  reportCount?: number | string;
  isFollowing: boolean;
  invited: boolean;
}

enum SocialProvider {
  "GOOGLE",
  "NAVER",
  "KAKAO",
  "LOCAL",
}
enum UserStatus {
  "ACTIVE",
  "SUSPENDED",
}
export type UserRole = "MEMBER" | "ADMIN";

export interface NicknameCheck {
  available: boolean;
}

export interface UsersType {
  data: User[];
  total: number;
  page: number;
  limit: number;
}
