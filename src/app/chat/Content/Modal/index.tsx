import * as S from "./index.styled";
import Line from "@/components/common/Line";

const name = [
  { name: "수민수민", role: "우주선 방장" },
  { name: "현규현규", role: "일반" },
  { name: "은선은선", role: "일반" },
  { name: "혜진혜진", role: "일반" },
  { name: "형욱형욱", role: "일반" },
  { name: "이슬이슬", role: "일반" },
  { name: "아연아연", role: "일반" },
  { name: "보란보란", role: "일반" },
  { name: "하은하은", role: "일반" },
];

export default function Modal() {
  return (
    <S.ModalBox>
      <S.Title>
        대화 상대
        <Line size="horizontal" color="gray" />
      </S.Title>

      <S.ProfileBox>
        <S.Profile>
          <img src="/assets/img/icons/profileImage.png" />
          <span>남경남경 (나)</span>
        </S.Profile>

        <Line size="horizontal" color="gray" />

        {name.map(el => (
          <S.Profile>
            <img src="/assets/img/icons/profileImage.png" />
            <span>
              {el.name}
              {el.role === "우주선 방장" ? <strong>우주선 방장</strong> : ""}
            </span>
          </S.Profile>
        ))}
      </S.ProfileBox>
    </S.ModalBox>
  );
}
