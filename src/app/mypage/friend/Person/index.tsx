import { User } from "@/@types";

import { useRecoilValue } from "recoil";
import { userAtom } from "@/recoil/atoms/user.atom";
import { useRouter } from "next/navigation";

import * as S from "./index.styled";

import Image from "next/image";
import FollowBtn from "../FollowBtn";

interface PersonProps {
  data: User;
  isMutual?: boolean;
  updateData: () => void;
}
const Person = ({ data, isMutual, updateData }: PersonProps) => {
  const defaultImage = "/assets/img/icons/default-user.svg";
  const user = useRecoilValue(userAtom);

  const router = useRouter();

  const goToProfile = () => {
    router.push(`/user/profile/${data.id}`);
  };

  return (
    <S.Container>
      <S.Profile onClick={goToProfile}>
        <Image src={data.profileImage || defaultImage} alt="profileImage" width={76} height={76} />
        <S.Info>
          <S.Name>{data.nickName}</S.Name>
          <S.Email>{data.email}</S.Email>
        </S.Info>
      </S.Profile>
      {user?.id !== data.id && <FollowBtn userId={data.id} isMutual={isMutual} updateData={updateData} />}
    </S.Container>
  );
};

export default Person;
