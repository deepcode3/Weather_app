/*import React from "react";
import GlobalStyle from "./globalStyles";
//import Navbar from "./Navbar/Navigation";
//import styled from "styled-components";
//import bg from "./Images/background.svg";

import Routing from "./routes/Routing";
import "./App.css";
function App() {
  return (
    <div className="app">
      <GlobalStyle />
      <Routing />
    </div>
  );
}
export default App;*/

/*const Body = styled.div`
  background-image: url(${bg});
  height: 100%;
  min-height: 100vh;
  min-width: 100vw;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: fixed;
`;*/
import "./App.css";
import Routes from "./routes/Route";

function App() {
  return (
    <div className="app">
      <Routes />
    </div>
  );
}

export default App;
