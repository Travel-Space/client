import { flexAlignCenter } from "@/styles/common";
import styled from "styled-components";

interface ProfileSize {
  size: "post" | "map";
}

export const Wrapper = styled.div<ProfileSize>`
  display: flex;
  align-items: center;
  gap: ${({ size }) => (size === "map" ? "8px" : "16px")};
  cursor: pointer;
`;

export const Profile = styled.img<ProfileSize>`
  width: ${({ size }) => (size === "map" ? "20px" : "48px")};
  height: ${({ size }) => (size === "map" ? "20px" : "48px")};
  overflow: hidden;
  border-radius: 50%;
  text-align: center;
  background-size: cover;
  background-repeat: no-repeat;
  object-fit: cover;
`;

export const NFDisplay = styled.div<ProfileSize>`
  ${flexAlignCenter}
  gap: ${({ size }) => (size === "map" ? "4px" : "8px")};
`;

export const Name = styled.div<ProfileSize>`
  font-weight: 700;
  font-size: ${({ theme, size }) => (size === "map" ? theme.FONT_SIZE.xs : theme.FONT_SIZE.big)};
`;

export const Flag = styled.img<ProfileSize>`
  width: ${({ size }) => (size === "map" ? "15px" : "30px")};
  height: ${({ size }) => (size === "map" ? "10px" : "20px")};
  object-fit: cover;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.25);
`;
