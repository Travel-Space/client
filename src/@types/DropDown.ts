export interface Menu {
  logo?: React.ReactNode;
  comment?: string;
  menuList: string[];
  selectedMenu: string;
  handleClick: (menu: string) => void;
}
