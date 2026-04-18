import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0px;
    margin: 0px;
  }

  body {
    width: 100vw;
    height: 100vh;
    font-family: "inter", Arial, Helvetica, sans-serif;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.bg_dark};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme["border"]};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.highlight};
  }
`;

export default GlobalStyle;
