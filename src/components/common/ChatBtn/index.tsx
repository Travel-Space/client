import Link from "next/link";
import * as S from "./index.styled";

export default function ChatBtn() {
  return (
    <S.ChatBtnBox>
      <Link href={"/chat"}>
        <img src="/assets/img/icons/chat.svg" />
      </Link>
    </S.ChatBtnBox>
  );
}
