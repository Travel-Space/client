import styled, { css } from "styled-components";
import { commonContainer } from "../page.styled";
import { flexAlignCenter, flexCenter, flexColumn } from "@/styles/common";

const buttonBgReset = css`
  background: none;
  font-size: 0;
  width: 32px;
  height: 32px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

export const Wrap = styled.div`
  ${commonContainer}
  padding: 56px;
  position: relative;
  ${flexColumn}
  justify-content: space-evenly;
`;

export const ArrowLeft = styled.button`
  ${buttonBgReset}
  background-image: url("/assets/img/icons/arrow-left.svg");
`;

export const ArrowRight = styled.button`
  ${buttonBgReset}
  background-image: url("/assets/img/icons/arrow-right.svg");
`;

export const DeleteBtn = styled.button`
  position: absolute;
  background: none;
  color: ${({ theme }) => theme.PALETTE.white};
  font-size: inherit;
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.white};
  right: 0;
  top: 0;
`;

export const CenterGroup = styled.div`
  ${flexCenter}
  gap: 48px;
`;

export const Title = styled.p`
  color: ${({ theme }) => theme.PALETTE.white};
  font-weight: 700;
  text-align: center;
  font-size: ${({ theme }) => theme.FONT_SIZE.hg};
  margin: 16px 0 32px;
`;

export const Group = styled.div`
  margin-bottom: 32px;
`;

export const TagGroup = styled.ul`
  ${flexAlignCenter}
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 16px;
`;

export const Tag = styled.li`
  ${flexAlignCenter}
  background: ${({ theme }) => theme.PALETTE.white};
  padding: 8px 14px 8px 16px;
  border-radius: 100px;
  gap: 8px;
  span {
    font-weight: 600;
  }
  button {
    ${buttonBgReset}
    width: 12px;
    height: 12px;
    background-image: url("/assets/img/icons/close-mini.svg");
    margin-bottom: 1px;
  }
`;

export const ImageWrap = styled.div`
  width: 200px;
  overflow: hidden;
`;

export const ImageList = styled.div<{ $left: number }>`
  display: flex;
  position: relative;
  z-index: -1;
  left: ${props => props.$left}%;
  input {
    display: none;
  }
`;
