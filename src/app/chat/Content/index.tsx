import * as S from "./index.styled";

export default function ChatContent() {
  return (
    <S.ContentBox>
      <div>
        <S.TopBox>
          <div />

          <div>
            <span>일본 도쿄 여행 </span>
            <span>6/100</span>
          </div>

          <img src="/assets/img/icons/person.svg" />
        </S.TopBox>
        <S.Line />
      </div>

      <div>
        <span>chatting content</span>
      </div>

      <div>
        <S.Line />

        <S.BottomBox>
          <div>
            <S.Image src="/assets/img/icons/gallery.svg" />
          </div>
          <div>
            <S.Input />
          </div>
          <div>
            <S.Button>보내기</S.Button>
          </div>
        </S.BottomBox>
      </div>
    </S.ContentBox>
  );
}
