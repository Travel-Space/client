import styled from "styled-components";
import { ModalBackground } from "@/styles/common";

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const ImageBox = styled.div`
  > img {
    max-width: 1000px;
    height: 100%;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 25px;
  top: 25px;
  cursor: pointer;
  font-size: 0;
  width: 13px;
  height: 13px;
  background: none;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-image: url("/assets/img/icons/close.svg");
`;
