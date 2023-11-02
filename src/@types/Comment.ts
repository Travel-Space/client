import { User } from "./User";
import { Posting } from "./Posting";

export interface Comment {
  id: number;
  content: string;
  authorId: number;
  articleId: number;
  parentId: number | null;
  createdAt: Date;
  article: Posting;
  author: User;
  parent: Comment | null;
  children: Comment[] | null;
  replies: Comment[] | null;
}

export interface Comments {
  data: Comment[];
  page: number;
  limit: number;
  totalCount: number;
}
