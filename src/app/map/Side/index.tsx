import { createPortal } from "react-dom";
import Link from "next/link";

import Planet from "./Planet";
import PostPreview from "./Post-Preview";

import * as S from "./index.styled";
import Line from "@/components/common/Line";

const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function Side() {
  return (
    <>
      {createPortal(
        <S.Container>
          <Planet />

          <div>
            <S.Middle>
              <select>
                <option value="">전체</option>
                <option value="">우주선</option>
              </select>

              <Link href={"/post/write"}>
                <S.Button>새 글 작성</S.Button>
              </Link>
            </S.Middle>

            <S.ScrollBox>
              {number.map(num => (
                <>
                  <Line />
                  <PostPreview />
                </>
              ))}
            </S.ScrollBox>
          </div>
        </S.Container>,
        document.body,
      )}
    </>
  );
}