import { Reporter } from "./Reporter";

export interface Report {
  createdAt: Date;
  deletedAt: Date | null;
  id: number;
  reason?: string;
  imageUrl?: string;
  reporter: Reporter[];
  reporterId: number;
  status: "RECEIVED" | "APPROVED" | "REJECTED";
  targetId: number;
  targetType: "ARTICLE" | "COMMENT" | "MESSAGE";
  reports: Report[];
  isSuspended: boolean;
  // 리팩토링 해야함
  suspensionEndDate: Date;
  targetDetails: {
    author: { nickName: String; email: String; reportCount: number };
    planetId: number;
    id: number;
  };
  reportDetails: {
    id: number;
    targetType: string;
    reporterName: string;
    createdAt: Date;
    planetId: number;
    reason: string;
    status: string;
    approvalReason: string;
    processingDate: Date;
    imageUrl: string;
  };
  totalCount: number;
}
