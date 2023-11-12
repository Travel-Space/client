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
  totalCount: number;
  isSuspended: boolean;
}
