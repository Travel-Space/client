import styled, { css } from "styled-components";
import { bodyContainer } from "@/styles/common";

export const commonContainer = css`
  flex: 1;
`;

export const Wrap = styled.div`
  ${bodyContainer}
  display: flex;
  gap: 48px;
  padding: 40px 0 64px;
`;
