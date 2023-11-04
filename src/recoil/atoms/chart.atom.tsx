import { atom } from "recoil";

export const selectedDateState = atom<string>({
  key: "selectedDate",
  default: "",
});
