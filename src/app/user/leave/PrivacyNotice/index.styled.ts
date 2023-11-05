import { styled } from "styled-components";

export const Notice = styled.div`
  width: 786px;
  margin: 0 auto;
`;
export const Title = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-weight: 500;
  margin-bottom: 8px;
`;
export const NoticeContent = styled.div``;
export const Privacy = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: 400;
  line-height: 24px;
  margin-bottom: 24px;
  & > div:nth-child(3) {
    margin-bottom: 24px;
  }
`;
export const Period = styled.ul`
  margin: 24px 0;

  & > li::before {
    content: "· ";
  }
  & > li {
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    font-weight: 400;
    color: ${({ theme }) => theme.PALETTE.mainColor};

    line-height: 24px;
  }
`;
