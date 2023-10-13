import Line from "@/components/common/Line";
import * as S from "./index.styled";

export default function Modal() {
  return (
    <S.ModalBox>
      <div>내가 들어갈 자리</div>
      <div>
        <div>
          <img />
          <span></span>
        </div>

        <Line />
      </div>
    </S.ModalBox>
  );
}
