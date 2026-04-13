import styled from "styled-components";
import { slideUpFadeAnimation } from "../../../theme/keyFrames";

export const Dashboard = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.lg};
`;

export const TopBar = styled.div`
  width: 100%;
  border: ${(props) => props.theme["border-widths"].strong} solid ${(props) => props.theme["bg-dark"]};
  background-color: ${(props) => props.theme.bg};
  align-items: center;
  border-radius: ${(props) => props.theme.radii.md};
  padding: ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0%;
  animation: ${slideUpFadeAnimation} 0.5s;

  @media screen and (max-width: ${(props) => props.theme.breakpoints.laptop}px) {
    flex-direction: column;
    align-items: stretch;
    padding: ${(props) => props.theme.spacing.md};
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoints.tablet}px) {
    position: relative;
  }
`;

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

export const CreateButton = styled.button`
  background-color: ${(props) => props.theme.primary};
  border: none;
  border-radius: ${(props) => props.theme.radii.md};
  color: white;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.xs};
  font-size: ${(props) => props.theme["font-sizes"].md};
  font-weight: 700;
  min-height: ${(props) => props.theme.sizes["control-min-height"]};
  padding: 0 ${(props) => props.theme.spacing.md};
  white-space: nowrap;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    filter 0.2s ease;

  &:active {
    transform: translateY(0);
  }
`;
