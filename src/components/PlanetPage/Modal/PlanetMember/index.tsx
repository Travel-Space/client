import BoxModal from "@/components/common/BoxModal";
import * as S from "./index.styled";
import Member from "@/components/SpaceModal/Member";
import { Default } from "@/@types/Modal";
import { CommonUserInfo, User, UsersType } from "@/@types/User";
import { useContext, useEffect, useState } from "react";
import axiosRequest from "@/api";
import { ResData } from "@/@types";
import { isAxiosError } from "axios";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import STATUS_CODE from "@/constants/statusCode";
import { PLANET_ROLE, PLANET_ROLE_NAME, PlanetMembership } from "@/@types/Planet";
import { PlanetContext, PlanetContextType } from "../..";

export default function PlanetMember({ onClose }: Default) {
  const { planetInfo } = useContext<PlanetContextType>(PlanetContext);

  const [planetMember, setPlanetMember] = useState<CommonUserInfo[]>([]);
  const [updatedPlanetMember, setUpdatedPlanetMember] = useState<CommonUserInfo[]>([]);
  const [followingList, setFollowingList] = useState<CommonUserInfo[]>([]);
  const [searchUsers, setSearchUsers] = useState<CommonUserInfo[]>([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [searchEmail, setSearchEmail] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const fetchMemberListData = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<PlanetMembership[]>>(
        "get",
        `/planet/members/${planetInfo.id}`,
        {},
      );
      console.log(response);
      // 행성 관리자 제외한 멤버
      const member = response.data;
      const filteredMember = member.filter(m => m.role !== PLANET_ROLE_NAME.OWNER);
      const resultMember = filteredMember.map(
        (member: PlanetMembership): CommonUserInfo => ({
          email: member.user.email,
          nickName: member.user.nickName,
          profileImage: member.user.profileImage,
          role: member.role,
          userId: member.user.id,
          invited: member.user.invited,
        }),
      );
      setPlanetMember(resultMember);
    } catch (error) {
      console.error("멤버 조회 에러", error);
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };

  // 초대하기
  const handleInvite = async (userId: number) => {
    try {
      const response = await axiosRequest.requestAxios<ResData<{ message: string }>>(
        "post",
        `/planet/${planetInfo.id}/invite/${userId}`,
        {},
      );
      console.log("handleInvite", response);
      if (response.status === STATUS_CODE.CREATED) {
        alert(response.data.message);
        fetchMemberListData();
      }
    } catch (error) {
      console.error("초대하기 에러", error);
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };
  // 가입 승인
  const handleApprove = async (userId: number) => {
    try {
      const response = await axiosRequest.requestAxios<ResData<{ message: string }>>(
        "post",
        `/planet/approve/${planetInfo.id}/${userId}`,
        {},
      );
      console.log("handleApprove", response);
      if (response.status === STATUS_CODE.CREATED) {
        alert(response.data.message);
        fetchMemberListData();
      }
    } catch (error) {
      console.error("가입 승인하기 에러", error);
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };
  // 가입 거절
  const handleReject = async (userId: number) => {
    try {
      const response = await axiosRequest.requestAxios<ResData<{ message: string }>>(
        "post",
        `/planet/reject/${planetInfo.id}/${userId}`,
        {},
      );
      console.log("handleReject", response);
      if (response.status === STATUS_CODE.CREATED) {
        alert(response.data.message);
        fetchMemberListData();
      }
    } catch (error) {
      console.error("가입 거절하기 에러", error);
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };
  // 멤버 추방
  const handleKick = async (userId: number) => {
    try {
      const response = await axiosRequest.requestAxios<ResData<{ message: string }>>(
        "delete",
        `/planet/kick/${planetInfo.id}/${userId}`,
        {},
      );
      console.log("handleKick", response);
      if (response.status === STATUS_CODE.OK) {
        alert(response.data.message);
        fetchMemberListData();
      }
    } catch (error) {
      console.error("멤버 추방하기 에러", error);
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };
  // 멤버 권한 수정
  const handleRoleMember = async (userId: number, role: string) => {
    console.log(userId, role);
    try {
      const response = await axiosRequest.requestAxios<ResData<{ message: string }>>(
        "put",
        `/planet/members/${planetInfo.id}/${userId}`,
        {
          role: role === PLANET_ROLE.ADMIN ? PLANET_ROLE_NAME.ADMIN : PLANET_ROLE_NAME.MEMBER,
        },
      );
      console.log("handleRoleMember", response);
      if (response.status === STATUS_CODE.OK) {
        alert(response.data.message);
        fetchMemberListData();
      }
    } catch (error) {
      console.error("멤버 권한 수정 에러", error);
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };

  // 팔로우 리스트 조회
  const fetchFollowingData = async () => {
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
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };
  // 모든 유저 조회
  const handleSearchButtonClick = () => {
    getSearchUsers({
      key: "Enter",
      nativeEvent: { isComposing: false },
    } as React.KeyboardEvent<HTMLInputElement>);
  };

  const getSearchUsers = async (e: React.KeyboardEvent<HTMLInputElement>) => {
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
        console.log("resultUser", resultUser);
        if (!resultUser.length) {
          setTotalCount(0);
          setUpdatedPlanetMember([]);
          return;
        }
        setSearchUsers(resultUser);
      } catch (error) {
        console.error("유저 조회 에러", error);
        if (isAxiosError(error)) {
          alert(error.response?.data.message);
        }
      }
    }
  };

  useEffect(() => {
    fetchFollowingData();
    fetchMemberListData();
  }, []);

  useEffect(() => {
    const planetFollowingMember = [...planetMember, ...followingList].filter(
      (value, index, self) => self.findIndex(el => el.userId === value.userId) === index,
    );
    setUpdatedPlanetMember(planetFollowingMember);
    if (!searchUsers.length) return;

    const searchUsersMember = [...planetMember, ...searchUsers]
      .filter((value, index, self) => self.findIndex(el => el.userId === value.userId) === index)
      .filter(
        updatedUser =>
          planetMember.some(planetUser => planetUser.userId === updatedUser.userId) &&
          searchUsers.some(searchUser => searchUser.userId === updatedUser.userId),
      );
    if (!searchUsersMember.length) {
      setUpdatedPlanetMember(searchUsers);
      return;
    }
    setUpdatedPlanetMember(searchUsersMember);
  }, [followingList, planetMember, searchUsers]);

  useEffect(() => {
    if (!searchEmail) {
      setSearchUsers([]);
    }
  }, [searchEmail]);

  useEffect(() => {
    setTotalCount(updatedPlanetMember?.length);
  }, [updatedPlanetMember]);

  return (
    <BoxModal onClose={onClose} title="행성 멤버 관리" size="lg">
      <S.Notification>
        <S.SearchGroup>
          <Input
            placeholder="이메일을 검색해보세요."
            value={searchEmail || ""}
            onChange={e => setSearchEmail(e.target.value)}
            onKeyDown={getSearchUsers}
          />
          <Button variant="confirm" shape="small" size="big" onClick={handleSearchButtonClick}>
            <span>검색</span>
            <img src="/assets/img/icons/search.svg" height={16} />
          </Button>
        </S.SearchGroup>

        {totalCount === 0 ? (
          <S.NoList>
            <img src="/assets/img/icons/user-profile-default.svg" height={100} />
            <p>
              <b>해당 사용자가 없습니다.</b>
              <br />
              <span>이메일을 검색해 보세요.</span>
            </p>
          </S.NoList>
        ) : (
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
        )}
      </S.Notification>
    </BoxModal>
  );
}
