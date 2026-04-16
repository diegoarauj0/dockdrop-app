import styled from "styled-components";

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  text-align: center;
  gap: ${(props) => props.theme.spacing.lg};
  padding: ${(props) => props.theme.spacing.xl};
  background-color: ${(props) => props.theme.bg_dark};
`;

export const ErrorTitle = styled.h1`
  font-size: ${(props) => props.theme.font_sizes.xxl};
  color: ${(props) => props.theme.text};
  font-weight: 700;
`;

export const ErrorMessage = styled.p`
  font-size: ${(props) => props.theme.font_sizes.lg};
  color: ${(props) => props.theme.text_muted};
  max-width: 500px;
  line-height: 1.6;
`;
