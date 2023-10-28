import { User } from "./User";
import { Planet } from "./Planet";
import { Posting } from "./Posting";

interface ResData<D> {
  error: string | null;
  data: D;
}

export type { ResData, User, Planet, Posting };
