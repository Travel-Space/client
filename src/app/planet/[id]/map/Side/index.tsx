import { createPortal } from "react-dom";
import Link from "next/link";
import { useState } from "react";

import { Posting } from "@/@types/Posting";
import { ArticleProps } from "../page";

import PlanetInfo from "./Planet-Info";
import PostPreview from "./Post-Preview";

import * as S from "./index.styled";
import DropDown from "@/components/common/DropDown";
import Nothing from "@/components/common/Nothing";

export default function Side({ onClose, article, params }: ArticleProps) {
  const [selectedMenu, setSelectedMenu] = useState("전체");

  const dropDownProps = {
    comment: "", //미선택시 보여질 문구(필요할 때만 추가)
    menuList: ["전체", "우주선"],
    selectedMenu: selectedMenu, //선택한 메뉴를 저장할 변수
    handleClick: setSelectedMenu, //메뉴를 클릭했을 때 실행될 메서드를 전달해주세요
  };

  return (
    <>
      {createPortal(
        <S.Container>
          <S.Wrapper>
            <PlanetInfo />

            <div>
              <S.Middle>
                <div>
                  <DropDown color="none" font="md" shape="round" props={dropDownProps} />
                </div>
                <Link href={`/planet/${params}/post/write`}>
                  <S.Button>새 글 작성</S.Button>
                </Link>
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
                      suggest="먼저 게시글을 작성해 보세요."
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
