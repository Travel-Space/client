import { createPortal } from "react-dom";
import Link from "next/link";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { usePathname } from "next/navigation";

import { Posting } from "@/@types/Posting";
import { ArticleProps } from "../page";
import { userAtom } from "@/recoil/atoms/user.atom";

import PlanetInfo from "./Planet-Info";
import PostPreview from "./Post-Preview";

import * as S from "./index.styled";
import DropDown from "@/components/common/DropDown";
import Nothing from "@/components/common/Nothing";

export default function Side({ onClose, article, params }: ArticleProps) {
  const { isAuth, memberships } = useRecoilValue(userAtom);

  const pathname = usePathname();
  const planetId = Number(pathname.split("/")[2]);

  const [selectedMenu, setSelectedMenu] = useState("전체");

  // 드롭다운 메뉴
  const dropDownProps = {
    comment: "", //미선택시 보여질 문구(필요할 때만 추가)
    menuList: ["전체", "우주선"],
    selectedMenu: selectedMenu, //선택한 메뉴를 저장할 변수
    handleClick: setSelectedMenu, //메뉴를 클릭했을 때 실행될 메서드를 전달해주세요
  };

  // 행성의 관리자 / 부관리자가 아니라면 혹은 행성 멤버를 가져오는 롤
  // 1. 행성에 가입되어 있는지 확인 / 2. 관리자인지 확인 / 3. 부 관리자인지 확인
  const role = {
    OWNER: {
      roles: "관리자",
      tag: ["행성 관리", "우주선"],
      link: [`/planet/${planetId}/modify`, `/planet/${planetId}/space-ship`],
    },
    ADMIN: {
      roles: "부관리자",
      tag: "행성 관리",
      link: `/planet/${planetId}/modify`,
    },
    MEMBER: {
      roles: "일반",
      tag: "우주선",
      link: `/planet/${planetId}/space-ship`,
    },
    GUEST: {
      roles: "게스트",
      tag: "행성 탑승",
    },
  };

  const planetJoinRoleCheck = () => {
    const memberCheck = memberships.planets.find(el => el?.planetId === planetId);

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
            <PlanetInfo role={roleCheck()} />

            <div>
              <S.Middle>
                <div>
                  <DropDown color="none" font="md" shape="round" props={dropDownProps} />
                </div>

                {isAuth && checkJoin() && (
                  <Link href={`/planet/${params}/post/write`}>
                    <S.Button>새 글 작성</S.Button>
                  </Link>
                )}
              </S.Middle>

              <S.ScrollBox>
                <S.ScrollBox>
                  {!article.length && (
                    <Nothing
                      src="/assets/img/icons/no-postings.svg"
                      alt="no-postings"
                      width={60}
                      height={60}
                      comment="현재 작성된 게시글이 없습니다."
                      suggest={checkJoin() ? "먼저 게시글을 작성해 보세요." : "행성에 가입한 후 글을 작성해 보세요."}
                      font="sm"
                    />
                  )}

                  {Array.isArray(article) &&
                    article.map((article: Posting) => <PostPreview article={article} params={params} />)}
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
