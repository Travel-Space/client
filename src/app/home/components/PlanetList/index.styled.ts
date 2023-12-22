import { bodyContainer, flexAlignCenter, flexCenter, flexSpaceBetweenCenter } from "@/styles/common";
import styled, { keyframes } from "styled-components";

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(3deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

export const SwiperContainer = styled.div`
  ${bodyContainer}
  width: 100%;
  height: 100%;
  margin-bottom: 40px;

  .swiper-pagination {
    padding-top: 50px;
  }
  .swiper-pagination-bullet {
    width: 50px;
    height: 8px;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.PALETTE.white};

    &.swiper-pagination-bullet-active {
      width: 50px;
      height: 8px;
      border-radius: 12px;
      background-color: ${({ theme }) => theme.PALETTE.white};
      margin: 0 var(--swiper-pagination-bullet-horizontal-gap, 8px);
    }
  }
`;
export const StyledSwiperSlide = styled.div`
  ${flexCenter}
  text-align: center;
  font-size: ${({ theme }) => theme.FONT_SIZE.em};
  color: ${({ theme }) => theme.PALETTE.white};
  background-color: transparent;
  width: 100%;
  gap: 40px;
`;

export const SlideImage = styled.img`
  ${flexSpaceBetweenCenter}
  min-width: 180px;
  max-width: 200px;
  background-repeat: no-repeat;
  object-fit: cover;
  margin-bottom: 60px;
  animation: ${rotation} 2s ease-out 1;
`;

export const PlanetName = styled.div`
  text-align: center;
  width: 70%;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${({ theme }) => theme.PALETTE.white};
  padding: 5px;
  font-weight: 600;
  font-size: ${({ theme }) => theme.FONT_SIZE.big};
  cursor: pointer;
`;

export const PlanetImageContainer = styled.div`
  ${flexAlignCenter}
  position: relative;
  min-width: 160px;
  max-width: 200px;

  &:hover ${SlideImage} {
    opacity: 0.7;
  }
`;

export const LoadingBarWrapper = styled.div`
  height: 260px;

  & div {
    height: 100%;
  }
`;
