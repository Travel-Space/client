export interface ModalType {
  onClose: () => void;
}
import { User } from "./User";

interface ResData<D> {
  error: string | null;
  data: D;
}

export type { ResData, User };
