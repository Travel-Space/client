import * as S from "./index.styled";

interface modalContainerProps {
  title: string;
  closeModal: () => void;
  children: React.ReactNode;
}

export default function AdminModalContainer({ title, closeModal, children }: modalContainerProps) {
  return (
    <>
      <S.ModalBackgroundContainer>
        <S.AdminModal>
          <S.TitleContainer>
            <p>{title}</p>
            <S.CloseButton type="button" onClick={closeModal}>
              닫기
            </S.CloseButton>
          </S.TitleContainer>

          <S.Content>{children}</S.Content>
        </S.AdminModal>
      </S.ModalBackgroundContainer>
    </>
  );
}
