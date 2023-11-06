import * as S from "./index.styled";

import LEAVEINFO from "@/constants/leave";

const PrivacyNotice = () => {
  return (
    <S.Notice>
      <S.Title>회원 정보 보존 안내 사항</S.Title>
      <S.NoticeContent>
        <S.Privacy>
          {LEAVEINFO.PRIVACY.map((text, idx) => (
            <div key={`privacyInfo${idx}`}>{text}</div>
          ))}
        </S.Privacy>
        <S.Period>
          {LEAVEINFO.PERIOD.map((text, idx) => (
            <li key={`pefiodInfo${idx}`}>{text}</li>
          ))}
        </S.Period>
      </S.NoticeContent>
    </S.Notice>
  );
};
export default PrivacyNotice;
