import { User } from "./User";
import { Planet } from "./Planet";
import { Like } from "./Like";
import { Comment } from "./Comment";
import { Locations } from "./Locations";

export interface Posting {
  id: number;
  title: string;
  content: string;
  published: boolean;
  authorId: number;
  planetId: number;
  address: string;
  images: Images[];
  locations: Locations[];
  createdAt: Date;
  deletedAt: Date | null;
  author: User;
  planet: Planet;
  likes: Like[];
  comments: Comment[];
  isLiked: boolean;
  hashtags: [];
  totalTopLevelCommentsCount: number;
  monthlyViews: number;
  spaceshipId: number;
  spaceship: { name: String };
  repliesCount: number;
}

interface Images {
  url: string;
}
export interface CancelLikePost {
  articleId: number;
  userId: number;
}
export interface PostingsType {
  data: Posting[];
  page: number;
  limit: number;
  totalCount: number;
}
