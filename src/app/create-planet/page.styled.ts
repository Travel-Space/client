import styled, { css } from "styled-components";
import { bodyContainer, flexAlignCenter, flexCenter } from "@/styles/common";
import { InputGroup as IG } from "@/components/Account/common.styled";

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
  ${bodyContainer}
  display: flex;
  gap: 48px;
  padding: 40px 0 64px;
`;

export const Container = styled.div`
  flex: 1;
  padding: 56px;
  position: relative;
  &.left {
  }
  &.right {
    background-color: ${({ theme }) => theme.PALETTE.white};
    border-radius: 10px;
  }
`;

export const Center = styled.div`
  ${flexCenter}
  gap: 24px;
`;

export const InputGroup = styled(IG)`
  margin-bottom: 24px;
  width: 100%;
`;

export const TagGroup = styled(IG)`
  margin-bottom: 88px;
  width: 100%;
  ul {
    margin-top: 24px;
    ${flexAlignCenter}
    gap: 16px;
    flex-wrap: wrap;
    li {
      ${flexAlignCenter}
      background: ${({ theme }) => theme.PALETTE.white};
      padding: 8px 16px;
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
      }
    }
  }
`;

export const AdjustBtnGroup = styled(IG)`
  margin-bottom: 24px;
  width: 100%;
`;

export const ArrowLeft = styled.button`
  ${buttonBgReset}
  background-image: url("/assets/img/icons/arrow-left.svg");
`;

export const ArrowRight = styled.button`
  ${buttonBgReset}
  background-image: url("/assets/img/icons/arrow-right.svg");
`;

export const DeletePlanetBtn = styled.button`
  position: absolute;
  background: none;
  color: ${({ theme }) => theme.PALETTE.white};
  font-family: inherit;
  font-size: inherit;
  border-bottom: 1px solid white;
  right: 0;
  top: 0;
`;

export const PlanetTitle = styled.p`
  color: ${({ theme }) => theme.PALETTE.white};
  font-weight: 700;
  text-align: center;
  font-size: ${({ theme }) => theme.FONT_SIZE.hg};
  margin: 56px 0;
`;
