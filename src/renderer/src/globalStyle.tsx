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
    font-family: "inter";
  }
`;

export default GlobalStyle;
