import { atom, selector } from "recoil";
import { Posting } from "@/@types";

const myPostingsState = atom<Posting[]>({
  key: "myPostings",
  default: [],
});

export const postsExceptDeleteState = selector({
  key: "postsExceptDelete",
  get: ({ get }) => {
    const postings = get(myPostingsState);
    const result = postings.filter(item => item.deletedAt === null);

    return result;
  },
});

export default myPostingsState;
