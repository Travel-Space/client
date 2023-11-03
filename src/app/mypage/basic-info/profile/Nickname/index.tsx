import axiosRequest from "@/api/index";
import { ResData, NicknameCheck } from "@/@types/index";

import * as S from "./index.styled";
interface NicknameInputProps {
  nickname: string;
  onChange: (nickname: string) => void;
  isAvailableNickname: boolean;
  setIsAvailableNickname: (value: boolean) => void;
}
//닉네임 변경
export default function NicknameInput({
  nickname,
  onChange,
  isAvailableNickname,
  setIsAvailableNickname,
}: NicknameInputProps) {
  //닉네임 중복확인
  async function checkNickname(nickname: string) {
    try {
      const response = await axiosRequest.requestAxios<ResData<NicknameCheck>>(
        "get",
        `/user/check-nickname?nickname=${nickname}`,
      );
      //   console.log("checkNickname", response.data);
      const isAvailable = response.data.available;
      setIsAvailableNickname(isAvailable);
      if (isAvailable) alert("사용가능한 닉네임입니다.");
      else alert("이미 존재하는 닉네임입니다.");
    } catch (error) {
      alert("닉네임 중복 확인 중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error checking nickname data: ", error);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setIsAvailableNickname(false);
  };
  return (
    <>
      <S.NicknameInput type="text" value={nickname} onChange={handleChange} />
      <S.DoubleCheck onClick={() => checkNickname(nickname)} disabled={isAvailableNickname}>
        중복확인
      </S.DoubleCheck>
    </>
  );
}
