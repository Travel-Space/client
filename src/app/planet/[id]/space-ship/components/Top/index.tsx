import Button from "@/components/common/Button";
import * as S from "../index.styled";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { SpaceshipContext, SpaceshipContextType } from "..";

export default function SpaceshipTop() {
  const { planetData } = useContext<SpaceshipContextType>(SpaceshipContext);
  const router = useRouter();

  return (
    <S.Header>
      <Button variant="basic" size="normal" shape="large" onClick={() => router.back()}>
        <img src="/assets/img/icons/prev-white.svg" height={16} />
      </Button>
      <S.Title>{planetData.name}</S.Title>
      <Button variant="basic" size="normal" shape="large">
        <S.CenterGroup>
          <span>탑승 링크</span>
          <img src="/assets/img/icons/share-white.svg" height={16} />
        </S.CenterGroup>
      </Button>
    </S.Header>
  );
}
