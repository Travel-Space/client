import React from "react";
import styled, { css, keyframes } from "styled-components";
// 하트를 그리는 애니메이션 키 프레임
const drawHeart = keyframes`
  0% {
    stroke-dashoffset: 3000;
  }
  70% {
    fill: #eee;
    stroke-dashoffset: 0;
  }
  100% {
    fill: var(--c, #ff6b81);
    stroke-dashoffset: 0;
  }
`;

// 하트 주변의 폭죽 애니메이션 키 프레임
const blink = keyframes`
  0% {
    transform: scale(0.5);
    opacity: 0.8;
  }
  80% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.1);
    opacity: 0;
  }
`;

export const HeartIcon = styled.svg`
  width: 24px;
  height: 24px;
  position: relative;
  .heart-path {
    fill: none;
    stroke: ${({ color }) => color}; /* CSS 변수 대신 props를 직접 사용 */
    stroke-width: 50px;
    stroke-dasharray: 3000;
    stroke-dashoffset: 3000;
    stroke-linecap: round;
    animation: ${drawHeart} 1s linear forwards;
  }
`;
// 폭죽 효과를 나타내는 스타일 컴포넌트
export const Firework = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  display: block;
  width: 24px;
  height: 24px;
  background-color: transparent;
  border-radius: 50%;
  box-shadow: 0 -160px 0 var(--c),
              0 160px 0 var(--c),
              -160px 0 0 var(--c),
              160px 0 0 var(--c),
              -120px -120px 0 var(--c),
              120px -120px 0 var(--c),
              120px 120px 0 var(--c),
              -120px 120px 0 var(--c);
  animation: ${blink} 0.5s ease-in-out forwards;
  animation-delay: 0.8s; // 하트가 그려진 후에 폭죽 애니메이션 실행
`;