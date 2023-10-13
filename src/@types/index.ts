export interface ModalType {
  onClose: () => void;
}

export interface InputAttr {
  value: string;
  name: string;
  id: string;
  children?: React.ReactNode;
  defaultChecked?: boolean;
  checked?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
