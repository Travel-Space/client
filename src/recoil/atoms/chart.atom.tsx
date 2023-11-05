import { atom } from "recoil";

export const selectedDateState = atom<string>({
  key: "selectedDate",
  default: "",
});

export const selectedWeekState = atom<string>({
  key: "selectedWeek",
  default: "",
});
