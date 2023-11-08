import { User } from "@/@types";

import * as S from "./index.styled";

import Image from "next/image";
import FollowBtn from "../FollowBtn";

interface PersonProps {
  data: User;
  isMutual?: boolean;
  updateData: () => void;
}
export default function Person({ data, isMutual, updateData }: PersonProps) {
  const defaultImage = "/assets/img/icons/default-user.svg";

  return (
    <S.Container>
      <div>
        <Image src={data.profileImage || defaultImage} alt="profileImage" width={76} height={76} />
        <S.Info>
          <S.Name>{data.nickName}</S.Name>
          <S.Email>{data.email}</S.Email>
        </S.Info>
      </div>
      <FollowBtn userId={data.id} isMutual={isMutual} updateData={updateData} />
    </S.Container>
  );
}
