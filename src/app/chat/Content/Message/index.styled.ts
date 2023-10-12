import { flexAlignCenter, flexCenter, flexColumn } from "@/styles/common";
import styled from "styled-components";

export const Body = styled.div`
  overflow: scroll; /* 세로 스크롤을 활성화 */
  padding: 12px 0 12px 0;
`;

export const Message = styled.div`
  ${flexCenter};
  justify-content: ${props => (props.message === "my" || props.message === "photo" ? "flex-end" : "flex-start")};
  gap: 8px;
  width: 100%;
`;

export const PhotoMessage = styled(Message)`
  align-items: flex-end;

  & img {
    cursor: pointer;
  }
`;

export const MessageBox = styled.div`
  ${flexColumn}
  gap: 16px;
`;

export const Image = styled.img`
  width: 56px;
  height: 56px;
`;

export const Info = styled.div`
  ${flexColumn}
  gap: 8px;
`;

export const Intro = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;

  > div {
    font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  }
`;

export const Nickname = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
`;

export const TextContent = styled.span`
  background: #fff;
  padding: 10px 24px;
  ${flexAlignCenter}
  border-radius: 20px;
  border: 1px solid #d9d9d9;
  color: ${({ theme }) => theme.PALETTE.black};
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
`;

export const Images = styled.div`
  > img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
    border: 5px solid #fff;
  }
`;
