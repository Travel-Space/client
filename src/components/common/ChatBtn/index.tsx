"use client";

import Link from "next/link";

import * as S from "./index.styled";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/recoil/atoms/user.atom";

export default function ChatBtn() {
  const { isAuth } = useRecoilValue(userAtom);

  return (
    <>
      {isAuth && (
        <S.ChatBtnBox>
          <Link href={"/chat"}>
            <img src="/assets/img/icons/chat.svg" />
          </Link>
        </S.ChatBtnBox>
      )}
    </>
  );
}
