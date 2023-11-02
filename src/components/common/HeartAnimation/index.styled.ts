import React from "react";
import styled, { keyframes } from "styled-components";

// // 애니메이션 키 프레임 정의
// const backdivAnimation = keyframes`
//   50% {
//     background: #ffe6f2;
//   }
// `;

// const beatAnimation = keyframes`
//   0% {
//     transform: scale(1) rotate(-45deg);
//   }
//   50% {
//     transform: scale(0.6) rotate(-45deg);
//   }
// `;

// export const Back = styled.div`
//   position: fixed;
//   padding: 0;
//   margin: 0;
//   top: 0;
//   left: 0;
//   width: 24px;
//   height: 24px;
//   background: white;
//   animation: ${backdivAnimation} 1s infinite;
// `;

// export const Heart = styled.div<{ color: string }>`
//   position: absolute;
//   margin: auto;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   left: 0;
//   background-color: pink;
//   height: 24px;
//   width: 24px;
//   transform: rotate(-45deg);
//   animation: ${beatAnimation} 1s infinite;

//   &:after,
//   &:before {
//     background-color: pink;
//     content: "";
//     border-radius: 50%;
//     position: absolute;
//     width: 50px;
//     height: 50px;
//   }

//   &:after {
//     top: 0px;
//     left: 25px;
//   }

//   &:before {
//     top: -25px;
//     left: 0px;
//   }
// `;


export const drawHeart = keyframes`
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



export const HeartIcon = styled.svg`
  width: 24px;
  height: 24px;
  .heart-path {
    fill: none;
    stroke: var(--c, #ff6b81);
    stroke-width: 50px;
    stroke-dasharray: 3000;
    stroke-dashoffset: 3000;
    stroke-linecap: round;
    animation: ${drawHeart} 1s linear forwards;
  }
`;


