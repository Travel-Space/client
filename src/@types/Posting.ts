import { User } from "./User";
import { Planet } from "./Planet";
import { Like } from "./Like";

export interface Posting {
  id: number;
  title: string;
  content: string;
  published: boolean;
  authorId: number;
  planetId: number;
  createdAt: Date;
  deletedAt: Date | null;
  author: User;
  planet: Planet;
  likes: Like[];
  comments: Comment[];
}
