"use client";

import styled, { keyframes } from "styled-components";

export default function Loading() {
  return (
    <LoadingOverlay>
      <CenteredContent>
        <Loader />
      </CenteredContent>
    </LoadingOverlay>
  );
}

const LoadingOverlay = styled.div`
  width: 100vw;
  position: fixed;
  height: 100vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const CenteredContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const animLoader = keyframes`
  0% {
    box-shadow: -72px 0 #047AF2 inset;
  }
  100% {
    box-shadow: 48px 0 #043EB2 inset;
  }
`;

const Loader = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  color: white;
  animation: ${animLoader} 0.5s ease-in-out;
`;
