import { styled } from "styled-components";
import { flexSpaceBetweenCenter, flexCenter } from "@/styles/common";

export const Container = styled.div``;
export const SwiperWrap = styled.div`
  position: relative;
  & > div.swiper {
    ${flexCenter}
    & > div.swiper-button-prev {
      position: absolute;
      left: -2px;
    }
    & > div.swiper-button-next {
      position: absolute;
      right: -2px;
    }
    & > div > div.swiper-slide {
      width: 152px;
      padding: 10px 3px;
    }
  }
`;
export const SearchResults = styled.div`
  width: 888px;
  margin-top: 44px;
  padding: 24px 42px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  border-radius: 10px;

  & > div:nth-child(10n) {
    border: none;
  }
`;
export const Row = styled.div`
  ${flexSpaceBetweenCenter}
  margin-bottom: 14px;
`;
export const Title = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-weight: 700;
`;
export const ShowMoreBtn = styled.button`
  width: 140px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  background-color: ${({ theme }) => theme.PALETTE.white};
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-weight: 500;
  ${flexCenter}
  margin: 40px auto 0;
`;
