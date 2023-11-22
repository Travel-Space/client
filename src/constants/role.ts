type ObjType = {
  [index: string]: string;
};

const ROLE: ObjType = {
  OWNER: "관리자",
  ADMIN: "부관리자",
  MEMBER: "일반",
} as const;

export default ROLE;
