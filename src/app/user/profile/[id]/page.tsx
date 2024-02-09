import { User } from "@/@types";

import * as S from "./page.styled";

import { getUserServer } from "@/app/user/profile/[id]/_lib/getUserServer";
import ProfileSummary from "@/app/user/profile/ProfileSummary";
import Contents from "./Contents";

interface ProfileParams {
  id: string;
}
export async function generateMetadata({ params }: { params: ProfileParams }) {
  const user: User = await getUserServer({ queryKey: ["users", params.id] });

  return {
    title: `${user.nickName} (${user.email}) / Travel Space`,
    description: `${user.nickName} (${user.email}) 프로필`,
    openGraph: {
      title: `${user.nickName} (${user.email}) / Travel Space`,
      description: `${user.nickName} (${user.email}) 프로필`,
      images: [
        {
          url: user.profileImage,
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
