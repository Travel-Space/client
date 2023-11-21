import BoxModal from "@/components/common/BoxModal";
import * as S from "./index.styled";
import Line from "@/components/common/Line";
import { Default, ItemType } from "@/@types/Modal";
import { Role, SpaceshipStatusName } from "@/@types/Spaceship";
import { getDateInfo } from "@/utils/getDateInfo";
import axiosRequest from "@/api";
import { ResData } from "@/@types";
import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { UserType, userAtom } from "@/recoil/atoms/user.atom";
import { useRecoilState, useRecoilValue } from "recoil";
import Button from "@/components/common/Button";
import Delete from "@/components/SpaceModal/Delete";
import { useModal } from "@/hooks/useModal";
import ShipManage from "../ShipManage";
import Exit from "@/components/SpaceModal/Exit";
import { SpaceShipType, SpaceshipContext, SpaceshipContextType } from "../..";

interface ShipInfoType extends Default {
  shipId: number;
}

export default function ShipInfo({ onClose, shipId }: ShipInfoType) {
  const [spaceshipInfo, setSpaceshipInfo] = useState<SpaceShipType>({
    id: 0,
    name: "",
    image: "",
    description: "",
    maxMembers: 0,
    memberCount: 0,
    ownerId: 0,
    status: "UPCOMING",
    startDate: "",
    endDate: "",
    planetId: 0,
    chatRoomId: 0,
    createdAt: "",
    updatedAt: "",
    members: [],
  });
  const { dateString: startDate } = getDateInfo(new Date(spaceshipInfo?.startDate));
  const { dateString: endDate } = getDateInfo(new Date(spaceshipInfo?.endDate));
  const user = useRecoilValue(userAtom);
  const { planetId } = useContext<SpaceshipContextType>(SpaceshipContext);
  const thisPlanet = user?.memberships.planets.find(planet => planet?.planetId === parseInt(planetId));
  const thisSpaceship = user?.memberships.spaceships.find(spaceship => spaceship?.spaceshipId === shipId);
  const [role, setRole] = useState<Role>();
  const imSpaceshipOwner = role === "OWNER";
  const imSpaceshipMember = role === "MEMBER";
  const imPlanetOwner = thisPlanet?.role === "OWNER";

  const [openDelete, setOpenDelete] = useState(false);
  const [openExit, setOpenExit] = useState(false);
  const { openModal, closeModal } = useModal();
  const onlyMember = spaceshipInfo.members.filter(m => m.role !== "OWNER");
  const [auth, setAuth] = useRecoilState(userAtom);

  const shipManageModal = {
    title: "우주선 관리",
    content: <ShipManage onClose={closeModal} ship={spaceshipInfo} />,
  };

  const fetchSpaceshipData = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<SpaceShipType>>("get", `/spaceship/${shipId}`, {});
      console.log(response);
      setSpaceshipInfo(response.data);
    } catch (error) {
      console.error("우주선 조회 에러", error);
      const errorResponse = (error as AxiosError<{ message: string }>).response;
      alert(errorResponse?.data.message);
    }
  };

  const handleSpaceshipJoin = async () => {
    try {
      const response = await axiosRequest.requestAxios<
        ResData<{ id: number; joinedAt: string; role: Role; spaceshipId: number; userId: number }>
      >("post", `/spaceship/board/${shipId}`, {});
      console.log(response);
      if (response.status === 201) {
        alert("우주선에 성공적으로 탑승하였습니다!");
        const updatedUser = {
          ...auth,
          memberships: {
            planets: auth?.memberships.planets || [],
            spaceships: [
              ...(auth?.memberships.spaceships || []),
              { spaceshipId: response.data.spaceshipId, role: "MEMBER" },
            ],
          },
        } as UserType;
        setAuth(updatedUser);
        onClose();
      }
    } catch (error) {
      console.error("우주선 탑승 에러", error);
      const errorResponse = (error as AxiosError<{ message: string }>).response;
      alert(errorResponse?.data.message);
    }
  };

  useEffect(() => {
    fetchSpaceshipData();
    setRole(thisSpaceship?.role);
  }, []);

  useEffect(() => {
    setRole(thisSpaceship?.role);
  }, [role]);

  return (
    <BoxModal onClose={onClose} title="우주선 정보">
      <S.Content>
        <S.Title>
          <h2>
            {spaceshipInfo.id}. {spaceshipInfo.name}
          </h2>
          <span>{SpaceshipStatusName[spaceshipInfo.status]}</span>
        </S.Title>
        <Line color="gray" size="horizontal" />
        <S.Detail>
          <div>
            <img src="/assets/img/icons/alert.svg" height={16} />
            <span>{spaceshipInfo.description}</span>
          </div>
          <div>
            <img src="/assets/img/icons/calendar.svg" height={16} />
            <span>
              {startDate} ~ {endDate}
            </span>
          </div>
        </S.Detail>
        <Line color="gray" size="horizontal" />
        <S.MemberGroup>
          <S.MemberTitle>
            <p>참여 멤버</p>
            <span>
              {spaceshipInfo.members.length} / {spaceshipInfo.maxMembers}
            </span>
          </S.MemberTitle>
          <S.MemberList>
            {spaceshipInfo.members.map(member => (
              <S.Member key={member.userId}>
                <img
                  className={member.userId === user?.id ? "isSelf" : ""}
                  src={member.profileImage}
                  width={32}
                  height={32}
                  alt=""
                />
                <div>
                  <p>
                    {member.nickName}
                    {member.role === "OWNER" && <span>우주선 방장</span>}
                  </p>
                  <p>{member.email}</p>
                </div>
              </S.Member>
            ))}
          </S.MemberList>
        </S.MemberGroup>
        {/* 우주선 방장, 행성 관리자만 삭제 가능 */}
        {imSpaceshipOwner && imPlanetOwner && (
          <S.DeleteBtn onClick={() => setOpenDelete(true)}>우주선 삭제 💥</S.DeleteBtn>
        )}
        <S.CenterGroup>
          {(imSpaceshipOwner || imSpaceshipMember) && (
            <Button variant="reverse" shape="medium" size="big" onClick={() => setOpenExit(true)}>
              <S.CenterGroup>
                <img src="/assets/img/icons/exit.svg" />
                <span>우주선 탈출</span>
              </S.CenterGroup>
            </Button>
          )}
          {!imSpaceshipMember && (
            <Button
              variant="confirm"
              shape="medium"
              size="big"
              onClick={imSpaceshipOwner ? () => openModal(shipManageModal) : handleSpaceshipJoin}
            >
              <S.CenterGroup>
                <img src="/assets/img/icons/space-ship/rocket.svg" />
                <span>우주선 {imSpaceshipOwner ? "관리하기" : "탑승하기"}</span>
              </S.CenterGroup>
            </Button>
          )}
        </S.CenterGroup>
      </S.Content>

      {openDelete && (
        <Delete
          depth={true}
          onClose={() => setOpenDelete(false)}
          title={spaceshipInfo.name}
          type={ItemType.SpaceShip}
          id={shipId}
        />
      )}
      {openExit && (
        <Exit
          onClose={() => setOpenExit(false)}
          title={spaceshipInfo.name}
          type={ItemType.SpaceShip}
          role={thisSpaceship?.role}
          id={`${shipId}`}
          members={onlyMember}
        />
      )}
    </BoxModal>
  );
}
