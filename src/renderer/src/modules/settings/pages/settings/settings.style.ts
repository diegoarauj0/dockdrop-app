import styled from "styled-components";

export const Settings = styled.div`
  background: ${({ theme }) => theme.bg_dark};
  padding: ${({ theme }) => theme.spacing.xl};
  justify-content: center;
  display: flex;
  height: 100%;
  width: 100%;
`;

export const SettingsContainer = styled.div`
  display: flex;
  max-width: ${({ theme }) => theme.sizes.content_max_width};
  width: 100%;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.font_sizes.xxl};
  font-weight: 700;
  width: 100%;
  color: ${({ theme }) => theme.text};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  letter-spacing: -0.02em;
`;
