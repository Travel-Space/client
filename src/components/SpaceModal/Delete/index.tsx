import BoxModal from "@/components/common/BoxModal";
import Button from "@/components/common/Button";
import { Default, ItemType } from "@/@types/Modal";
import * as S from "../index.styled";
import axiosRequest from "@/api";
import { Planet, ResData } from "@/@types";
import { isAxiosError } from "axios";
import { Spaceship } from "@/@types/Spaceship";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { UserType, userAtom } from "@/recoil/atoms/user.atom";
import STATUS_CODE from "@/constants/statusCode";

interface Type extends Default {
  title?: string;
  type: ItemType;
  id?: number;
  depth?: boolean;
}

export default function Delete({ onClose, title, type, id, depth }: Type) {
  const [auth, setAuth] = useRecoilState(userAtom);
  const router = useRouter();

  const deletedMemberships = (id: number, type: ItemType) => {
    const planets = auth?.memberships.planets.filter(planet => planet?.planetId !== id);
    const spaceships = auth?.memberships.spaceships.filter(spaceship => spaceship?.spaceshipId !== id);
    const updatedUser = {
      ...auth,
      memberships: {
        planets: type === ItemType.Planet ? planets : auth?.memberships.planets || [],
        spaceships: type === ItemType.SpaceShip ? spaceships : auth?.memberships.spaceships || [],
      },
    } as UserType;
    setAuth(updatedUser);
    onClose();
    type === ItemType.Planet && router.push("/");
  };

  const handlePlanetDelete = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<Planet>>("delete", `/planet/delete/${id}`);
      console.log(response);
      if (response.status === STATUS_CODE.OK) {
        alert("행성이 성공적으로 삭제되었습니다!");
        id && deletedMemberships(id, ItemType.Planet);
        return router.push("/");
      }
    } catch (error) {
      console.error("행성 삭제하기 에러", error);
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };

  const handleSpaceshipDelete = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<Spaceship>>("delete", `/spaceship/${id}`);
      console.log(response);
      if (response.status === STATUS_CODE.OK) {
        alert("우주선이 성공적으로 삭제되었습니다!");
        id && deletedMemberships(id, ItemType.SpaceShip);
      }
    } catch (error) {
      console.error("우주선 삭제하기 에러", error);
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };

  return (
    <BoxModal onClose={onClose} title={`${type} 삭제`} depth={depth}>
      <S.Notification>
        <b>{title}</b>
        <br />
        {type}을 정말로 <b>삭제</b>하시겠습니까?
      </S.Notification>
      <S.CenterGroup>
        <Button
          variant="reverse"
          shape="medium"
          size="big"
          onClick={type === ItemType.Planet ? handlePlanetDelete : handleSpaceshipDelete}
        >
          <S.CenterGroup>
            <img src="/assets/img/icons/trash.svg" />
            <span>{type} 삭제하기</span>
          </S.CenterGroup>
        </Button>
        <Button variant="confirm" shape="medium" size="big" onClick={onClose}>
          다시 고민해 볼게요.
        </Button>
      </S.CenterGroup>
    </BoxModal>
  );
}
