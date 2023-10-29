import { atom } from "recoil";
import { Comment } from "@/@types";

const myCommentsState = atom<Comment[]>({
  key: "myComments",
  default: [],
});

export default myCommentsState;
