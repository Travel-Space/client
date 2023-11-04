import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: flex-end;
  & > div {
    flex: 1;
  }
`;

export const PrevPageBtn = styled.button`
  background-image: url("/assets/img/icons/page-left.svg");
  background-repeat: no-repeat;
  width: 20px;
  height: 20px;
  margin-bottom: 15px;
`;
export const NextPageBtn = styled.button`
  background-image: url("/assets/img/icons/page-right.svg");
  background-repeat: no-repeat;
  width: 20px;
  height: 20px;
  margin-bottom: 15px;
`;
