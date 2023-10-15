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
  height: 250px;
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  color: ${({ theme }) => theme.PALETTE.white};
  gap: 40px;
`;

export const SlideImage = styled.img`
  display: block;
  width: 220px; 
  height: 220px;
  margin-bottom:56px;
`;
