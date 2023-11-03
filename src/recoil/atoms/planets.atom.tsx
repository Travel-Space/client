import { atom } from "recoil";
import { Planet } from "@/@types";

const planetsState = atom<Planet[]>({
  key: "planets",
  default: [],
});

export default planetsState;
