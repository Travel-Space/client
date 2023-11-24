import Button from "@/components/common/Button";
import * as S from "../index.styled";
import { useContext, useRef } from "react";
import { useRouter } from "next/navigation";
import { SpaceshipContext, SpaceshipContextType } from "..";

export default function SpaceshipTop() {
  const { planetData } = useContext<SpaceshipContextType>(SpaceshipContext);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleShare = async () => {
    // if (typeof navigator.share !== "undefined") {
    //   try {
    //     await navigator.share({
    //       title: "",
    //       text: "",
    //       url: "",
    //     });
    //     console.log("공유 성공");
    //   } catch (e) {
    //     console.log("공유 실패");
    //   }
    // } else {
    //   // navigator를 지원하지 않는 경우
    //   console.log(typeof navigator.share);
    // }
    if (navigator.clipboard) {
      console.log("navigator.clipboard");
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("탑승링크가 복사되었습니다!");
      } catch (error) {
        alert("복사를 다시 시도해 주세요.");
        console.log(error);
      }
    } else {
      console.log("document.execCommand('copy')");
      inputRef.current?.select();
      try {
        document.execCommand("copy");
        alert("탑승링크가 복사되었습니다!");
      } catch (error) {
        alert("복사를 다시 시도해 주세요.");
        console.log(error);
      }
    }
  };

  return (
    <S.Header>
      <Button variant="basic" size="normal" shape="large" onClick={() => router.back()}>
        <img src="/assets/img/icons/prev-white.svg" height={16} />
      </Button>
      <S.Title>{planetData.name}</S.Title>
      <Button variant="basic" size="normal" shape="large" onClick={handleShare}>
        <S.CenterGroup>
          <span>탑승 링크</span>
          <img src="/assets/img/icons/share-white.svg" height={16} />
          <input
            ref={inputRef}
            style={{ opacity: 0, pointerEvents: "none", position: "absolute" }}
            defaultValue={window.location.href}
          />
        </S.CenterGroup>
      </Button>
    </S.Header>
  );
}
