import { styled } from "styled-components";

export const MyFriends = styled.div`
  width: 100%;
  padding: 24px 42px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  border-radius: 10px;

  & > div:nth-child(10n) {
    border-bottom: none;
  }
  & > div:last-child {
    border-bottom: none;
  }
`;
