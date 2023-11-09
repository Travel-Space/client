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
  const { planetId, planetMember, fetchMemberListData } = useContext<SpaceshipContextType>(SpaceshipContext);
  const [updatedPlanetMember, setUpdatedPlanetMember] = useState<CommonUserInfo[]>([]);
  const [followingList, setFollowingList] = useState<CommonUserInfo[]>([]);

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
        fetchMemberListData();
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
          role: undefined,
          invited: false,
        }),
      );
      setFollowingList(resultMember);
    } catch (error) {
      console.error("내가 팔로우하는 친구 조회 에러", error);
      const errorResponse = (error as AxiosError<{ message: string }>).response;
      alert(errorResponse?.data.message);
    }
  }

  useEffect(() => {
    fetchFollowingData();
  }, []);

  useEffect(() => {
    const updatedPlanetMember = [...planetMember, ...followingList].filter(
      (value, index, self) => self.findIndex(el => el.userId === value.userId) === index,
    );

    setUpdatedPlanetMember(updatedPlanetMember);
  }, [followingList, planetMember]);

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
        {/* {followingList.length === 0 && planetMember.length === 0 && (
          <S.NoList>
            <img src="/assets/img/icons/user-profile-default.svg" height={100} />
            <p>
              <b>등록된 친구가 없습니다.</b>
              <br />
              팔로우할 친구를 찾아보세요!
            </p>
            친구관리 링크
          </S.NoList>
        )} */}

        {/* 친구나 멤버 있을 때 */}
        <S.MemberList>
          {updatedPlanetMember?.map(member => (
            <Member
              key={member.userId}
              mode="manage"
              user={{
                email: member.email,
                nickName: member.nickName,
                profileImage: member.profileImage,
                role: member.role,
                userId: member.userId,
                invited: member.invited,
              }}
              onInvite={handleInvite}
            />
          ))}
        </S.MemberList>
      </S.Notification>
    </BoxModal>
  );
}
