import Button from "@/components/common/Button";
import * as S from "../page.styled";
import Exit from "@/components/SpaceModal/Exit";
import PlanetMember from "../Modal/PlanetMember";
import { ItemType } from "@/@types/Modal";
import { useModal } from "@/hooks/useModal";
import { useContext } from "react";
import { SpaceshipContext, SpaceshipContextType } from "../page";
import { userAtom } from "@/recoil/atoms/user.atom";
import { useRecoilValue } from "recoil";

export default function SpaceshipBottom() {
  const { openModal, closeModal } = useModal();
  const { planetData, planetId, planetMember } = useContext<SpaceshipContextType>(SpaceshipContext);
  const user = useRecoilValue(userAtom);
  const thisPlanet = user?.memberships.planets.find(planet => planet?.planetId === parseInt(planetId));
  const onlyMember = planetMember.filter(m => m.role !== "GUEST");

  const exitModal = {
    title: "행성 탈출",
    content: (
      <Exit
        onClose={closeModal}
        title={planetData.name}
        type={ItemType.Planet}
        role={thisPlanet?.role}
        id={planetId}
        members={onlyMember}
      />
    ),
  };

  const planetMemberModal = {
    title: "행성 멤버 관리",
    content: <PlanetMember onClose={closeModal} members={planetMember} />,
  };

  return (
    <S.Footer>
      {thisPlanet?.role === "OWNER" && (
        <S.MemberBtn>
          <Button variant="gradient" shape="large" size="big" onClick={() => openModal(planetMemberModal)}>
            <S.CenterGroup>
              <img src="/assets/img/icons/users.svg" />
              <span>행성 멤버 관리</span>
            </S.CenterGroup>
          </Button>
        </S.MemberBtn>
      )}
      {thisPlanet?.role !== "GUEST" && <S.ExitBtn onClick={() => openModal(exitModal)}>행성 탈출 💥</S.ExitBtn>}
    </S.Footer>
  );
}
