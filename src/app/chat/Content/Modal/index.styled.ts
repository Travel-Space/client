import styled from "styled-components";
import { flexCenter, flexColumn } from "@/styles/common";

export const ModalBox = styled.div`
  color: ${({ theme }) => theme.PALETTE.black};
  background: ${({ theme }) => theme.PALETTE.white};
  position: absolute;
  top: 20%;
  left: 80%;

  ${flexColumn}
  align-items: flex-start;

  width: 172px;
  height: 327px;
  padding: 12px 0 24px 0;

  border-radius: 5px;
  border: 1px solid #d9d9d9;
`;

export const Title = styled.div`
  ${flexColumn}
  align-items: center;
  gap: 8px;
  width: 100%;

  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
`;

export const ProfileBox = styled.div`
  overflow: scroll;
  padding: 4px 8px 0 10px;
  width: 100%;
  ${flexColumn}
  align-items: flex-start;
`;

export const Profile = styled.div`
  ${flexCenter}
  gap: 8px;
  margin: 4px 0 4px 0;

  & span {
    font-size: ${({ theme }) => theme.FONT_SIZE.xs};

    > strong {
      color: ${({ theme }) => theme.PALETTE.mainColor};
      margin: 0 0 0 8px;
      font-size: ${({ theme }) => theme.FONT_SIZE.es};
    }
  }

  & img {
    width: 25px;
    height: 25px;
  }
`;
