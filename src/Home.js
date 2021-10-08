import React from "react";
import styled from "styled-components";
import NavigationBar from "./Navbar/Navigation";
import Routing from "./routes/Routing";
import bg from "./Images/background.png";
const Block = styled.div`
  background-image: url(${bg});
  height: 688px;
  width: 1200px;
`;
const Home = () => {
  return (
    <Block>
      <NavigationBar />
      <Routing />
    </Block>
  );
};
export default Home;
