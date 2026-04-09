import styled from "styled-components";

export const Dashboard = styled.div`
  display: flex;
  height: 100%;
  overflow-y: auto;
  flex-direction: column;
  gap: 24px;
`;

export const TopBar = styled.div`
  position: sticky;
  top: 0%;
  width: 100%;
  border: 5px solid ${props => props.theme["bg-dark"]};
  background-color: ${props => props.theme.bg};
  align-items: center;
  border-radius: 12px;
  padding: 18px 24px;
  display: flex;
  justify-content: space-between;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: stretch;
    padding: 16px;
  }
`;

export const SearchWrapper = styled.label`
  background-color: ${props => props.theme["bg-light"]};
  border: 1px solid ${props => props.theme.border};
  border-radius: 999px;
  color: ${(props) => props.theme["text-muted"]};
  max-width: 460px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 48px;
  padding: 0 16px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    color 0.2s ease;
`;

export const SearchInput = styled.input`
  background: transparent;
  border: none;
  width: 100%;
  color: ${(props) => props.theme.text};
  font-size: 0.98rem;
  outline: none;

  &::placeholder {
    color: ${(props) => props.theme["text-muted"]};
  }
`;

export const CreateButton = styled.button`
  background-color: ${props => props.theme.primary};
  border: none;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.95rem;
  font-weight: 700;
  min-height: 48px;
  padding: 0 16px;
  white-space: nowrap;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    filter 0.2s ease;


  &:active {
    transform: translateY(0);
  }
`;

export const ContainerAreas = styled.section`
  display: grid;
  gap: 22px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;
