import { OutlineButton as OB } from "@/components/account/common.styled";
import { flexCenter } from "@/styles/common";
import styled from "styled-components";

export const Notification = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.em};
  text-align: center;
  line-height: 32px;
  b {
    font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
  }
  margin-bottom: 24px;
  padding: 24px 0;
`;

export const OutlineButton = styled(OB)`
  ${flexCenter}
  gap: 8px;
  img {
    margin-top: -2px;
  }
`;
