import React from "react";
import styled from "styled-components";
import useApi from "./useApi";

const Pop = (props) => {
  const { setLocalList } = useApi();
  const Close = () => {
    props.setTrigger(false);
  };

  const RemoveClose = () => {
    localStorage.removeItem("Favourites");
    setLocalList([]);
    window.location.reload(true);
    props.handleSelect();
    Close();
  };
  return props.trigger ? (
    <>
      <Popup>
        <Title>Are you sure want to remove all the favourites?</Title>
        <ButttonDiv>
          <B onClick={Close}>No</B>
          <B onClick={RemoveClose}>Yes</B>
        </ButttonDiv>
        {props.children}
      </Popup>
    </>
  ) : (
    ""
  );
};
{
  /* <B onClick={() => props.setTrigger(false)}>No</B>*/
}
export default Pop;

const Popup = styled.div`
  height: 210px;
  width: 458px;
  border-radius: 2px;
  background-color: #ffffff;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.3);
  margin: 0 auto;
  position: fixed;
  left: 371px;
  top: 200px;
  z-index: 99;
`;
const Title = styled.a`
  height: 18px;
  width: 312px;
  color: #000000;
  font-family: Roboto;
  font-size: 15px;
  letter-spacing: 0;
  line-height: 18px;
  text-align: center;
  position: relative;
  top: 58px;
  left: 12px;
  background-color: #ffffff;
`;
const ButttonDiv = styled.div`
  position: relative;
  height: 35px;
  width: 154px;
  margin-top: 120px;
  margin-left: 152px;
  background-color: #ffffff;
`;
const B = styled.button`
  margin: 2px;
  height: 24px;
  width: 30px;
  color: #000000;
  font-family: Roboto;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 18px;
  text-align: center;
  &:hover {
    height: 35px;
    width: 106px;
    border-radius: 2px;
    background-color: #f76b1c;
    color: #ffffff;
    font-family: Roboto;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 18px;
    text-align: center;
  }
`;
