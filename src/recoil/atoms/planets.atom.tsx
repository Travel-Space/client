import { atom } from "recoil";
import { Planet } from "@/@types";

export const myPlanetsState = atom<Planet[]>({
  key: "myPlanets",
  default: [],
});

export const joinedPlanetsState = atom<Planet[]>({
  key: "joinedPlanets",
  default: [],
});
export const joinedPlanetsCountState = atom<number>({
  key: "joinedPlanetsCount",
  default: 0,
});
