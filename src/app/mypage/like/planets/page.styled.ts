import { styled } from "styled-components";
import { flexCenter, flexSpaceBetweenCenter } from "@/styles/common";

export const Container = styled.div``;

export const MyPlanets = styled.div`
  ${flexCenter}
`;
export const NoMyPlanets = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  color: ${({ theme }) => theme.PALETTE.gray[100]};
  margin-top: 30px;
  border-radius: 5px;
  padding: 8px 16px;
`;
export const NothingContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  border-radius: 10px;
`;
export const FavoritePlanets = styled.div`
  width: 888px;
  padding: 24px 42px;
  margin-top: 24px;
  margin-bottom: 40px;
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
