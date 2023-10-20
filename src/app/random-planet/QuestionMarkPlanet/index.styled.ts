import styled, { keyframes } from "styled-components";
import { flexColumnCenter, flexCenter } from "@/styles/common";

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(10deg);
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
  animation: ${props => props.animate ? rotation : "none"} 2s ease-out;
`;

export const RamdomBtn = styled.div`
  ${flexCenter}
  border-radius: 40px;
  border: 1px solid ${({ theme }) => theme.PALETTE.white};
  padding: 13px 40px;
  margin-bottom: 40px;
  text-align: center;
  color: ${({ theme }) => theme.PALETTE.white};
  gap: 16px;
`;

export const RightArrow = styled.img`
  width: 24px;
  height: 24px;
  background-color: transparent;
  background-repeat: no-repeat;
  background-size: cover;
`;
