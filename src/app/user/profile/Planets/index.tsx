import { Planet } from "@/@types";

import * as S from "./index.styled";

import PlanetItem from "@/components/User/PlanetItem";

const Planets = ({ data }: { data: Planet[] }) => {
  return (
    <S.Container>
      <S.Number>
        총 <span>{data.length}</span>개의 행성
      </S.Number>
      <S.Content>
        {data.map((planet, idx) => (
          <PlanetItem key={idx} data={planet} />
        ))}
      </S.Content>
    </S.Container>
  );
};

export default Planets;
