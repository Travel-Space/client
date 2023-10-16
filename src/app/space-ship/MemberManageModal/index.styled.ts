import {
  OutlineButton as OB,
  InputGroup as IG,
  Input as I,
  FillButton as FB,
  LinkButton as LB,
} from "@/components/account/common.styled";
import { flexCenter } from "@/styles/common";
import styled from "styled-components";

export const Notification = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.em};
  text-align: center;
  line-height: 32px;
  b {
    font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
  }
  margin-bottom: 24px;
`;

export const OutlineButton = styled(OB)`
  border-radius: 100px;
  width: 50%;
  margin-top: 24px;
`;

export const LinkButton = styled(LB)`
  border-radius: 100px;
  width: 50%;
  margin: 0 auto;
`;

export const InputGroup = styled(IG)`
  display: flex;
`;

export const SearchButton = styled(FB)`
  flex: 1;
  border-radius: 0 10px 10px 0;
  ${flexCenter}
  gap: 8px;
`;

export const Input = styled(I)`
  flex: 4;
  border-radius: 10px 0 0 10px;
`;

export const NoList = styled.div`
  padding: 40px 0;
  p {
    opacity: 0.5;
  }
`;

export const MemberList = styled.div`
  margin-top: 24px;
  height: 400px;
  overflow: scroll;
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  border-top: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
`;
