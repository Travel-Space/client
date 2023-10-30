export interface Reporter {
  createdAt: string;
  deletedAt: string | null;
  email: string;
  id: number;
  name: string;
  nationality: string;
  nickName: string;
  oauthId: string | null;
  password: string;
  profileImage: string | null;
  provider: string;
  reportCount: number;
  role: string;
  status: string;
}
