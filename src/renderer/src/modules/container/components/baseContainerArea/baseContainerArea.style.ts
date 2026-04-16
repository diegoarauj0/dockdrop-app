import styled from "styled-components";

export const BaseContainerArea = styled.section<{ $active: boolean }>`
  background-color: ${(props) => props.theme.bg_dark};
  border-radius: ${(props) => props.theme.radii.lg};
  display: flex;
  width: 100%;
  border: 2px ${(props) => (props.$active ? "solid" : "dashed")};
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.md};
  padding: ${(props) => props.theme.spacing.md};
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  gap: ${(props) => props.theme.spacing.sm};
`;

export const Title = styled.h2`
  color: ${(props) => props.theme.text};
  font-size: ${(props) => props.theme.font_sizes.lg};
  font-weight: 700;
  margin: 0;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RightContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
