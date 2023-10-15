import { styled } from "styled-components";
import { flexCenter, flexSpaceBetweenCenter } from "@/styles/common";

export const Container = styled.div`
  border-radius: 10px;
`;

export const MyPlanetWrap = styled.div`
  ${flexSpaceBetweenCenter}
`;
export const MyPlanetInfo = styled.div`
  ${flexSpaceBetweenCenter}
  margin-bottom: 24px;
`;
export const NewPlanet = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
export const MyPlanetNumber = styled.div`
  & > span {
    color: ${({ theme }) => theme.PALETTE.primary[100]};
    font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
    font-size: ${({ theme }) => theme.FONT_SIZE.md};
  }
  font-family: ${({ theme }) => theme.FONT_WEIGHT.medium};
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
`;
export const MakePlanetBtn = styled.button`
  color: ${({ theme }) => theme.PALETTE.primary[100]};
  border: 1px solid ${({ theme }) => theme.PALETTE.primary[100]};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.PALETTE.white};
  font-family: ${({ theme }) => theme.FONT_WEIGHT.medium};

  padding: 8px 16px;
`;
export const Title = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
`;
export const TravelingPlanetInfo = styled.div`
  ${flexSpaceBetweenCenter}
  margin-bottom: 24px;
  margin-top: 54px;
`;
export const TravelNumber = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
  color: ${({ theme }) => theme.PALETTE.gray[200]};

  & > span {
    color: ${({ theme }) => theme.PALETTE.gray[200]};
    font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
    font-size: ${({ theme }) => theme.FONT_SIZE.md};
  }
`;
export const TravelingPlanetWrap = styled.div`
  width: 888px;
  padding: 40px 42px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  border-radius: 10px;
`;
