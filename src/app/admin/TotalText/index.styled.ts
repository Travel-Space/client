import styled from "styled-components";
import { flexAlignCenter, flexCenter, flexSpaceBetweenCenter } from "@/styles/common";

export const Container = styled.div`
  p {
    font-weight: 700;
    font-size: ${({ theme }) => theme.FONT_SIZE.em};
  }

  span {
    color: ${({ theme }) => theme.PALETTE.mainColor};
  }
`;
