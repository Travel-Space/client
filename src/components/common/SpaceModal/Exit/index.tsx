import BoxModal from "@/components/common/BoxModal";
import Member from "@/components/common/SpaceModal/Member";
import { Default, ITEM_TYPE } from "@/@types/Modal";
import Button from "@/components/common/Button";
import * as S from "../index.styled";
import { Planet, PLANET_ROLE, PLANET_ROLE_NAME } from "@/@types/Planet";
import axiosRequest from "@/api";
import { ResData } from "@/@types";
import { isAxiosError } from "axios";
import { useState } from "react";
import { CommonUserInfo } from "@/@types/User";
import { SPACESHIP_ROLE, SPACESHIP_ROLE_NAME, Spaceship } from "@/@types/Spaceship";
import { UserType, userAtom } from "@/recoil/atoms/user.atom";
import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import STATUS_CODE from "@/constants/statusCode";

interface Type extends Default {
  title: string | undefined;
  type: ITEM_TYPE;
  role?: PLANET_ROLE | SPACESHIP_ROLE;
  id: string;
  members?: CommonUserInfo[];
}

export default function Exit({ onClose, title, type, role, id, members }: Type) {
  const [selectMember, setSelectMember] = useState<number>();
  const hasMember = members && members.length > 0;
  const [auth, setAuth] = useRecoilState(userAtom);
  const router = useRouter();

  const deletedMemberships = (id: string, type: ITEM_TYPE) => {
    const planets = auth?.memberships.planets.filter(planet => planet?.planetId !== parseInt(id));
    const spaceships = auth?.memberships.spaceships.filter(spaceship => spaceship?.spaceshipId !== parseInt(id));
    const updatedUser = {
      ...auth,
      memberships: {
        planets: type === ITEM_TYPE.PLANET ? planets : auth?.memberships.planets || [],
        spaceships: type === ITEM_TYPE.SPACESHIP ? spaceships : auth?.memberships.spaceships || [],
      },
    } as UserType;
    setAuth(updatedUser);
    onClose();
    type === ITEM_TYPE.PLANET && router.push("/");
  };

  const handlePlanetDelete = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<Planet>>("delete", `/planet/delete/${id}`);
      console.log(response);
      if (response.status === STATUS_CODE.OK) {
        alert("행성이 성공적으로 삭제되었습니다!");
        deletedMemberships(id, ITEM_TYPE.PLANET);
        return router.push("/");
      }
    } catch (error) {
      console.error("행성 삭제하기 에러", error);
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };

  const handlePlanetExit = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<Planet>>("post", `/planet/leave/${id}`);
      console.log(response);
      if (response.status === STATUS_CODE.CREATED) {
        alert("행성을 성공적으로 떠났습니다!");
        deletedMemberships(id, ITEM_TYPE.PLANET);
      }
    } catch (error) {
      console.error("행성 탈출하기 에러", error);
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };

  const handlePlanetTransferOwnership = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<Planet>>("put", `/planet/transfer-ownership/${id}`, {
        newOwnerId: selectMember,
      });
      console.log(response);
      if (response.status === STATUS_CODE.OK) {
        alert("행성을 성공적으로 위임했습니다!");
        deletedMemberships(id, ITEM_TYPE.PLANET);
      }
    } catch (error) {
      console.error("행성 위임하기 에러", error);
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };

  const handleSpaceshipExit = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<Spaceship>>("delete", `/spaceship/leave/${id}`);
      console.log(response);
      if (response.status === STATUS_CODE.OK) {
        alert("우주선을 성공적으로 떠났습니다!");
        deletedMemberships(id, ITEM_TYPE.SPACESHIP);
      }
    } catch (error) {
      console.error("우주선 탈출하기 에러", error);
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };

  const handleSpaceshipTransferOwnership = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<Spaceship>>(
        "put",
        `/spaceship/transfer-ownership/${id}`,
        {
          newOwnerId: selectMember,
        },
      );
      console.log(response);
      if (response.status === STATUS_CODE.OK) {
        alert("우주선을 성공적으로 위임했습니다!");
        deletedMemberships(id, ITEM_TYPE.SPACESHIP);
      }
    } catch (error) {
      console.error("우주선 위임하기 에러", error);
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
        deletedMemberships(id, ITEM_TYPE.SPACESHIP);
      }
    } catch (error) {
      console.error("우주선 삭제하기 에러", error);
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };

  return (
    <BoxModal onClose={onClose} title={`${type} 탈출`}>
      {role !== (SPACESHIP_ROLE_NAME.OWNER || PLANET_ROLE_NAME.OWNER) ? (
        <S.Notification>
          <b>{title}</b>
          <br />
          {type}을 정말로 나가시겠습니까?
        </S.Notification>
      ) : (
        <S.NotificationBox>
          {hasMember ? (
            <>
              <b>{title}</b> {type} 멤버 중 한 명에게 <b>관리자를 위임</b>하시고 <br />
              {type} 나가기 버튼을 눌러 주세요.
              <S.MemberList>
                {members?.map((member, index) => (
                  <Member
                    user={{
                      email: member.email,
                      nickName: member.nickName,
                      profileImage: member.profileImage,
                      role: member.role,
                      userId: member.userId,
                    }}
                    key={index}
                    type={type}
                    mode={"select"}
                    onSelectMember={userId => setSelectMember(userId)}
                  />
                ))}
              </S.MemberList>
            </>
          ) : (
            <>
              <b>{title}</b> {type}에 멤버가 없습니다. <br />
              {type}을 <b>삭제</b>하시겠습니까?
            </>
          )}
        </S.NotificationBox>
      )}

      <S.CenterGroup>
        {members && members.length > 0 ? (
          <Button
            variant="reverse"
            shape="medium"
            size="big"
            onClick={
              type === ITEM_TYPE.PLANET
                ? role === PLANET_ROLE_NAME.OWNER
                  ? handlePlanetTransferOwnership
                  : handlePlanetExit
                : role === SPACESHIP_ROLE_NAME.OWNER
                ? handleSpaceshipTransferOwnership
                : handleSpaceshipExit
            }
          >
            <S.CenterGroup>
              <img src="/assets/img/icons/exit.svg" />
              <span>{type} 나가기</span>
            </S.CenterGroup>
          </Button>
        ) : (
          <Button
            variant="reverse"
            shape="medium"
            size="big"
            onClick={type === ITEM_TYPE.PLANET ? handlePlanetDelete : handleSpaceshipDelete}
          >
            <S.CenterGroup>
              <img src="/assets/img/icons/trash.svg" />
              <span>{type} 삭제하기</span>
            </S.CenterGroup>
          </Button>
        )}
        <Button variant="confirm" shape="medium" size="big" onClick={onClose}>
          다시 고민해 볼게요.
        </Button>
      </S.CenterGroup>
    </BoxModal>
  );
}
