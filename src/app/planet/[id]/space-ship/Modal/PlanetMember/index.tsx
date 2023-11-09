import BoxModal from "@/components/common/BoxModal";
import * as S from "./index.styled";
import Member from "@/components/SpaceModal/Member";
import { Default } from "@/@types/Modal";
import { CommonUserInfo } from "@/@types/User";
import { useContext, useEffect, useState } from "react";
import axiosRequest from "@/api";
import { ResData } from "@/@types";
import { AxiosError } from "axios";
import { SpaceshipContext, SpaceshipContextType } from "../../page";

export default function PlanetMember({ onClose }: Default) {
  const { planetId, planetMember, setPlanetMember } = useContext<SpaceshipContextType>(SpaceshipContext);
  const [updatedPlanetMember, setUpdatedPlanetMember] = useState<CommonUserInfo[]>([]);
  const [friendList, setFriend] = useState<CommonUserInfo[]>([]);
  const [inviteList, setInviteList] = useState<CommonUserInfo[]>([]);
  const [joinList, setJoinList] = useState<CommonUserInfo[]>([]);

  async function handleInvite(userId: number) {
    try {
      const response = await axiosRequest.requestAxios<ResData<{ message: string }>>(
        "post",
        `/planet/${planetId}/invite/${userId}`,
        {},
      );
      console.log(response);
      if (response.status === 201) {
        alert(response.data.message);
        fetchFollowingData();
      }
    } catch (error) {
      console.error("초대하기 에러", error);
      const errorResponse = (error as AxiosError<{ message: string }>).response;
      alert(errorResponse?.data.message);
    }
  }

  async function fetchFollowingData() {
    try {
      const response = await axiosRequest.requestAxios<
        ResData<{ data: { friend: { id: number; profileImage: string; nickName: string; email: string } }[] }>
      >("get", "/user/following", {});
      console.log(response);
      const data = response.data;
      const resultMember = data.data.map(
        (member: { friend: { id: number; profileImage: string; nickName: string; email: string } }) => ({
          userId: member.friend.id,
          nickName: member.friend.nickName,
          email: member.friend.email,
          profileImage: member.friend.profileImage,
        }),
      );
      const newArray = resultMember
        .filter(item1 => !planetMember.some(item2 => item2.userId === item1.userId))
        .concat(planetMember.filter(item2 => !resultMember.some(item1 => item1.userId === item2.userId)));

      setFriend(newArray);
    } catch (error) {
      console.error("내가 팔로우하는 친구 조회 에러", error);
      const errorResponse = (error as AxiosError<{ message: string }>).response;
      alert(errorResponse?.data.message);
    }
  }

  async function fetchPendingData() {
    try {
      const response = await axiosRequest.requestAxios<
        ResData<{
          pendingApplications: { user: { id: number; profileImage: string; nickName: string; email: string } }[];
          invitations: { invitee: { id: number; profileImage: string; nickName: string; email: string } }[];
        }>
      >("get", `/planet/applications-invitations/${planetId}`, {});
      console.log(response);
      const data = response.data;
      const joinMember = data.pendingApplications.map(
        (member: { user: { id: number; profileImage: string; nickName: string; email: string } }) => ({
          userId: member.user.id,
          nickName: member.user.nickName,
          email: member.user.email,
          profileImage: member.user.profileImage,
          invite: false,
        }),
      );
      const inviteMember = data.invitations.map(
        (member: { invitee: { id: number; profileImage: string; nickName: string; email: string } }) => ({
          userId: member.invitee.id,
          nickName: member.invitee.nickName,
          email: member.invitee.email,
          profileImage: member.invitee.profileImage,
          invite: true,
        }),
      );
      setInviteList(inviteMember);
      setJoinList(joinMember);
    } catch (error) {
      console.error("초대 및 탑승신청 조회 에러", error);
      const errorResponse = (error as AxiosError<{ message: string }>).response;
      alert(errorResponse?.data.message);
    }
  }

  useEffect(() => {
    fetchPendingData();
    fetchFollowingData();
  }, []);

  useEffect(() => {
    const updatedPlanetMember = planetMember.map(member => {
      const joinItem = joinList.find(item => item.userId === member.userId);
      const inviteItem = inviteList.find(item => item.userId === member.userId);

      if (joinItem) {
        return { ...member, invite: false };
      } else if (inviteItem) {
        return { ...member, invite: true };
      } else {
        return member;
      }
    });

    setUpdatedPlanetMember(updatedPlanetMember);
  }, [joinList, inviteList, planetMember]);

  return (
    <BoxModal onClose={onClose} title="행성 멤버 관리">
      <S.Notification>
        {/* <S.InputGroup>
          <S.Input placeholder="이메일 또는 닉네임을 검색해보세요." />
          <S.SearchButton>
            <span>검색</span>
            <img src="/assets/img/icons/search.svg" height={16} />
          </S.SearchButton>
        </S.InputGroup> */}

        {/* 친구 없고 멤버 없을 때 */}
        {friendList.length === 0 && planetMember.length === 0 && (
          <S.NoList>
            <img src="/assets/img/icons/user-profile-default.svg" height={100} />
            <p>
              <b>등록된 친구가 없습니다.</b>
              <br />
              팔로우할 친구를 찾아보세요!
            </p>
            {/* <S.OutlineButton>친구 관리하기</S.OutlineButton> */}
          </S.NoList>
        )}

        {/* 친구나 멤버 있을 때 */}
        <S.MemberList>
          {[...updatedPlanetMember, ...friendList]?.map(member => (
            <Member
              key={member.userId}
              mode="manage"
              user={{
                email: member.email,
                nickName: member.nickName,
                profileImage: member.profileImage,
                role: member.role,
                userId: member.userId,
                invite: member.invite,
              }}
              onInvite={handleInvite}
            />
          ))}
        </S.MemberList>
      </S.Notification>
    </BoxModal>
  );
}
