import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const localStorage = typeof window !== "undefined" ? window.localStorage : undefined;

const { persistAtom } = recoilPersist({
  key: "recoilPersist",
  storage: localStorage,
});

// 페이지네이션을 포함한 검색된 행성 목록을 위한 atom
export const planetListState = atom({
  key: "planetListState",
  default: {
    planets: [],
    currentPage: 1,
    totalPages: 0,
  },
  effects_UNSTABLE: [persistAtom],
});
