import Message from "./Message";

import * as S from "./index.styled";
import Line from "@/components/common/Line";

export default function Content() {
  return (
    <S.ContentBox>
      <S.Wrapper>
        <S.Top>
          <div />
          <S.Title>
            제목이 들어간다 제목이 들어간다 <strong>6/100</strong>
          </S.Title>
          <S.PplImage src="/assets/img/icons/person.svg" />
        </S.Top>

        <Line />
      </S.Wrapper>
      <Message />

      <S.Wrapper>
        <Line />

        <S.Bottom>
          <S.GalleryImage src="/assets/img/icons/gallery.svg" />
          <S.Input />
          <S.Button>보내기</S.Button>
        </S.Bottom>
      </S.Wrapper>
    </S.ContentBox>
  );
}
