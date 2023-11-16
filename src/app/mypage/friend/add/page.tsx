"use client";
import axiosRequest from "@/api";
import { ResData, FollowersType, SearchItem, UsersType, User } from "@/@types";

import { useRecoilState } from "recoil";
import { notMutualState } from "@/recoil/atoms/friend.atom";
import { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import * as S from "./page.styled";

import RecommendFriend from "./RecommendFriend";
import SearchForm from "@/app/mypage/SearchForm";
import Nothing from "@/components/common/Nothing";
import Person from "@/app/mypage/friend/Person";

export default function Planet() {
  const [selectedMenu, setSelectedMenu] = useState("닉네임");
  const dropDownProps = {
    menuList: ["닉네임", "계정"],
    selectedMenu: selectedMenu, //선택한 메뉴
    handleClick: setSelectedMenu, //메뉴를 클릭했을 때 실행될 메서드
    placeholder: "친구 추가에서 검색합니다.",
  };

  const [page, setPage] = useState(1);
  const limit = 10;

  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);

  const [notMutualFriends, setNotMutualFriends] = useRecoilState(notMutualState);

  const [searchItem, setSearchItem] = useState<SearchItem>();

  const handleSearch = (item: SearchItem) => {
    setSearchItem(item);
    // console.log("searchItem", item);
  };

  //모든유저 조회
  async function getUsers(page: number, limit: number) {
    try {
      const response = await axiosRequest.requestAxios<ResData<UsersType>>(
        "get",
        `/user?page=${page}&limit=${limit}&${searchItem?.selectedMenu}=${searchItem?.content}`,
      );
      const users = response.data.data;
      const total = response.data.total;

      if (page === 1) setUsers(users);
      else setUsers(prev => [...prev, ...users]);

      setTotalUsers(total);
      // console.log("followings", response.data);
    } catch (error) {
      alert("유저 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching followers data: ", error);
    }
  }

  //추천친구 조회
  //무한스크롤 추후 적용 - 수정예정
  async function getNotMutualFriends() {
    try {
      const response = await axiosRequest.requestAxios<ResData<FollowersType>>("get", `/user/followers/not-mutual`);
      setNotMutualFriends(response.data.data);
      // console.log("notMutualFriends", response.data);
    } catch (error) {
      alert("팔로워 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching followers data: ", error);
    }
  }

  const updateData = () => {
    searchItem && getUsers(1, page * limit);
    getNotMutualFriends();
  };
  const showMore = () => {
    setPage(prev => prev + 1);
    // console.log("page", page);
  };

  useEffect(() => {
    // console.log("notMutual", notMutual);
    getNotMutualFriends();
  }, []);

  useEffect(() => {
    if (searchItem) {
      setPage(1);
      getUsers(page, limit);
      // console.log("searchItem", searchItem);
    }
  }, [searchItem]);

  useEffect(() => {
    searchItem && getUsers(page, limit);
    // console.log("page", page, "searchItem", searchItem);
  }, [page]);

  return (
    <S.Container>
      <S.Row>
        <S.Title>추천 친구</S.Title>
        <SearchForm select={dropDownProps} onSearch={handleSearch} />
      </S.Row>
      <S.SwiperWrap>
        <Swiper
          slidesPerView={5}
          slidesPerGroup={5}
          spaceBetween={24}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {notMutualFriends.map((el, idx) => (
            <SwiperSlide>
              <RecommendFriend key={`notMutualFriend${idx}`} data={el} updateData={updateData} />
            </SwiperSlide>
          ))}
        </Swiper>
      </S.SwiperWrap>

      {searchItem?.content && totalUsers ? (
        <>
          <S.SearchResults>
            {users.map((el, idx) => (
              <Person key={`user${idx}`} data={el} isMutual={el.isFollowing} updateData={updateData} />
            ))}
          </S.SearchResults>
          <S.ShowMoreBtn onClick={showMore} disabled={users.length === totalUsers}>
            목록 더보기
          </S.ShowMoreBtn>
        </>
      ) : (
        <Nothing
          src="/assets/img/icons/no-friends.svg"
          alt="no-friends"
          width={216}
          height={216}
          comment="검색결과가 없습니다."
          suggest="닉네임 또는 계정을 검색해 보세요."
          font="lg"
        />
      )}
    </S.Container>
  );
}
