import * as S from "./index.styled";

export default function AdminModalContainer({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <S.ModalBackgroundContainer>
      <S.AdminModal>
        <S.TitleContainer>
          <p>{title}</p>
          <S.CloseButton type="button">닫기</S.CloseButton>
        </S.TitleContainer>

        <S.Content>{children}</S.Content>
      </S.AdminModal>
    </S.ModalBackgroundContainer>
  );
}
