import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../recoil/atoms/modal.atom";

type OpenModalType = {
  title: string;
  content: JSX.Element;
  callback?: () => any;
};

export function useModal() {
  const [modalDataState, setModalDataState] = useRecoilState(modalState);

  const closeModal = useCallback(
    () =>
      setModalDataState(prev => {
        return { ...prev, isOpen: false };
      }),
    [setModalDataState],
  );

  const openModal = useCallback(
    ({ title, content, callback }: OpenModalType) =>
      setModalDataState({
        isOpen: true,
        title: title,
        content: content,
        callBack: callback,
      }),
    [setModalDataState],
  );

  return { modalDataState, closeModal, openModal };
}
