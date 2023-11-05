import { styled } from "styled-components";
import { flexSpaceBetweenCenter } from "@/styles/common";

export const Container = styled.div`
  border-radius: 10px;
`;

export const MyPlanetWrap = styled.div`
  display: flex;
  gap: 32px;
`;
export const NoMyPlanets = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  color: ${({ theme }) => theme.PALETTE.gray[100]};
  margin-top: 30px;
  border-radius: 5px;
  padding: 8px 16px;
`;
export const MyPlanetInfo = styled.div`
  ${flexSpaceBetweenCenter}
  margin-bottom: 24px;
`;

export const NewPlanet = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  & > a > button {
    padding: 8px 16px;
  }
`;
export const MyPlanetNumber = styled.div`
  & > span {
    color: ${({ theme }) => theme.PALETTE.primary[100]};
    font-weight: 700;
    font-size: ${({ theme }) => theme.FONT_SIZE.md};
  }
  font-weight: 500;
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
`;

export const Title = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-weight: 700;
`;
export const JoinedPlanetInfo = styled.div`
  ${flexSpaceBetweenCenter}
  margin-bottom: 24px;
  margin-top: 54px;
`;
export const TravelNumber = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-weight: 400;
  color: ${({ theme }) => theme.PALETTE.gray[200]};

  & > span {
    color: ${({ theme }) => theme.PALETTE.gray[200]};
    font-weight: 700;
    font-size: ${({ theme }) => theme.FONT_SIZE.md};
  }
`;
export const JoinedPlanetList = styled.div`
  width: 888px;
  padding: 24px 42px;
  margin-bottom: 40px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  border-radius: 10px;

  & > div:nth-child(10n) {
    border-bottom: none;
  }
  & > div:last-child {
    border-bottom: none;
  }
`;
