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
  author: {
    profileImage: string | null;
    nationality: string;
    nickName: string;
  };
  parent: Comment | null;
  children: Comment[] | null;
  replies: Comment[] | null;
  repliesCount: number;
}

export interface Comments {
  data: Comment[];
  page: number;
  limit: number;
  totalCount: number;
}
