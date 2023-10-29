import { flexCenter } from "@/styles/common";
import { styled } from "styled-components";

export const EditImgBtn = styled.label`
  background-image: url("/assets/img/icons/modify.svg");
  background-repeat: no-repeat;
  width: 24px;
  height: 25px;
  cursor: pointer;

  position: absolute;
  right: 0;
  bottom: 0;
`;
export const DeleteImgBtn = styled.button`
  background-color: transparent;
  background-image: url("/assets/img/icons/black-minus.svg");
  background-repeat: no-repeat;
  width: 24px;
  height: 24px;
  position: absolute;
  right: 0;
  top: 0;
`;
export const ProfileImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  & > img {
    width: 120px;
    height: 120px;
    border-radius: 60px;
  }
`;
export const ProfileCover = styled.div`
  & > img {
    width: 120px;
    height: 120px;
    border-radius: 60px;
  }
`;
export const Loading = styled.div`
  background-color: ${({ theme }) => theme.PALETTE.mainColor};
  color: ${({ theme }) => theme.PALETTE.white};
  width: 120px;
  height: 120px;
  border-radius: 60px;
  font-weight: 500;
  ${flexCenter}
`;
