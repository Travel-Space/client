import AdminModalContainer from "../Modal/AdminModalContainer";
import * as S from "./index.styled";

interface TabProps {
  setIsSelected: (selected: { name: boolean; processingDetails: boolean }) => void;
  isSelected: { name: boolean; processingDetails: boolean };
}

export default function Tab({ setIsSelected, isSelected }: TabProps) {
  return (
    <S.TabContainer>
      <S.Item onClick={() => setIsSelected({ name: true, processingDetails: false })} selected={isSelected.name}>
        <p>신고 내용</p>
      </S.Item>
      <S.Item
        onClick={() => setIsSelected({ name: false, processingDetails: true })}
        selected={isSelected.processingDetails}
      >
        <p>처리 내용</p>
      </S.Item>
    </S.TabContainer>
  );
}
