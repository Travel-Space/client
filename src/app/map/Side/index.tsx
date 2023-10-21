import { createPortal } from "react-dom";
import Link from "next/link";
import { useState } from "react";

import PlanetInfo from "./Planet-Info";
import PostPreview from "./Post-Preview";

import * as S from "./index.styled";
import DropDown from "@/components/common/DropDown";

const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function Side({ onClose }: { onClose: () => void }) {
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
          <div style={{ padding: "32px 56px", background: "white", zIndex: 1 }}>
            <PlanetInfo />

            <div>
              <S.Middle>
                <div>
                  <DropDown color="none" font="md" shape="round" props={dropDownProps} />
                </div>
                <Link href={"/post/write"}>
                  <S.Button>새 글 작성</S.Button>
                </Link>
              </S.Middle>

              <S.ScrollBox>
                {number.map(num => (
                  <PostPreview />
                ))}
              </S.ScrollBox>
            </div>
          </div>
          <S.CloseBtn onClick={onClose}>←</S.CloseBtn>
        </S.Container>,
        document.body,
      )}
    </>
  );
}
