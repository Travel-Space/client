import * as S from "./page.styled";

import ProfileSummary from "@/app/user/profile/ProfileSummary";
import Contents from "./Contents";

interface ProfileParams {
  id: string;
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
