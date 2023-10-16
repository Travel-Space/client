import styled from "styled-components";
import { flexColumnCenter, flexColumn, bodyContainer } from "@/styles/common";

export const Wrapper = styled.div`
  ${flexColumnCenter}
  justify-content: center;
  height: calc(100vh - 90px);
  gap: 120px;
`;

export const Content = styled.div`
  ${flexColumn}
  ${bodyContainer}
  justify-content: space-between;
  align-items: center;
  gap: 96px;
`;
