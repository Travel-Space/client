import { flexCenter } from "@/styles/common";
import styled from "styled-components";

export const PaginationWrapper = styled.div`
  display: flex;
  ${flexCenter};

  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translate(-50%, 0);
`;
export const FaAngleDoubleLeft = styled.button``;
export const FaAngleLeft = styled.button`
  background-image: url("/assets/img/icons/page-left.svg");
  background-repeat: no-repeat;
  width: 20px;
  height: 20px;
  &:disabled {
    background: none;
  }
`;
export const ButtonWrapper = styled.div`
  margin: 0 8px;
`;
export const PageButton = styled.button<{ active: boolean }>`
  color: ${props => props.active && "#40A0FB"};
  width: 20px;
  height: 20px;
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  font-weight: ${props => (props.active ? 600 : 500)};
  background-color: white;
`;
export const FaAngleRight = styled.button`
  background-image: url("/assets/img/icons/page-right.svg");
  background-repeat: no-repeat;
  width: 20px;
  height: 20px;
  &:disabled {
    background: none;
  }
`;
export const FaAngleDoubleRight = styled.button``;
