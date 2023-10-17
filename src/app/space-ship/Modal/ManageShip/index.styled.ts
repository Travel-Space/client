import { flexAlignCenter, flexCenter, flexColumn } from "@/styles/common";
import styled from "styled-components";
import { OutlineButton as OB } from "@/components/Account/common.styled";

export const Content = styled.div`
  ${flexColumn}
  gap:24px;
  padding: 16px 24px 24px;
`;

export const Center = styled.div`
  ${flexAlignCenter}
  gap: 24px;
`;

export const Group = styled.div`
  width: 100%;
`;

export const DefaultImg = styled.div`
  position: relative;
  label {
    cursor: pointer;
  }
  input {
    display: none;
  }
`;

export const HoverIcon = styled.img`
  position: absolute;
  right: 0;
  bottom: 0;
  transform: scale(1.5);
`;

export const BtnInput = styled.div`
  width: 100%;
  input {
    display: inline-block;
    width: 70%;
    border-radius: 10px 0 0 10px;
    border-right: none;
  }
`;

export const BtnIcon = styled(OB)`
  display: inline-block;
  width: 30%;
  border-radius: 0 10px 10px 0;
  vertical-align: top;
  border-color: ${({ theme }) => theme.PALETTE.gray[100]};
  img {
    transform: scale(1.7);
  }
`;
