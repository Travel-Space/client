import { styled } from "styled-components";
import { flexCenter, flexColumnCenter } from "@/styles/common";

export const Container = styled.div`
  width: 152px;
  height: 186px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  border-radius: 15px;
  background-color: ${({ theme }) => theme.PALETTE.white};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 16px;
  ${flexCenter}
  flex-direction: column;
`;
export const Profile = styled.div`
  cursor: pointer;
  ${flexColumnCenter};

  & > img {
    border-radius: 38px;
  }
`;
export const Nickname = styled.div`
  font-weight: 700;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  margin: 16px 0 8px;
  text-align: center;
`;
export const FollowBtn = styled.div`
  & > button {
    padding: 5px 24px;
  }
`;
