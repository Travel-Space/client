import AdminModalContainer from "../AdminModalContainer";
import * as S from "./index.styled";

interface TabProps {
  isActive: boolean;
  onClick: () => void;
}

export default function Tab() {
  return (
    <S.TabContainer>
      <S.Item>
        <p>신고 내용</p>
      </S.Item>
      <S.Item>
        <p>처리 내용</p>
      </S.Item>
    </S.TabContainer>
  );
}
