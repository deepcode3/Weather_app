import styled, { createGlobalStyle } from "styled-components";
import bg from "./Images/background.svg";

const GlobalStyle = createGlobalStyle`
  * {
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0;
  font-family: Roboto;
 } 
`;

export const Container = styled.div`
  z-index: 1;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    padding: 0 30px;
  }
`;

export default GlobalStyle;

/*import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
*{
  box-sizing: border-box;
}
  body {
    margin: 0;
    padding: 0;
    font-family: Roboto;
  }
  html {
  font-size: 62.5%;
}
a {
  text-decoration: none;
}
li {
  list-style: none;
}
`;

export default GlobalStyle;*/
