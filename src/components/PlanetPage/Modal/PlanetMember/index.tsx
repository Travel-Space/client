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
import { useRecoilValue } from "recoil";
import { userAtom } from "@/recoil/atoms/user.atom";

export default function PlanetMember({ onClose }: Default) {
  const { planetInfo } = useContext<PlanetContextType>(PlanetContext);

  const [planetMember, setPlanetMember] = useState<CommonUserInfo[]>([]);
  const [followingUsers, setFollowingUsers] = useState<CommonUserInfo[]>([]);
  const [totalMemberList, setTotalMemberList] = useState<CommonUserInfo[]>([]);
  const [searchUsers, setSearchUsers] = useState<CommonUserInfo[]>([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const userInfo = useRecoilValue(userAtom);
  const [searchEmail, setSearchEmail] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

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
        getMemberList();
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
        getMemberList();
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
        getMemberList();
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
        getMemberList();
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
        getMemberList();
      }
    } catch (error) {
      console.error("멤버 권한 수정 에러", error);
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };

  // 행성 멤버 조회
  const getMemberList = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<PlanetMembership[]>>(
        "get",
        `/planet/members/${planetInfo.id}`,
        {},
      );
      console.log(response);
      // 본인 제외한 멤버
      const members = response.data;
      const filteredMember = members.filter(member => member.role !== PLANET_ROLE_NAME.OWNER);
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

  // 팔로우 리스트 조회
  interface FriendType {
    friend: {
      id: number;
      profileImage: string;
      nickName: string;
      email: string;
    };
  }
  const getFollowingList = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<{ data: FriendType[] }>>("get", "/user/following", {});
      console.log("내가 팔로우하는 친구 리스트", response);
      const data = response.data;
      const resultMember = data.data.map((member: FriendType) => ({
        userId: member.friend.id,
        nickName: member.friend.nickName,
        email: member.friend.email,
        profileImage: member.friend.profileImage,
        role: undefined,
        invited: false,
      }));
      setFollowingUsers(resultMember);
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
        const users = response.data.data;
        // 본인 제외한 유저
        const filteredUser = users.filter(user => user.id !== userInfo?.id);
        const resultUser = filteredUser.map((user: User) => ({
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
          setTotalMemberList([]);
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
    getFollowingList();
    getMemberList();
  }, []);

  useEffect(() => {
    // 행성 멤버와 팔로우 유저 중복 제거
    const planetFollowingMember = [...planetMember, ...followingUsers].filter(
      (value, index, self) => self.findIndex(el => el.userId === value.userId) === index,
    );
    setTotalMemberList(planetFollowingMember);

    if (!searchUsers.length) return;
    // 행성 멤버와 검색 유저 중복 제거
    const searchUsersMember = [...planetMember, ...searchUsers]
      .filter((value, index, self) => self.findIndex(el => el.userId === value.userId) === index)
      .filter(
        updatedUser =>
          planetMember.some(planetUser => planetUser.userId === updatedUser.userId) &&
          searchUsers.some(searchUser => searchUser.userId === updatedUser.userId),
      );
    // 순수 검색 유저
    const uniqueSearchUsers = searchUsers.filter(
      searchUser => !searchUsersMember.some(member => member.userId === searchUser.userId),
    );

    if (!searchUsersMember.length) {
      setTotalMemberList(searchUsers);
      return;
    }
    setTotalMemberList([...searchUsersMember, ...uniqueSearchUsers]);
  }, [followingUsers, planetMember, searchUsers]);

  useEffect(() => {
    if (!searchEmail) {
      setSearchUsers([]);
    }
  }, [searchEmail]);

  useEffect(() => {
    setTotalCount(totalMemberList?.length);
  }, [totalMemberList]);

  return (
    <BoxModal onClose={onClose} title="행성 멤버 관리" size="lg">
      <S.Notification>
        <S.SearchGroup>
          <Input
            placeholder="이메일을 검색해 보세요."
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
              <b>탑승된 멤버가 없습니다.</b>
              <br />
              <span>이메일을 검색해 보세요.</span>
            </p>
          </S.NoList>
        ) : (
          <S.MemberList>
            {totalMemberList?.map(member => (
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
