import styled from "styled-components";
import { bodyContainer, flexCenter, flexColumn, flexSpaceBetweenCenter } from "@/styles/common";

export const Wrap = styled.div`
  padding: 40px 0 64px;
  ${bodyContainer}
  ${flexColumn}
  justify-content: space-between;
  height: calc(100vh - 90px);
  overflow: hidden;
`;

export const Header = styled.div`
  ${flexSpaceBetweenCenter}
  & > * {
    flex: 1;
  }
`;

export const Footer = styled.div`
  ${flexSpaceBetweenCenter}
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.PALETTE.white};
  font-weight: 700;
  text-align: center;
  font-size: ${({ theme }) => theme.FONT_SIZE.hg};
  flex: 10;
`;

export const CenterGroup = styled.div`
  ${flexCenter}
  gap: 8px;
`;

export const ExitBtn = styled.button`
  background: none;
  color: ${({ theme }) => theme.PALETTE.white};
  font-size: inherit;
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.white};
`;

export const MemberBtn = styled.div`
  width: 336px;
`;

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
