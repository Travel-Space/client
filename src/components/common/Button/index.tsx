import * as S from "./index.styled";

interface ButtonProps {
  variant: "confirm" | "reverse" | "basic" | "gradient" | "error" | "white" | "cancel";
  shape: "small" | "medium" | "large" | "extraLarge";
  size: "smallWithXsFont" | "smallWithSmFont" | "smallWithMdFont" | "normal" | "medium" | "big";
  disabled?: boolean;
  fontWeight?: "bold";
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({ variant, shape, size, disabled, fontWeight, children, onClick }: ButtonProps) {
  return (
    <S.Button disabled={disabled} variant={variant} shape={shape} size={size} fontWeight={fontWeight} onClick={onClick}>
      {children}
    </S.Button>
  );
}

// 사용 예시

/*

import Button from "@/components/common/Button";

 <Button variant="basic" shape="small" size="smallWithXsFont" onClick={onClickFunc} fontWeight="big">
   완료 (버튼에 들어가는 텍스트)
 </Button>

variant : 배경 색상과 폰트 색상
shape : border-radius
size : 상하 padding 값 기준으로 크기 정의 폰트 사이즈 
        => width 크기가 달라서 (좌우 패딩값이 컴포넌트마다 달라서) 넓이는 100%로 했습니다. 
        => 부모 요소 div 로 하나 감싸서 width값 정의해주면 됩니다!
fontWeight : 설정 안 하면 기본값 400 입니다. bold 설정하면 700입니다.
onClick : 버튼 클릭했을 때 실행 시킬 함수 넣어주시면 됩니다.
*/
