import { User, NicknameCheck } from "./User";
import { Like } from "./Like";
import { Planet, CancelLikePlanet, Planets, LikedPlanets } from "./Planet";
import { Posting, CancelLikePost, Postings } from "./Posting";
import { Comment, Comments } from "./Comment";
import { Follower, Following, Follow } from "./Friend";
import { DailyViewCount, WeeklyViewCount } from "./ViewCount";

interface ResData<D> {
  status: number;
  error: string | null;
  data: D;
}

export type {
  ResData,
  User,
  Posting,
  Postings,
  Like,
  Planet,
  NicknameCheck,
  Comment,
  Follower,
  Following,
  CancelLikePost,
  CancelLikePlanet,
  Planets,
  Follow,
  Comments,
  LikedPlanets,
  DailyViewCount,
  WeeklyViewCount,
};
