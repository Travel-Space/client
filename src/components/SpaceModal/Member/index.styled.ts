import { flexAlignCenter, flexCenter, flexSpaceBetweenCenter } from "@/styles/common";
import styled, { css } from "styled-components";

export const Wrap = styled.div`
  padding: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: #d9d9d930;
  }
`;

export const Label = styled.label`
  cursor: pointer;
  ${flexSpaceBetweenCenter}
  gap: 24px;
`;

export const MemberWrap = styled.div`
  ${flexSpaceBetweenCenter}
  gap: 24px;
`;

export const ProfileImg = styled.img`
  height: 60px;
  width: 60px;
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  border-radius: 100px;
`;

export const InfoGroup = styled.div`
  flex: 1;
  text-align: left;
  line-height: 24px;
`;

export const NicknameRole = styled.p`
  ${flexAlignCenter}
  .nickname {
    font-weight: 600;
    margin-right: 8px;
    font-size: ${({ theme }) => theme.FONT_SIZE.md};
  }
  .role {
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    color: ${({ theme }) => theme.PALETTE.mainColor};
  }
`;

export const Email = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
`;

export const Input = styled.input`
  cursor: pointer;
  /* Add if not using autoprefixer */
  -webkit-appearance: none;
  appearance: none;
  /* For iOS < 15 to remove gradient background */
  background-color: #fff;
  /* Not removed via appearance */
  margin: 0;
  outline: none;
  background-color: transparent;
  background-image: url("/assets/img/icons/radio-blur.svg");
  width: 32px;
  height: 32px;
  &:checked {
    background-image: url("/assets/img/icons/radio-focus.svg");
  }
`;

export const Group = styled.div`
  ${flexCenter}
  gap: 8px;
  > button {
    width: auto;
    padding: 8px 16px;
  }
`;
