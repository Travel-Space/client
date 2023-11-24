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
    nationImage: string;
    nickName: string;
  };
  parent: Comment | null;
  children: Comment[] | null;
  replies: Comment[] | null;
  repliesCount: number;
  _count?: {
    children: number;
  };

  childCommentCount?: number;
}

export interface Comments {
  data: Comment[];
  page: number;
  limit: number;
  totalCount: number;
  _count?: {
    children: number;
  };

  childCommentCount?: number;
}
