import { User } from "@/@types";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/recoil/atoms/user.atom";

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
  const user = useRecoilValue(userAtom);

  return (
    <S.Container>
      <div>
        <Image src={data.profileImage || defaultImage} alt="profileImage" width={76} height={76} />
        <S.Info>
          <S.Name>{data.nickName}</S.Name>
          <S.Email>{data.email}</S.Email>
        </S.Info>
      </div>
      {user?.id !== data.id && <FollowBtn userId={data.id} isMutual={isMutual} updateData={updateData} />}
    </S.Container>
  );
}
