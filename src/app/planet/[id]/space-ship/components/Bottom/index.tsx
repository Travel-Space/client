import Button from "@/components/common/Button";
import * as S from "../index.styled";
import Exit from "@/components/SpaceModal/Exit";
import PlanetMember from "../Modal/PlanetMember";
import { ITEM_TYPE } from "@/@types/Modal";
import { useModal } from "@/hooks/useModal";
import { useContext } from "react";
import { userAtom } from "@/recoil/atoms/user.atom";
import { useRecoilValue } from "recoil";
import { SpaceshipContext, SpaceshipContextType } from "..";
import { PLANET_ROLE_NAME } from "@/@types/Planet";

export default function SpaceshipBottom() {
  const { openModal, closeModal } = useModal();
  const { planetData, planetId, planetMember } = useContext<SpaceshipContextType>(SpaceshipContext);
  const user = useRecoilValue(userAtom);
  const thisPlanet = user?.memberships.planets.find(planet => planet?.planetId === parseInt(planetId));
  const onlyMember = planetMember.filter(m => m.role !== PLANET_ROLE_NAME.GUEST);
  console.log(thisPlanet);

  const exitModal = {
    title: "행성 탈출",
    content: (
      <Exit
        onClose={closeModal}
        title={planetData.name}
        type={ITEM_TYPE.PLANET}
        role={thisPlanet?.role}
        id={planetId}
        members={onlyMember}
      />
    ),
  };

  const planetMemberModal = {
    title: "행성 멤버 관리",
    content: <PlanetMember onClose={closeModal} />,
  };

  return (
    <S.Footer>
      {thisPlanet?.role === PLANET_ROLE_NAME.OWNER && (
        <S.MemberBtn>
          <Button variant="gradient" shape="large" size="big" onClick={() => openModal(planetMemberModal)}>
            <S.CenterGroup>
              <img src="/assets/img/icons/users.svg" />
              <span>행성 멤버 관리</span>
            </S.CenterGroup>
          </Button>
        </S.MemberBtn>
      )}
      {thisPlanet?.role !== PLANET_ROLE_NAME.GUEST && (
        <S.ExitBtn onClick={() => openModal(exitModal)}>행성 탈출 💥</S.ExitBtn>
      )}
    </S.Footer>
  );
}
