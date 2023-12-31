type ObjType = {
  [index: number]: string;
};

const WEEKDAY: ObjType = {
  0: "일",
  1: "월",
  2: "화",
  3: "수",
  4: "목",
  5: "금",
  6: "토",
} as const;
export default WEEKDAY;
