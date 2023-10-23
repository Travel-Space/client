import { User } from "./User";
import { Posting } from "./Posting";

export interface Like {
  userId: number;
  articleId: number;
  article: Posting;
  user: User;
}
