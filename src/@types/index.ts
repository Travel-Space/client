import { User } from "./User";
import { Posting } from "./Posting";
import { Like } from "./Like";
interface ResData<D> {
  status: number;
  error: string | null;
  data: D;
}

export type { ResData, User, Posting, Like };
