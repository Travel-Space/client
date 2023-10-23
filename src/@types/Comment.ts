import { User } from "./User";
import { Posting } from "./Posting";

export default interface Comment {
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
}