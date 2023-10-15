import styled from "styled-components";
import { flexColumn, flexSpaceBetweenCenter } from "@/styles/common";

export const ContentBox = styled.div`
  width: 100%;
  height: 100%;
  ${flexColumn}
  justify-content: space-between;
  color: ${({ theme }) => theme.PALETTE.white};
`;

export const Wrapper = styled.div``;

export const Top = styled.div`
  padding: 24px 16px;
  ${flexSpaceBetweenCenter}
`;

export const Title = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.em};
  font-weight: 600;

  > strong {
    color: ${({ theme }) => theme.PALETTE.gray[100]};
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    font-weight: 500;
  }
`;

export const PplImage = styled.img`
  width: 25px;
  height: 17px;
  cursor: pointer;
`;

export const Bottom = styled(Top)`
  gap: 16px;
  padding: 16px 8px;
`;

export const GalleryImage = styled(PplImage)`
  width: 40px;
  height: 40px;
`;

export const Input = styled.input`
  height: 40px;
  width: 720px;
  padding: 8px 16px;
  border-radius: 20px;
`;

export const Button = styled.button`
  height: 40px;
  padding: 0 24px;
  color: ${({ theme }) => theme.PALETTE.white};
  background-color: ${({ theme }) => theme.PALETTE.primary[200]};
  border-radius: 20px;

  cursor: pointer;
`;
