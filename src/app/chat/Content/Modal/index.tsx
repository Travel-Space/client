import * as S from "./index.styled";
import Line from "@/components/common/Line";

export default function Modal() {
  return (
    <S.ModalBox>
      <S.Title>
        대화 상대
        <Line />
      </S.Title>

      <S.ProfileBox>
        <S.Profile>
          <img src="/assets/img/icons/profileImage.png" />
          <span>남경남경 (나)</span>
        </S.Profile>

        <Line />

        <S.Profile>
          <img src="/assets/img/icons/profileImage.png" />
          <span>
            수민수민<strong>우주선 방장</strong>
          </span>
        </S.Profile>
        <S.Profile>
          <img src="/assets/img/icons/profileImage.png" />
          <span>현규현규</span>
        </S.Profile>
        <S.Profile>
          <img src="/assets/img/icons/profileImage.png" />
          <span>은선은선</span>
        </S.Profile>
        <S.Profile>
          <img src="/assets/img/icons/profileImage.png" />
          <span>혜진혜진</span>
        </S.Profile>
        <S.Profile>
          <img src="/assets/img/icons/profileImage.png" />
          <span>형욱형욱</span>
        </S.Profile>
        <S.Profile>
          <img src="/assets/img/icons/profileImage.png" />
          <span>이슬이슬</span>
        </S.Profile>
        <S.Profile>
          <img src="/assets/img/icons/profileImage.png" />
          <span>아연아연</span>
        </S.Profile>
        <S.Profile>
          <img src="/assets/img/icons/profileImage.png" />
          <span>보란보란</span>
        </S.Profile>
        <S.Profile>
          <img src="/assets/img/icons/profileImage.png" />
          <span>하은하은</span>
        </S.Profile>
      </S.ProfileBox>
    </S.ModalBox>
  );
}
