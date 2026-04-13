import styled from "styled-components";

export const SearchWrapper = styled.label`
  background-color: ${(props) => props.theme["bg-light"]};
  border: ${(props) => props.theme["border-widths"].thin} solid ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.radii.pill};
  color: ${(props) => props.theme["text-muted"]};
  max-width: ${(props) => props.theme.sizes["content-max-width"]};
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
  min-height: ${(props) => props.theme.sizes["control-min-height"]};
  padding: 0 ${(props) => props.theme.spacing.md};
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    color 0.2s ease;

  @media (max-width: ${(props) => props.theme.breakpoints.laptop}px) {
    margin-bottom: ${(props) => props.theme.spacing.md};
    max-width: none;
  }
`;

export const SearchInput = styled.input`
  background: transparent;
  border: none;
  width: 100%;
  color: ${(props) => props.theme.text};
  font-size: ${(props) => props.theme["font-sizes"].lg};
  outline: none;

  &::placeholder {
    color: ${(props) => props.theme["text-muted"]};
  }
`;
