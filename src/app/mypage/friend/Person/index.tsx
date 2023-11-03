import { User } from "@/@types";

import * as S from "./index.styled";

import Image from "next/image";
import FollowBtn from "../FollowBtn";

interface PersonProps {
  data: User;
  isMutual?: boolean;
  page: number;
  limit: number;
}
export default function Person({ data, isMutual, page, limit }: PersonProps) {
  return (
    <S.Container>
      <div>
        <Image src="/assets/img/icons/default-user.svg" alt="planet" width={76} height={76} />
        <S.Info>
          <S.Name>{data.nickName}</S.Name>
          <S.Email>{data.email}</S.Email>
        </S.Info>
      </div>
      <FollowBtn userId={data.id} isMutual={isMutual} page={page} limit={limit} />
    </S.Container>
  );
}
