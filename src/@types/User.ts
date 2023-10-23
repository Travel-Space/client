import { Posting } from "./Posting";
import { Like } from "./Like";
import { ChatMembership, Message } from "./Chat";
import { Planet, PlanetBookmark, PlanetMembership } from "./Planet";
import { SpaceshipMember, SpaceshipApplication } from "./Spaceship";
import { UserFriend } from "./Friend";
import { Comment } from "./Comment";

export interface User {
  id: number;
  name: string;
  nickName: string;
  nationality: string;
  email: string;
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
  planetsIn: PlanetMembership[];
  reportsMade: Report[];
  spaceshipMemberships: SpaceshipMember[];
  friendedBy: UserFriend[];
  friends: UserFriend[];
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
enum UserRole {
  "MEMBER",
  "ADMIN",
}
