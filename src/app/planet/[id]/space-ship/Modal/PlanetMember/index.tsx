import BoxModal from "@/components/common/BoxModal";
import * as S from "./index.styled";
import Member from "@/components/SpaceModal/Member";
import { Default } from "@/@types/Modal";
import { CommonUserInfo, User, UsersType } from "@/@types/User";
import { useContext, useEffect, useState } from "react";
import axiosRequest from "@/api";
import { ResData } from "@/@types";
import { AxiosError } from "axios";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { SpaceshipContext, SpaceshipContextType } from "@/@types/Spaceship";

export default function PlanetMember({ onClose }: Default) {
  const { planetId, planetMember, fetchMemberListData } = useContext<SpaceshipContextType>(SpaceshipContext);
  const [updatedPlanetMember, setUpdatedPlanetMember] = useState<CommonUserInfo[]>([]);
  const [followingList, setFollowingList] = useState<CommonUserInfo[]>([]);
  const [searchUsers, setSearchUsers] = useState<CommonUserInfo[]>([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [searchEmail, setSearchEmail] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

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
  function handleSearchButtonClick() {
    getSearchUsers({
      key: "Enter",
      nativeEvent: { isComposing: false },
    } as React.KeyboardEvent<HTMLInputElement>);
  }

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
        console.log("resultUser", resultUser);
        if (resultUser.length !== 0) {
          setSearchUsers(resultUser);
        } else {
          // console.log("검색 결과 없음");
          setTotalCount(0);
          setUpdatedPlanetMember([]);
        }
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
    const planetFollowingMember = [...planetMember, ...followingList].filter(
      (value, index, self) => self.findIndex(el => el.userId === value.userId) === index,
    );
    setUpdatedPlanetMember(planetFollowingMember);

    if (searchUsers.length !== 0) {
      const searchUsersMember = [...planetMember, ...searchUsers]
        .filter((value, index, self) => self.findIndex(el => el.userId === value.userId) === index)
        .filter(
          updatedUser =>
            planetMember.some(planetUser => planetUser.userId === updatedUser.userId) &&
            searchUsers.some(searchUser => searchUser.userId === updatedUser.userId),
        );
      if (searchUsersMember.length !== 0) {
        setUpdatedPlanetMember(searchUsersMember);
      } else {
        setUpdatedPlanetMember(searchUsers);
      }
    }
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
              <span>이메일을 검색해보세요.</span>
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
