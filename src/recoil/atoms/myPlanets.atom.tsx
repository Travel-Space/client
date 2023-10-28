import { atom } from "recoil";
import { Planet } from "@/@types";

const myPlanetsState = atom<Planet[]>({
  key: "myPostings",
  default: [],
});

export default myPlanetsState;
