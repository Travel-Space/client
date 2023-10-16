import { bodyContainer, flexSpaceBetweenCenter } from "@/styles/common";
import styled from "styled-components";

export const SwiperContainer = styled.div`
  ${bodyContainer}
  width: 100%;
  height: 100%;
  margin-bottom: 40px;

  .swiper-pagination-bullet {
    width: 40px;
    height: 5px;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.PALETTE.white};

    &.swiper-pagination-bullet-active {
      width: 40px;
      height: 5px;
      border-radius: 12px;
      background-color: ${({ theme }) => theme.PALETTE.white};
    }
  }
`;
export const StyledSwiperSlide = styled.div`
  ${flexSpaceBetweenCenter}
  text-align: center;
  font-size: ${({ theme }) => theme.FONT_SIZE.em};
  color: ${({ theme }) => theme.PALETTE.white};
  background-color: transparent;
  width: 100%;
`;

export const SlideImage = styled.img`
  min-width: 160px;
  max-width: 200px;
  background-repeat: no-repeat;
  object-fit: cover;
  margin-bottom: 56px;
`;
