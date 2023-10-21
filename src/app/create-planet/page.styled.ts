import styled, { css } from "styled-components";
import { bodyContainer, flexAlignCenter, flexCenter } from "@/styles/common";

export const commonContainer = css`
  flex: 1;
  padding: 56px;
`;

export const Wrap = styled.div`
  ${bodyContainer}
  display: flex;
  gap: 48px;
  padding: 40px 0 64px;
  height: calc(100vh - 90px);
`;

// export const InputGroup = styled(IG)`
//   margin-bottom: 24px;
//   width: 100%;
// `;

// export const AdjustBtnGroup = styled(IG)`
//   margin-bottom: 24px;
//   width: 100%;
// `;
