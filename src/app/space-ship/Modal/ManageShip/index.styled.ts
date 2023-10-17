import { flexCenter } from "@/styles/common";
import styled from "styled-components";
import { InputGroup } from "@/components/Account/common.styled";

export const Notification = styled.div``;

export const Center = styled.div`
  ${flexCenter}
  gap: 24px;
`;

export const AdjustBtnGroup = styled(InputGroup)`
  margin-bottom: 24px;
  width: 100%;
`;

export const LineWrap = styled.div`
  padding: 0 0 24px;
`;
