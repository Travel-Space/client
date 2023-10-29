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
}

interface Images {
  url: string;
}
