export interface Notification {
  id: number;
  content: string;
  createdAt: Date;
  type: string;
  articleId?: number;
  planetId?: number;
  invitationId?: number;
  requestUserId?: number;
}
