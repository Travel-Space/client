import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { Planet } from "@/@types";

const { persistAtom } = recoilPersist();

const planetsState = atom<Planet[]>({
  key: "planets",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export default planetsState;
