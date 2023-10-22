import styled, { keyframes } from "styled-components";
import { flexColumnCenter, flexCenter } from "@/styles/common";

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(8deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

export const Wrapper = styled.div`
  ${flexColumnCenter}
  gap:56px;
  margin-top: 72px;

  & a {
    text-decoration: none;
  }
`;

export const PlanetImg = styled.img<{ animate?: boolean }>`
  width: 240px;
  height: 240px;
  cursor: pointer;
  background-color: transparent;
  background-repeat: no-repeat;
  transition: transform 0.3s ease;
  animation: ${props => (props.animate ? rotation : "none")} 2s ease-out;
`;

export const RamdomBtn = styled.div`
  ${flexCenter}
  width: 256px;
  height: 54px;
  border-radius: 40px;
  border: 1px solid ${({ theme }) => theme.PALETTE.white};
  padding: 15px;
  font-size: ${({ theme }) => theme.FONT_SIZE.em};
  margin-bottom: 40px;
  text-align: center;
  color: ${({ theme }) => theme.PALETTE.white};
  gap: 16px;
  font-weight: 700;
`;

export const RightArrow = styled.img`
  width: 24px;
  height: 24px;
  background-color: transparent;
  background-repeat: no-repeat;
  background-size: cover;
`;
