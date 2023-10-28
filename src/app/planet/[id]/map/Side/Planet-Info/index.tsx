import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import axiosRequest from "@/api";
import { ResData } from "@/@types";
import { Planet } from "@/@types/Planet";

import * as S from "./index.styled";
import Line from "@/components/common/Line";

const role = {
  관리자: ["행성 관리", "우주선"], // 관리자 및 부관리자
  일반: "우주선",
  게스트: "행성 탑승",
};

export default function PlanetInfo() {
  const pathname = usePathname();
  const paramsId = pathname.split("/")[2]; // 행성 아이디 추출

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

  // 행성의 관리자 / 부관리자가 아니라면 혹은 행성 멤버를 가져오는 롤
  // 1. 행성에 가입되어 있는지 확인 / 2. 관리자인지 확인 / 3. 부 관리자인지 확인

  return (
    <S.Container>
      <S.Top>
        {/* role 에 따라 달라지는 부분 */}
        <S.Setting>
          <span>행성 관리</span> | <span>우주선</span>
        </S.Setting>
        <S.Role>관리자</S.Role>
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
