import axiosRequest from "@/api/index";
import { ResData, NicknameCheck } from "@/@types/index";

import { useRecoilValue } from "recoil";
import { profileState } from "@/recoil/atoms/user.atom";

import * as S from "./index.styled";

import MESSAGE from "@/constants/message";

interface NicknameInputProps {
  nickname: string;
  onChange: (nickname: string) => void;
  isAvailableNickname: boolean;
  setIsAvailableNickname: (value: boolean) => void;
}
//닉네임 변경
const NicknameInput = ({ nickname, onChange, isAvailableNickname, setIsAvailableNickname }: NicknameInputProps) => {
  const profile = useRecoilValue(profileState);

  //닉네임 중복 확인
  const checkNickname = async (nickname: string) => {
    try {
      const response = await axiosRequest.requestAxios<ResData<NicknameCheck>>(
        "get",
        `/user/check-nickname?nickname=${nickname}`,
      );
      //   console.log("checkNickname", response.data);
      const isAvailable = response.data.available;
      setIsAvailableNickname(isAvailable);
      if (isAvailable) alert("사용 가능한 닉네임입니다.");
      else alert("이미 존재하는 닉네임입니다.");
    } catch (error) {
      console.error("닉네임 중복 확인 중 에러가 발생했습니다.", error);
      alert(MESSAGE.ERROR.DEFAULT);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    if (e.target.value !== profile?.nickName) {
      setIsAvailableNickname(false);
    } else {
      setIsAvailableNickname(true);
    }
    // console.log(isAvailableNickname, "isAvailableNickname");
  };

  return (
    <>
      <S.NicknameInput type="text" value={nickname} onChange={handleChange} />
      <S.DoubleCheck onClick={() => checkNickname(nickname)} disabled={isAvailableNickname}>
        중복 확인
      </S.DoubleCheck>
    </>
  );
};

export default NicknameInput;
