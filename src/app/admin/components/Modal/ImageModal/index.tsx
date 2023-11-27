import * as S from "./index.styled";

interface ImageModalProps {
  image: string;
  openImage: () => void;
}

export default function ImageModal({ image, openImage }: ImageModalProps) {
  return (
    <S.Container>
      <S.ImageBox>
        <S.CloseButton type="button" onClick={openImage}>
          닫기
        </S.CloseButton>
        <img src={image} />
      </S.ImageBox>
    </S.Container>
  );
}
