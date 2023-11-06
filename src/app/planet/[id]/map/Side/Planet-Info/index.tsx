import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRecoilValue } from "recoil";

import axiosRequest from "@/api";
import { Like } from "@/@types";
import { Planet } from "@/@types/Planet";
import { MembershipStatus } from "@/@types/Member";
import { userAtom } from "@/recoil/atoms/user.atom";

import JoinPlanetModal from "../JoinPlanetModal";

import * as S from "./index.styled";
import Line from "@/components/common/Line";
import PLANETSHAPE from "@/constants/planetShape";
import HeartAnimation from "@/components/common/HeartAnimation";

interface PlanetProps {
  role: string | {};
  planetInfo: Planet | undefined;
  membership: MembershipStatus | undefined;
  liked: boolean;
  setLiked: any;
}

export default function PlanetInfo({ role, liked, membership, planetInfo, setLiked }: PlanetProps) {
  const { link, roles, tag } = role;

  const user = useRecoilValue(userAtom);

  const pathname = usePathname();
  const paramsId = pathname.split("/")[2]; // 행성 아이디 추출

  const [isModal, setIsModal] = useState(false);

  const { name, description, hashtags, shape } = planetInfo;

  const handleOpen = () => {
    setIsModal(prev => !prev);
  };

  const img = () => {
    switch (shape) {
      case "SHAPE1":
        return PLANETSHAPE.SHAPE1;
      case "SHAPE2":
        return PLANETSHAPE.SHAPE2;
      case "SHAPE3":
        return PLANETSHAPE.SHAPE3;
    }
  };

  const handleLiked = async () => {
    try {
      const response = await axiosRequest.requestAxios<Partial<Like>>(
        liked ? "delete" : "post",
        `/planet/${paramsId}/bookmark`,
      );
      console.log(response);

      setLiked((prev: boolean) => !prev);
    } catch (error) {
      alert("좋아요 안 되고 있음");
      console.log(error);
    }
  };

  const heartColor = liked ? "var(--c, #ff6b81)" : "#eee";

  return (
    <S.Container>
      <S.Top>
        {/* role 에 따라 달라지는 부분 */}
        <S.Setting>
          {roles === "관리자" && (
            <>
              <span>
                <Link href={`${link[0]}`}>{tag[0]}</Link>
              </span>{" "}
              |{" "}
              <span>
                <Link href={`${link[1]}`}>{tag[1]}</Link>
              </span>
            </>
          )}

          {(roles === "부관리자" || roles === "일반") && (
            <span>
              <Link href={`${link}`}>{tag}</Link>
            </span>
          )}

          {roles === "게스트" && (
            <span onClick={handleOpen}>
              {membership === "PENDING" ? "행성 탑승 신청 완료" : tag}
              {!membership && isModal && <JoinPlanetModal planetId={paramsId} />}
            </span>
          )}
        </S.Setting>
        <S.Role>{roles}</S.Role>
      </S.Top>

      <S.Middle>
        {/* planet 행성 소개 */}
        <img src={img()} />
        <S.PlanetInfo>
          <div>
            <strong>{name}</strong>

            <div onClick={handleLiked}>
              {liked ? <HeartAnimation color={heartColor} /> : <S.HeartImg src="/assets/img/icons/gray-heart.svg" />}
            </div>
          </div>

          <Line size="horizontal" color="gray" />

          <span>{description}</span>
        </S.PlanetInfo>
      </S.Middle>

      <S.Bottom>
        {/* planet hash tag */}
        {hashtags && hashtags.map((tag: string) => <S.HashTag>#{tag}</S.HashTag>)}
      </S.Bottom>
    </S.Container>
  );
}
