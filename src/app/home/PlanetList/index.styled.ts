import { flexSpaceBetweenCenter } from "@/styles/common";
import styled from "styled-components";

export const SwiperContainer = styled.div`
  width: 100%;
  height: 100%;
  

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
  gap: 40px;
  width: 100%;
`;

export const SlideImage = styled.img`
  height: 100%;
  background-repeat: no-repeat;
  object-fit: cover;
  margin-bottom: 56px;
`;
