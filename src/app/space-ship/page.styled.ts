import styled from "styled-components";
import { bodyContainer, flexColumn } from "@/styles/common";

export const Wrap = styled.div`
  padding: 40px 0 64px;
  ${bodyContainer}
  ${flexColumn}
  justify-content: space-between;
  height: calc(100vh - 90px);
  overflow: hidden;
`;
