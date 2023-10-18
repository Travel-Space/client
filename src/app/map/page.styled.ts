import styled from "styled-components";
import { flexColumnCenter } from "@/styles/common";

export const Container = styled.div`
  width: 100%;
`;

export const Button = styled.button`
  width: 40px;
  height: 80px;
  top: 50%;
  position: fixed;
  border-radius: 0px 10px 10px 0px;
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background: ${({ theme }) => theme.PALETTE.white};
`;

export const Map = styled.div`
  ${flexColumnCenter}
  justify-content: center;
  gap: 12px;
`;
