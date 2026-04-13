import styled from "styled-components";
import { fadeScaleInAnimation } from "../../../theme/keyFrames";

export const ContainerAreas = styled.section`
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${(props) => props.theme.spacing.lg};
  animation: ${fadeScaleInAnimation} 0.5s;
  display: grid;

  @media (max-width: ${(props) => props.theme.breakpoints.wide}px) {
    grid-template-columns: 1fr;
  }
`;

export const ActionAreas = styled.div`
  gap: ${(props) => props.theme.spacing.lg};
  animation: ${fadeScaleInAnimation} 0.5s;
  display: flex;
  width: 100%;
`;
