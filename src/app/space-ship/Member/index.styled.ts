import { flexAlignCenter, flexCenter, flexSpaceBetweenCenter } from "@/styles/common";
import { FillButton as FB, OutlineButton as OB } from "@/components/Account/common.styled";
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
  ${flexSpaceBetweenCenter}
  cursor: pointer;
  gap: 24px;
`;

export const ProfileImg = styled.img``;

export const InfoGroup = styled.div`
  flex: 1;
  text-align: left;
  line-height: 24px;
`;

export const NicknameRole = styled.p`
  ${flexAlignCenter}
  .nickname {
    font-family: ${({ theme }) => theme.FONT_WEIGHT.semiBold};
    margin-right: 8px;
  }
  .role {
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    color: ${({ theme }) => theme.PALETTE.mainColor};
  }
`;

export const Email = styled.p``;

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
`;

export const FillButton = styled(FB)<{ $icons: boolean }>`
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  padding: 8px 16px;
  width: auto;
  ${({ $icons }) => {
    return (
      $icons &&
      css`
        display: flex;
        padding: 8px;
      `
    );
  }}
`;

export const OutlineButton = styled(OB)`
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  padding: 8px 16px;
  width: auto;
`;

export const DisabledButton = styled(FB)`
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.PALETTE.gray[100]};
  border-color: ${({ theme }) => theme.PALETTE.gray[100]};
`;
