import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/recoil/atoms/user.atom";

import axiosRequest from "@/api";
import { ResData } from "@/@types";
import { Planet } from "@/@types/Planet";
import { MembershipStatus } from "@/@types/Member";

import JoinPlanetModal from "../JoinPlanetModal";

import * as S from "./index.styled";
import Line from "@/components/common/Line";
import PLANETSHAPE from "@/constants/planetShape";

interface PlanetProps {
  role: string | {};
}

export default function PlanetInfo({ role }: PlanetProps) {
  const { link, roles, tag } = role;

  const { id } = useRecoilValue(userAtom);

  const pathname = usePathname();
  const paramsId = pathname.split("/")[2]; // 행성 아이디 추출

  const [isModal, setIsModal] = useState(false);

  const [planetInfo, setPlanetInfo] = useState<Partial<Planet>>({});
  const [membership, setMembership] = useState<Partial<MembershipStatus>>();

  // 특정 행성 정보
  const getPlanetInfo = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<Planet>>("get", `/planet/${paramsId}`);
      const data = response.data;
      const status = data.members.filter(el => el.userId === id)[0].status;

      console.log(status);

      setMembership(status);
      setPlanetInfo(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPlanetInfo();
  }, []);

  const { name, description, hashtags, shape } = planetInfo;

  const handleOpen = () => {
    setIsModal(prev => !prev);
    console.log(membership);
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
              {isModal && <JoinPlanetModal planetId={paramsId} />}
            </span>
          )}
        </S.Setting>
        <S.Role>{roles}</S.Role>
      </S.Top>

      <S.Middle>
        {/* planet 행성 소개 */}
        <img src={img()} />
        <S.PlanetInfo>
          <strong>{name}</strong>
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
