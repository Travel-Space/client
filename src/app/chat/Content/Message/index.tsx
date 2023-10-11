import * as S from "./index.styled";

export default function Message() {
  return (
    <S.Body>
      {/* 날짜가 변경될 때마다 표시되어야 할 선 */}

      <S.MessageBox>
        {/* 내가 보낸 메시지 */}
        <MyMessage />
        <MyMessage />
        <MyMessage />
        <MyMessage />
        <MyMessage />
        <MyMessage />
        <PhotoMessage />

        {/* 남이 보낸 메시지 */}
        <SomeoneMessage />
        <SomeoneMessage />
      </S.MessageBox>
    </S.Body>
  );
}

const PhotoMessage = () => {
  return (
    <S.PhotoMessage message={"photo"}>
      <S.Intro>
        <div>23:23</div>
        <S.Images>
          <img src="/assets/img/background/background-3.png" />
        </S.Images>
      </S.Intro>
      <div>
        <S.Image src="/assets/img/icons/profileImage.png" />
      </div>
    </S.PhotoMessage>
  );
};

const MyMessage = () => {
  return (
    <S.Message message={"my"}>
      <S.Intro>
        <div>23:23</div>
        <S.TextContent>야 오늘 일본 날씨 대박이더라</S.TextContent>
      </S.Intro>
      <div>
        <S.Image src="/assets/img/icons/profileImage.png" />
      </div>
    </S.Message>
  );
};

const SomeoneMessage = () => {
  return (
    <S.Message message={"someone"}>
      <div>
        <S.Image src="/assets/img/icons/profileImage.png" />
      </div>
      <S.Info>
        <S.Nickname>닉네임이 들어갈 자리</S.Nickname>
        <S.Intro>
          <S.TextContent>그니까 오늘 일본 날씨 미쳤더라 또 가고 싶네</S.TextContent>
          <div>23:24</div>
        </S.Intro>
      </S.Info>
    </S.Message>
  );
};
