import BoxModal from "@/components/common/BoxModal";
import * as S from "./index.styled";
import Member from "@/components/SpaceModal/Member";
import { Default } from "@/@types/Modal";
import { CommonUserInfo, User, UsersType } from "@/@types/User";
import { useContext, useEffect, useState } from "react";
import axiosRequest from "@/api";
import { ResData } from "@/@types";
import { AxiosError } from "axios";
import { SpaceshipContext, SpaceshipContextType } from "../../page";

export default function PlanetMember({ onClose }: Default) {
  const { planetId, planetMember, fetchMemberListData } = useContext<SpaceshipContextType>(SpaceshipContext);
  const [updatedPlanetMember, setUpdatedPlanetMember] = useState<CommonUserInfo[]>([]);
  const [followingList, setFollowingList] = useState<CommonUserInfo[]>([]);
  const [searchUsers, setSearchUsers] = useState<CommonUserInfo[]>([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [searchEmail, setSearchEmail] = useState<string | null>(null);

  // 초대하기
  async function handleInvite(userId: number) {
    try {
      const response = await axiosRequest.requestAxios<ResData<{ message: string }>>(
        "post",
        `/planet/${planetId}/invite/${userId}`,
        {},
      );
      console.log("handleInvite", response);
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
  // 가입 승인
  async function handleApprove(userId: number) {
    try {
      const response = await axiosRequest.requestAxios<ResData<{ message: string }>>(
        "post",
        `/planet/approve/${planetId}/${userId}`,
        {},
      );
      console.log("handleApprove", response);
      if (response.status === 201) {
        alert(response.data.message);
        fetchMemberListData();
      }
    } catch (error) {
      console.error("가입 승인하기 에러", error);
      const errorResponse = (error as AxiosError<{ message: string }>).response;
      alert(errorResponse?.data.message);
    }
  }
  // 가입 거절
  async function handleReject(userId: number) {
    try {
      const response = await axiosRequest.requestAxios<ResData<{ message: string }>>(
        "post",
        `/planet/reject/${planetId}/${userId}`,
        {},
      );
      console.log("handleReject", response);
      if (response.status === 201) {
        alert(response.data.message);
        fetchMemberListData();
      }
    } catch (error) {
      console.error("가입 거절하기 에러", error);
      const errorResponse = (error as AxiosError<{ message: string }>).response;
      alert(errorResponse?.data.message);
    }
  }
  // 멤버 추방
  async function handleKick(userId: number) {
    try {
      const response = await axiosRequest.requestAxios<ResData<{ message: string }>>(
        "delete",
        `/planet/kick/${planetId}/${userId}`,
        {},
      );
      console.log("handleKick", response);
      if (response.status === 200) {
        alert(response.data.message);
        fetchMemberListData();
      }
    } catch (error) {
      console.error("멤버 추방하기 에러", error);
      const errorResponse = (error as AxiosError<{ message: string }>).response;
      alert(errorResponse?.data.message);
    }
  }
  // 멤버 권한 수정
  async function handleRoleMember(userId: number, role: string) {
    console.log(userId, role);
    const isAdmin = "부관리자";
    try {
      const response = await axiosRequest.requestAxios<ResData<{ message: string }>>(
        "put",
        `/planet/members/${planetId}/${userId}`,
        {
          role: role === isAdmin ? "ADMIN" : "MEMBER",
        },
      );
      console.log("handleRoleMember", response);
      if (response.status === 200) {
        alert(response.data.message);
        fetchMemberListData();
      }
    } catch (error) {
      console.error("멤버 권한 수정 에러", error);
      const errorResponse = (error as AxiosError<{ message: string }>).response;
      alert(errorResponse?.data.message);
    }
  }

  // 팔로우 리스트 조회
  async function fetchFollowingData() {
    try {
      const response = await axiosRequest.requestAxios<
        ResData<{ data: { friend: { id: number; profileImage: string; nickName: string; email: string } }[] }>
      >("get", "/user/following", {});
      console.log("fetchFollowingData", response);
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
  // 모든 유저 조회
  async function getSearchUsers(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.nativeEvent.isComposing) return;

    if (e.key === "Enter" && searchEmail) {
      try {
        const response = await axiosRequest.requestAxios<ResData<UsersType>>(
          "get",
          `/user?page=${page}&limit=${limit}&email=${searchEmail}`,
        );
        console.log("getSearchUsers", response.data.data);
        const resultUser = response.data.data.map((user: User) => ({
          userId: user.id,
          nickName: user.nickName,
          email: user.email,
          profileImage: user.profileImage,
          role: undefined,
          invited: false,
        }));
        console.log(resultUser);
        setSearchUsers(resultUser);
      } catch (error) {
        console.error("유저 조회 에러", error);
        const errorResponse = (error as AxiosError<{ message: string }>).response;
        alert(errorResponse?.data.message);
      }
    }
  }

  useEffect(() => {
    fetchFollowingData();
    fetchMemberListData();
  }, []);

  useEffect(() => {
    const updatedPlanetMember = [...planetMember, ...followingList].filter(
      (value, index, self) => self.findIndex(el => el.userId === value.userId) === index,
    );
    setUpdatedPlanetMember(updatedPlanetMember);

    if (searchUsers.length !== 0) {
      const updated = [...planetMember, ...searchUsers]
        .filter((value, index, self) => self.findIndex(el => el.userId === value.userId) === index)
        .filter(
          updatedUser =>
            planetMember.some(planetUser => planetUser.userId === updatedUser.userId) &&
            searchUsers.some(searchUser => searchUser.userId === updatedUser.userId),
        );
      if (updated.length !== 0) {
        setUpdatedPlanetMember(updated);
      } else setUpdatedPlanetMember(searchUsers);
    }
  }, [followingList, planetMember, searchUsers]);

  useEffect(() => {
    if (!searchEmail) {
      setSearchUsers([]);
    }
  }, [searchEmail]);

  return (
    <BoxModal onClose={onClose} title="행성 멤버 관리" size="lg">
      <S.Notification>
        <input
          placeholder="이메일을 검색해보세요."
          value={searchEmail || ""}
          onChange={e => setSearchEmail(e.target.value)}
          onKeyDown={getSearchUsers}
        />
        {/* <S.InputGroup>
          <S.Input placeholder="이메일 또는 닉네임을 검색해보세요." />
          <S.SearchButton>
            <span>검색</span>
            <img src="/assets/img/icons/search.svg" height={16} />
          </S.SearchButton>
        </S.InputGroup> */}

        {/* 친구 없고 멤버 없을 때 */}
        {followingList.length === 0 && planetMember.length === 0 && (
          <S.NoList>
            <img src="/assets/img/icons/user-profile-default.svg" height={100} />
            <p>
              <b>등록된 친구가 없습니다.</b>
              <br />
              팔로우할 친구를 찾아보세요!
            </p>
            친구관리 링크
          </S.NoList>
        )}

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
              onApprove={handleApprove}
              onReject={handleReject}
              onKick={handleKick}
              onRoleMember={handleRoleMember}
            />
          ))}
        </S.MemberList>
      </S.Notification>
    </BoxModal>
  );
}
