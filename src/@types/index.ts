import { User } from "./User";
import { Planet } from "./Planet";

interface ResData<D> {
  error: string | null;
  data: D;
}

export type { ResData, User, Planet };
