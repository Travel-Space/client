import Radio from "../Radio";
import * as S from "./index.styled";

export default function Title() {
  return (
    <S.Wrap>
      <S.FlexBox>
        <S.Header>
          <img src="/assets/img/icons/create-plus.svg" alt="" />
          <h1>새 행성 만들기</h1>
        </S.Header>
        {/* <S.Header>
        <img src="/assets/img/icons/create-pencil.svg" alt="" />
        <h1>행성 관리</h1>
      </S.Header> */}
        <S.RadioBox>
          <Radio value="public" id="public" name="planet-type" className="checked" defaultChecked>
            공개
          </Radio>
          <Radio value="private" id="private" name="planet-type">
            비공개
          </Radio>
        </S.RadioBox>
      </S.FlexBox>
      <S.Line />
      <S.Description>소중한 추억으로 기록될 우리만의 여행 블로그를 시작해보세요!</S.Description>
    </S.Wrap>
  );
}
