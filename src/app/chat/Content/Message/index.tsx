import * as S from "./index.styled";

export default function Message() {
  return (
    <div>
      {/* 날짜가 변경될 때마다 표시되어야 할 선 */}

      {/* 내가 보낸 메시지 */}
      <MyMessage />

      {/* 남이 보낸 메시지 */}
      <SomeoneMessage />
    </div>
  );
}

const MyMessage = () => {
  return (
    <S.Message>
      <div>
        <div>
          <span>야 오늘 일본 날씨 대박이더라</span>
        </div>
        <div>23:23</div>
      </div>
      <div>
        <S.Image src="/assets/img/icons/profileImage.png" />
      </div>
    </S.Message>
  );
};

const SomeoneMessage = () => {
  return (
    <S.Message>
      <div>
        <S.Image src="/assets/img/icons/profileImage.png" />
      </div>
      <div>
        <div>닉네임이들어갈자리</div>
        <div>
          <div>그니까 오늘 일본 날씨 미쳤더라 또 가고 싶네</div>
          <div>23:24</div>
        </div>
      </div>
    </S.Message>
  );
};
