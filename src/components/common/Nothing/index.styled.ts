import { styled, css } from "styled-components";
import { flexCenter, flexColumnCenter } from "@/styles/common";

const fontCSS = {
  sm: css`
    & > div:nth-child(1) {
      margin-top: 20px;
      font-size: ${({ theme }) => theme.FONT_SIZE.em};
      font-weight: 600;
    }
    & > div:nth-child(2) {
      margin-top: 10px;
      font-size: ${({ theme }) => theme.FONT_SIZE.md};
      font-weight: 500;
    }
  `,
  lg: css`
    & > div:nth-child(1) {
      margin-top: 40px;
      font-size: ${({ theme }) => theme.FONT_SIZE.lg};
      font-weight: 700;
    }
    & > div:nth-child(2) {
      margin-top: 16px;
      font-size: ${({ theme }) => theme.FONT_SIZE.big};
      font-weight: 400;
    }
  `,
};

export const Container = styled.div`
  width: 100%;
  height: 546px;
  ${flexCenter}
  flex-direction: column;
`;

interface TextProp {
  font: "sm" | "lg";
  color?: "white";
}
export const Text = styled.div<TextProp>`
  ${({ font }) => fontCSS[font]}
  ${flexColumnCenter};

  & > div {
    color: ${({ color }) => (color ? "#ffffff" : "#898989")};
  }
`;

export const Comment = styled.div``;

export const Suggest = styled.div``;
