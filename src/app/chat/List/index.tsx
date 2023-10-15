import * as S from "./index.styled";

export default function List() {
  return (
    <S.ListBox>
      <S.ChatRoomImg>
        <img src="/assets/img/icons/profile.svg" />
      </S.ChatRoomImg>

      <S.ChatRoom>
        <S.ChatRoomTitle>
          <span>행성 : 일본 도쿄</span>
          <img src="/assets/img/icons/new-chat.svg" />
        </S.ChatRoomTitle>

        <S.ChatPreview>
          <span>메시지 뜨는 칸 메시지 뜨는 칸 메시지 뜨는 칸 메시지 뜨는 칸</span>
        </S.ChatPreview>
      </S.ChatRoom>
    </S.ListBox>
  );
}
