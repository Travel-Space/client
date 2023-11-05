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

export const todayViewCountState = atom<number>({
  key: "todayViewCount",
  default: 0,
});
