import { Reporter } from "./Reporter";

// 데이터 호출 형태 때문에 임시로 작성했습니다!
export interface ResData<D> {
  status: number;
  error: string | null;
  data: {
    reports: D;
  };
}

export interface Report {
  createdAt: Date;
  deletedAt: Date | null;
  id: number;
  reason?: string;
  imageUrl?: string;
  reporter: Reporter[];
  reporterId: number;
  status: "RECEIVED" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";
  targetId: number;
  targetType: "USER" | "ARTICLE" | "COMMENT" | "MESSAGE";
}
