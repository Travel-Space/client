import styled from "styled-components";
import { flexCenter } from "@/styles/common";

export const Wrapper = styled.div`
  ${flexCenter}
  gap:40px;
`;

export const PlanetImg = styled.img`
  width: 200px;
  height: 200px;

  background-image: url(/assets/img/icons/planet1.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;

  content-visibility: hidden;
`;
