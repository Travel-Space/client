export const ITEM_TYPE = {
  SPACESHIP: "우주선",
  PLANET: "행성",
} as const;

export type ITEM_TYPE = (typeof ITEM_TYPE)[keyof typeof ITEM_TYPE];

export interface Default {
  onClose: () => void;
}
