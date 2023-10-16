import { flexSpaceBetweenCenter } from "@/styles/common";
import styled from "styled-components";
import { LinkButton as LB } from "../../../components/account/common.styled";

export const Wrap = styled.div`
  ${flexSpaceBetweenCenter}
`;

export const LinkButton = styled(LB)`
  width: 352px;
`;

export const ExitButton = styled.button`
  background: none;
  color: ${({ theme }) => theme.PALETTE.white};
  font-family: inherit;
  font-size: inherit;
  border-bottom: 1px solid white;
`;
