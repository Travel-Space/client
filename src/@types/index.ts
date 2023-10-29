import { User, NicknameCheck } from "./User";
import { Like } from "./Like";
import { Planet } from "./Planet";
import { Posting } from "./Posting";
import { Comment } from "./Comment";

interface ResData<D> {
  status: number;
  error: string | null;
  data: D;
}

export type { ResData, User, Posting, Like, Planet, NicknameCheck, Comment };
