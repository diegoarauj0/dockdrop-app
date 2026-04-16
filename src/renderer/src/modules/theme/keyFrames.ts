import { keyframes } from "styled-components";

export const ScaleInAnimation = keyframes`
  0% { transform: scale(0.05); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export const fadeScaleInAnimation = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  50% {
    opacity: 1;
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
`;

export const slideUpFadeAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;
