import styled from "styled-components";
import { flexColumnCenter, flexColumn } from "@/styles/common";

export const Wrapper = styled.div`
  ${flexColumnCenter}
  height: 100%;
  gap: 144px;
`;

export const Content = styled.div`
  ${flexColumn}
  justify-content: space-between;
  align-items: center;
  width: 1280px;

  gap: 96px;
`;
