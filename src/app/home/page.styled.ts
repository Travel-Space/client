import styled from "styled-components";
import { flexColumnCenter, flexColumn } from "@/styles/common";

export const Wrapper = styled.div`
  ${flexColumnCenter}
  margin-top: 64px;
  height: 100%;
  gap: 112px;
`;

export const Content = styled.div`
  ${flexColumn}
  justify-content: space-between;
  align-items: center;
  width: 1280px;

  gap: 72px;
`;
