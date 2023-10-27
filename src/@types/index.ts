import { User } from "./User";

interface ResData<D> {
  status: number;
  error: string | null;
  data: D;
}

export type { ResData, User };
