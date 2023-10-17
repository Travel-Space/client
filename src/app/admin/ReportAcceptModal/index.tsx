import AdminModalContainer from "../AdminModalContainer";
import Textarea from "@/components/common/Textarea";

import * as S from "./index.styled";

export default function ReportAcceptModal() {
  return (
    <AdminModalContainer title="신고 요청 수락">
      <S.Content>
        <ul>
          {/* 컴포넌트 분리 */}
          <S.TitleList>
            <S.TitleContent>
              <S.Circle>
                <p>1</p>
              </S.Circle>
              <S.TitleText>신고 받은 유저 정보</S.TitleText>
            </S.TitleContent>
            <S.UserInfoBox>
              <div>
                <p>
                  <span>닉네임</span>현규현규
                </p>
                <p>
                  <span>이메일</span>test@naver.com
                </p>
                <p>
                  <span>계정 상태</span>신고 2회
                </p>
              </div>
            </S.UserInfoBox>
          </S.TitleList>

          <S.TitleList>
            <S.TitleContent>
              <S.Circle>
                <p>2</p>
              </S.Circle>
              <S.TitleText>요청 수락 사유</S.TitleText>
            </S.TitleContent>
          </S.TitleList>
        </ul>

        {/* select 컴포넌트 */}

        {/* textarea 컴포넌트 */}
        <S.TextareaContainer>
          <Textarea
            size="admin"
            placeholder="사유를 작성해 주세요. 작성한 사유는 유저에게 알림으로 전송됩니다."
            name="adminComments"
            maxLength={200}
          />
        </S.TextareaContainer>

        <S.Button>완료</S.Button>
      </S.Content>
    </AdminModalContainer>
  );
}
