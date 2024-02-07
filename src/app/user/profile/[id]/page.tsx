import axiosRequest from "@/api/index";
import { ResData, User } from "@/@types";

import * as S from "./page.styled";

import ProfileSummary from "@/app/user/profile/ProfileSummary";
import Contents from "./Contents";

import MESSAGE from "@/constants/message";

interface ProfileParams {
  id: number;
}

export async function generateMetadata({ params }: { params: ProfileParams }) {
  const userId = Number(params.id);

  //프로필 조회
  const getUserProfile = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<User>>("get", `/user/other/${userId}`);
      const profile = response.data;
      return profile;

      // console.log("profile", profile);
    } catch (error) {
      console.error("프로필 정보를 가져오는 중 에러가 발생했습니다.", error);
      alert(MESSAGE.ERROR.DEFAULT);
    }
  };

  const user = await getUserProfile();
  if (!user) return null;
  return {
    title: `${user.nickName} (${user.id}) / Travel Space`,
    description: `${user.nickName} (${user.id}) 프로필`,
    openGraph: {
      title: `${user.nickName} (${user.id}) / Z`,
      description: `${user.nickName} (${user.id}) 프로필`,
      images: [
        {
          url: `${user.profileImage}`,
          width: 400,
          height: 400,
        },
      ],
    },
  };
}

export default function Profile({ params }: { params: ProfileParams }) {
  const userId = Number(params.id);

  return (
    <S.Container>
      <ProfileSummary id={userId} />
      <Contents id={userId} />
    </S.Container>
  );
}
