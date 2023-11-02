import { atom } from "recoil";
import { Posting } from "@/@types";

const myPostingsState = atom<Posting[]>({
  key: "myPostings",
  default: [],
});

export default myPostingsState;
