import BoxModal from "@/components/common/BoxModal";
import Member from "@/components/SpaceModal/Member";
import { Default, ItemType } from "@/@types/Modal";
import Button from "@/components/common/Button";
import * as S from "../index.styled";
import { Planet, PlanetMembership, Role } from "@/@types/Planet";
import axiosRequest from "@/api";
import { ResData } from "@/@types";
import { AxiosError } from "axios";
import { useState } from "react";

interface Type extends Default {
  title: string | undefined;
  type: ItemType;
  role?: Role;
  id: string;
  members?: PlanetMembership[];
}

export default function Exit({ onClose, title, type, role, id, members }: Type) {
  const [selectMember, setSelectMember] = useState<number>();
  async function handlePlanetExit() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Planet>>("post", `/planet/leave/${id}`);
      console.log(response);
      response.status === 201 && alert("행성을 성공적으로 떠났습니다!");
      onClose();
    } catch (error) {
      console.error("행성 탈출하기 에러", error);
      const errorResponse = (error as AxiosError<{ message: string }>).response;
      alert(errorResponse?.data.message);
    }
  }

  async function handlePlanetTransferOwnership() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Planet>>("put", `/planet/transfer-ownership/${id}`, {
        newOwnerId: selectMember,
      });
      console.log(response);
      response.status === 200 && alert("행성을 성공적으로 위임했습니다!");
      onClose();
    } catch (error) {
      console.error("행성 위임하기 에러", error);
      const errorResponse = (error as AxiosError<{ message: string }>).response;
      alert(errorResponse?.data.message);
    }
  }

  return (
    <BoxModal onClose={onClose} title={`${type} 탈출`}>
      {role !== "OWNER" ? (
        <S.Notification>
          <b>{title}</b>
          <br />
          {type}을 정말로 나가시겠습니까?
        </S.Notification>
      ) : (
        <S.NotificationBox>
          <b>{title}</b> {type} 멤버 중 한 명에게 <b>관리자를 위임</b>하시고 <br />
          {type} 나가기 버튼을 눌러주세요.
          <S.MemberList>
            {members?.map(member => (
              <Member
                key={member.userId}
                {...member}
                type={type}
                mode={"select"}
                onSelectMember={userId => setSelectMember(userId)}
              />
            ))}
          </S.MemberList>
        </S.NotificationBox>
      )}

      <S.CenterGroup>
        <Button
          variant="reverse"
          shape="medium"
          size="big"
          onClick={
            type === ItemType.Planet
              ? role === "OWNER"
                ? handlePlanetTransferOwnership
                : handlePlanetExit
              : role === "OWNER"
              ? handlePlanetTransferOwnership
              : handlePlanetExit
          }
        >
          <S.CenterGroup>
            <img src="/assets/img/icons/exit.svg" />
            <span>{type} 나가기</span>
          </S.CenterGroup>
        </Button>
        <Button variant="confirm" shape="medium" size="big" onClick={onClose}>
          다시 고민해 볼게요.
        </Button>
      </S.CenterGroup>
    </BoxModal>
  );
}
