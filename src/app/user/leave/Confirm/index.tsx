import axiosRequest from "@/api";
import { ResData, DailyViewCount } from "@/@types";

import { useState } from "react";
import { useRouter } from "next/navigation";

import * as S from "./index.styled";

import Button from "@/components/common/Button";
import Checkbox from "../Checkbox";
import MESSAGE from "@/constants/message";

const Confirm = () => {
  const router = useRouter();

  const [checked, setChecked] = useState(false);

  const handleClickCheckbox = () => {
    setChecked(!checked);
  };

  const goToMyProfile = () => {
    router.push("/mypage/basic-info/profile/");
  };
  const handleClickLeaveBtn = () => {
    !checked ? alert("내용에 동의해주세요.") : leaveService();
  };

  //회원 탈퇴
  async function leaveService() {
    try {
      const response = await axiosRequest.requestAxios<ResData<DailyViewCount[]>>("delete", `/user/${user.id}`);
      // console.log("viewcount", response.data);
    } catch (error) {
      console.error("회원을 탈퇴하는 중 오류가 발생했습니다.", error);
      alert(MESSAGE.ERROR.DEFAULT);
    }
  }
  return (
    <S.Confirm>
      <S.Check>
        <button onClick={handleClickCheckbox}>
          <Checkbox color={checked ? "#40a0fb" : "#d9d9d9"} />
        </button>
        <span>트레블 스페이스 회원 탈퇴 안내를 읽고 확인했으며, 내용에 동의합니다.</span>
      </S.Check>
      <S.Buttons>
        <S.Button>
          <Button variant="reverse" shape="medium" size="smallWithSmFont" onClick={goToMyProfile}>
            취소
          </Button>
        </S.Button>
        <S.LeaveButton>
          <Button variant="confirm" shape="medium" size="smallWithSmFont" onClick={handleClickLeaveBtn}>
            회원 탈퇴하기
          </Button>
        </S.LeaveButton>
      </S.Buttons>
    </S.Confirm>
  );
};
export default Confirm;
