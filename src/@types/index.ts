import { User, NicknameCheck } from "./User";
import { Like } from "./Like";
import { Planet, CancelLikePlanet, PlanetsType, LikedPlanets, JoinedPlanets } from "./Planet";
import { Posting, CancelLikePost, PostingsType } from "./Posting";
import { Comment, Comments } from "./Comment";
import { Follower, Following, Follow, FollowingsType, FollowersType } from "./Friend";
import { DailyViewCount, WeeklyViewCount } from "./ViewCount";
import { SearchItem } from "./Search";

interface ResData<D> {
  status: number;
  error: string | null;
  data: D;
}

export type {
  ResData,
  User,
  Posting,
  PostingsType,
  Like,
  Planet,
  NicknameCheck,
  Comment,
  Follower,
  Following,
  CancelLikePost,
  CancelLikePlanet,
  PlanetsType,
  Follow,
  Comments,
  LikedPlanets,
  DailyViewCount,
  WeeklyViewCount,
  FollowingsType,
  FollowersType,
  JoinedPlanets,
  SearchItem,
};
