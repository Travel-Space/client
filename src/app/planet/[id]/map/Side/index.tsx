import { createPortal } from "react-dom";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { useEffect, useRef, useState } from "react";

import { Posting } from "@/@types/Posting";
import { userAtom } from "@/recoil/atoms/user.atom";
import axiosRequest from "@/api";
import { Planet, ResData } from "@/@types";
import { Spaceship } from "@/@types/Spaceship";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

import PlanetInfo from "./Planet-Info";
import PostPreview from "./Post-Preview";

import * as S from "./index.styled";
import DropDown from "@/components/common/DropDown";
import Nothing from "@/components/common/Nothing";
import MESSAGE from "@/constants/message";
import { MembershipStatus } from "@/@types/Member";
import { Locations } from "@/@types/Locations";

export interface ArticleProps {
  params: Number;
  clickMarker?: boolean;
  onClose?: () => void;
  article?: Posting;
  markerLocation?: Locations | undefined;
}

export default function Side({ onClose, clickMarker, params, markerLocation }: ArticleProps) {
  const user = useRecoilValue(userAtom);

  const { latitude, longitude } = markerLocation;

  // 드롭 다운 메뉴
  const [spaceship, setSpaceship] = useState<string[]>([]);
  const [selectedMenu, setSelectedMenu] = useState("전체");

  // ===================================== 게시글 무한 스크롤 로직 =====================================

  // 게시글 정보
  const [article, setArticle] = useState<Partial<Posting[]>>([]);

  // 페이지 정보 및 게시글 불러올 갯수
  const [currentPage, setCurrentPage] = useState(1);

  // 게시글 불러오기 스탑
  const [disableLoadData, setDisableLoadDate] = useState(false);

  // 무한 스크롤 옵저버 인식 부분
  const observerRef = useRef<HTMLDivElement | null>(null);

  // 지도 페이지 들어가서 전체 게시글 조회해서 무한 스크롤 되는 api (우주선 상관 o) = 사이드 바만 열었을 경우
  // 지도 페이지 들어가서 마커에 해당하는 게시글만 조회해서 무한 스크롤 되는 api (우주선 상관 o) = 마커 클릭했을 경우
  const getArticle = async () => {
    try {
      const dropdown = selectedMenu === "전체" ? "" : `&spaceshipName=${selectedMenu}`;
      console.log(dropdown);
      const response = await axiosRequest.requestAxios<ResData<Posting[]>>(
        "get",
        clickMarker
          ? `/articles/byLocation?planetId=${params}&latitude=${latitude}&longitude=${longitude}&radius=100&page=${currentPage}&limit=10${dropdown}` // 마커 클릭 시 좌표 값 넘겨서 게시글 가져오기
          : `/articles/byPlanet?planetId=${params}&page=${currentPage}&limit=10${dropdown}`,
      );
      const data = response.data.articles;

      console.log(data);
      console.log(article, `${currentPage}번째 페이지`);

      if (!data.length && response.total === 0) {
        setDisableLoadDate(true);
        setArticle(data);
        return;
      }

      if (currentPage === 1) setArticle(data);
      else setArticle(prev => [...prev, ...data]);
    } catch (error) {
      console.error("에러 발생: ", error);
    }
  };

  const loadData = async () => {
    if (disableLoadData) return;
    await getArticle();
    setCurrentPage(prev => prev + 1);
  };

  const { setTargetRef } = useInfiniteScroll(loadData, [currentPage]);

  useEffect(() => {
    if (observerRef.current) {
      setTargetRef(observerRef);
    }
  }, [observerRef, setTargetRef]);

  useEffect(() => {
    getArticle();
  }, [selectedMenu]);

  // ===================================== 드롭 다운 메뉴 가져오기 =====================================

  // 드롭 다운 메뉴 받아오는 api
  const getSpaceshipInfo = async () => {
    try {
      if (user?.isAuth) {
        const response = await axiosRequest.requestAxios<ResData<Spaceship>>("get", `/spaceship/by-planet/${params}`);
        const spaceshipName = response.data.map((el: Spaceship) => el.name);

        setSpaceship(["전체", ...spaceshipName]);
      }
    } catch (error) {
      alert("spaceship name error");
      console.error(error);
    }
  };

  useEffect(() => {
    getSpaceshipInfo();
  }, []);

  // 드롭다운 메뉴
  const dropDownProps = {
    comment: "", // 미선택시 보여질 문구(필요할 때만 추가)
    menuList: spaceship,
    selectedMenu: selectedMenu, // 선택한 메뉴를 저장할 변수
    handleClick: setSelectedMenu, // 메뉴를 클릭했을 때 실행될 메서드를 전달
  };

  // ===================================== 행성 정보 =====================================

  const [planetInfo, setPlanetInfo] = useState<Partial<Planet>>({});
  const [membership, setMembership] = useState<Partial<MembershipStatus>>();

  const [liked, setLiked] = useState(false);

  // 특정 행성 정보
  const getPlanetInfo = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<Planet>>("get", `/planet/${params}`);
      const data = response.data;
      const memberStatus = data.members.filter(el => el.userId === user?.id)[0];
      const bookmarkCheck = data.planetBookMark.filter(el => el.userId === user?.id).length === 1;

      setPlanetInfo(data);
      setLiked(bookmarkCheck);
      setMembership(memberStatus.status);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPlanetInfo();
  }, []);

  // ===================================== 멤버 롤 체크 =====================================

  // 행성의 관리자 / 부관리자가 아니라면 혹은 행성 멤버를 가져오는 롤
  // 1. 행성에 가입되어 있는지 확인 / 2. 관리자인지 확인 / 3. 부 관리자인지 확인
  const role = {
    OWNER: {
      roles: "관리자",
      tag: ["행성 관리", "우주선"],
      link: [`/planet/${params}/modify`, `/planet/${params}/space-ship`],
    },
    ADMIN: {
      roles: "부관리자",
      tag: "행성 관리",
      link: `/planet/${params}/modify`,
    },
    MEMBER: {
      roles: "일반",
      tag: "우주선",
      link: `/planet/${params}/space-ship`,
    },
    GUEST: {
      roles: "게스트",
      tag: "행성 탑승",
    },
  };

  const planetJoinRoleCheck = () => {
    const memberCheck = user?.memberships.planets.find(el => el?.planetId === Number(params));

    const checkJoin = () => {
      if (memberCheck === undefined) return false;
      return true;
    };

    const roleCheck = () => {
      switch (memberCheck?.role) {
        case "OWNER":
          return role.OWNER;
        case "ADMIN":
          return role.ADMIN;
        case "MEMBER":
          return role.MEMBER;
        default:
          return role.GUEST;
      }
    };

    return { checkJoin, roleCheck };
  };

  const { checkJoin, roleCheck } = planetJoinRoleCheck();

  return (
    <>
      {createPortal(
        <S.Container>
          <S.Wrapper>
            <PlanetInfo
              role={roleCheck()}
              planetInfo={planetInfo}
              membership={membership}
              liked={liked}
              setLiked={setLiked}
            />

            <div>
              <S.Middle>
                <div>
                  <DropDown color="none" font="md" shape="round" props={dropDownProps} />
                </div>

                {user?.isAuth && checkJoin() && (
                  <Link href={`/planet/${params}/post/write`}>
                    <S.Button>새 글 작성</S.Button>
                  </Link>
                )}
              </S.Middle>

              <S.ScrollBox>
                <S.ScrollBox>
                  {!article?.length && (
                    <Nothing
                      src="/assets/img/icons/no-postings.svg"
                      alt="no-postings"
                      width={60}
                      height={60}
                      comment="현재 작성된 게시글이 없습니다."
                      suggest={checkJoin() ? MESSAGE.PLANET.FIRST_POST : MESSAGE.PLANET.JOIN_POST}
                      font="sm"
                    />
                  )}

                  {Array.isArray(article) &&
                    article.map((article: Posting | undefined) => <PostPreview article={article} params={params} />)}
                  <S.ObserverRef ref={observerRef} />
                </S.ScrollBox>
              </S.ScrollBox>
            </div>
          </S.Wrapper>

          <S.CloseBtn onClick={onClose}>←</S.CloseBtn>
        </S.Container>,
        document.body,
      )}
    </>
  );
}
