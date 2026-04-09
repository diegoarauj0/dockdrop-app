import styled from "styled-components";

export const Section = styled.section`
  background-color: ${(props) => props.theme["bg-dark"]};
  border: 2px dashed ${(props) => props.theme.danger};
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-height: 220px;
  padding: 16px;
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

export const Title = styled.h2`
  color: ${(props) => props.theme.text};
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
`;

export const Count = styled.span`
  align-items: center;
  background-color: ${(props) => props.theme.bg};
  border: 1px solid ${(props) => props.theme.danger};
  border-radius: 999px;
  color: ${(props) => props.theme["text-muted"]};
  display: inline-flex;
  font-size: 0.72rem;
  font-weight: 700;
  height: 24px;
  justify-content: center;
  min-width: 24px;
  padding: 0 8px;
`;

export const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;
