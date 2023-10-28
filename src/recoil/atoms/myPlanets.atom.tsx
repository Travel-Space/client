import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { Planet } from "@/@types";

const { persistAtom } = recoilPersist();

const myPlanetsState = atom<Planet[]>({
  key: "myPlanets",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export default myPlanetsState;
