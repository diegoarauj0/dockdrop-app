import styled from "styled-components";

export const ContainerAreas = styled.section`
  display: grid;
  gap: ${(props) => props.theme.spacing.lg};
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: ${(props) => props.theme.breakpoints.wide}px) {
    grid-template-columns: 1fr;
  }
`;

export const ActionAreas = styled.div`
  display: grid;
  gap: ${(props) => props.theme.spacing.lg};
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;
