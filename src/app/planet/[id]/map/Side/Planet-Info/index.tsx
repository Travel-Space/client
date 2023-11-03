import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import axiosRequest from "@/api";
import { ResData } from "@/@types";
import { Planet } from "@/@types/Planet";

import * as S from "./index.styled";
import Line from "@/components/common/Line";
import Link from "next/link";
import CreatePlanetModal from "../Modal";

interface PlanetProps {
  role: string | {};
}

export default function PlanetInfo({ role }: PlanetProps) {
  console.log(role);

  const { link, roles, tag } = role;

  console.log(roles, link, tag);

  const pathname = usePathname();
  const paramsId = pathname.split("/")[2]; // 행성 아이디 추출

  const [isModal, setIsModal] = useState(false);

  const [planetInfo, setPlanetInfo] = useState<Partial<Planet>>({});

  // 특정 행성 정보
  const getPlanetInfo = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<Planet>>("get", `/planet/${paramsId}`);
      const data = response.data;

      setPlanetInfo(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPlanetInfo();
  }, []);

  const { name, description, hashtags } = planetInfo;

  const handleOpen = () => {
    setIsModal(prev => !prev);
  };

  // 행성의 관리자 / 부관리자가 아니라면 혹은 행성 멤버를 가져오는 롤
  // 1. 행성에 가입되어 있는지 확인 / 2. 관리자인지 확인 / 3. 부 관리자인지 확인

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

          {roles === "부관리자" ||
            (roles === "일반" && (
              <span>
                <Link href={`${link}`}>{tag}</Link>
              </span>
            ))}

          {roles === "게스트" && (
            <span onClick={handleOpen}>
              {tag}
              {isModal && <CreatePlanetModal planetId={paramsId} />}
            </span>
          )}
        </S.Setting>
        <S.Role>{roles}</S.Role>
      </S.Top>

      <S.Middle>
        {/* planet 행성 소개 */}
        <img src="/assets/img/icons/planet-1.svg" />
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
