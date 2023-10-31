import { styled } from "styled-components";
import { flexSpaceBetweenCenter } from "@/styles/common";

export const Container = styled.div``;

export const MyPlanets = styled.div`
  ${flexSpaceBetweenCenter}
`;

export const FavoritePlanets = styled.div`
  width: 888px;
  padding: 24px 42px;
  margin-top: 24px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  border-radius: 10px;

  & > div:nth-child(10n) {
    border: none;
  }
  & > div:last-child {
    border: none;
  }
`;
export const FavoritePlanetsInfo = styled.div`
  ${flexSpaceBetweenCenter}
  margin-bottom: 24px;
  margin-top: 54px;
`;
export const PlanetsNumber = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-weight: 400;
  color: ${({ theme }) => theme.PALETTE.gray[200]};

  & > span {
    color: ${({ theme }) => theme.PALETTE.gray[200]};
    font-weight: 700;
    font-size: ${({ theme }) => theme.FONT_SIZE.md};
  }
`;
export const Row = styled.div`
  ${flexSpaceBetweenCenter}
  margin-bottom: 24px;
`;
export const Title = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-weight: 700;
`;
