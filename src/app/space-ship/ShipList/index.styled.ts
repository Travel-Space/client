import styled from "styled-components";
import { Swiper } from "swiper/react";

export const List = styled(Swiper)`
  width: 100%;
  overflow: visible;

  .swiper-pagination {
    bottom: -152px;
    width: auto;
    left: 50%;
    transform: translateX(-50%);

    .swiper-pagination-bullet {
      width: 16px;
      height: 16px;
      background: ${({ theme }) => theme.PALETTE.white};
    }
  }
`;
