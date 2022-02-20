import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

const NavMenu = styled.nav`
  width: 100%;
  height: 100px;
  position: fixed;
  top: 0;
  background-color: #252525;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 100px;
  box-shadow: 0 0 10px 0 black;
`;
const NavLogo = styled.img``;

const NavHolder = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding-right: 50px;
`;

const NavProto = styled(Link)`
  color: white;
  text-decoration: none;
  min-width: 200px;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  &:hover {
    border-bottom: 2px solid white;
    font-weight: 600;
  }
`;

const NavItem = styled(NavProto)`
  ${({ current, index }) =>
    current === index
      ? `
        border-bottom: 2px solid white;
        font-weight: 600;
        `
      : ""}
`;

const Navigation = ({ current }) => {
  return (
    <NavMenu>
      <NavLogo height="80px" src="./img/robotsLogo.png" />
      <NavHolder>
        <NavItem to="/home" current={current} index={1}>
          Home
        </NavItem>
        <NavItem to="/all" current={current} index={2}>
          All Robots
        </NavItem>
        <NavItem to="/robot/new" current={current} index={3}>
          Upload a Robot!
        </NavItem>
      </NavHolder>
    </NavMenu>
  );
};

Navigation.propTypes = {
  current: PropTypes.number.isRequired,
};

export default Navigation;
