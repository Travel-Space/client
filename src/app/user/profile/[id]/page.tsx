import * as S from "./page.styled";

import ProfileSummary from "@/app/user/profile/ProfileSummary";
import Contents from "./Contents";

interface ProfileParams {
  id: string;
}

export async function generateMetadata({ params }: { params: ProfileParams }) {
  const url = `https://travelspace.world/api/user/other/${params.id}`;
  const user = await fetch(url).then(res => res.json());

  return {
    title: `${user.nickname} (${user.email}) / Travel Space`,
    description: `${user.nickname} (${user.email}) 프로필`,
    openGraph: {
      title: `${user.nickname} (${user.email}) / Travel Space`,
      description: `${user.nickname} (${user.email}) 프로필`,
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

export default async function Profile({ params }: { params: ProfileParams }) {
  const userId = Number(params.id);

  return (
    <S.Container>
      <ProfileSummary id={userId} />
      <Contents id={userId} />
    </S.Container>
  );
}
