import { flexSpaceBetweenCenter, flexAlignCenter } from "@/styles/common";
import styled from "styled-components";

export const Content = styled.div`
  width: 256px;
  ul > li {
    margin-bottom: 16px;
  }

  ul > li > span {
    display: block;
    margin-bottom: 8px;
    font-weight: 700;
    font-size: ${({ theme }) => theme.FONT_SIZE.md};
  }

  p {
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    font-weight: 500;
    color: ${({ theme }) => theme.PALETTE.gray[200]};
  }
`;

export const ImgBox = styled.div`
  background-color: #ccc;
  width: 100%;
  height: 146px;
  text-align: center;
  ${flexSpaceBetweenCenter}
  margin-bottom: 24px;
  cursor: pointer;
  > img {
    width: 100%;
    height: 100%;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 8px;
  background-color: ${({ theme }) => theme.PALETTE.black};
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  font-weight: 700;
  color: ${({ theme }) => theme.PALETTE.white};
  margin-bottom: 16px;
`;

export const ButtonContainer = styled.div`
  ${flexSpaceBetweenCenter}
  gap: 16px;
`;

export const ButtonAccept = styled(Button)`
  border-radius: 5px;
  color: ${({ theme }) => theme.PALETTE.white};
  background-color: ${({ theme }) => theme.PALETTE.mainColor};
  margin-bottom: 0;
`;

export const ButtonRefuse = styled(ButtonAccept)`
  background-color: ${({ theme }) => theme.PALETTE.white};
  color: ${({ theme }) => theme.PALETTE.mainColor};
  border: 2px solid ${({ theme }) => theme.PALETTE.mainColor};
`;
