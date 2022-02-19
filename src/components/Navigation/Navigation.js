import { Link } from "react-router-dom";
import styled from "styled-components";

const NavMenu = styled.nav`
  width: 100%;
  height: 100px;
  position: fixed;
  top: 0;
  background-color: #0e0e0e;
  z-index: 2;
  display: flex;
  justify-content: space-between;
`;
const NavLogo = styled.img`
  background-color: blue;
`;

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
  ${({ current, thisItem }) =>
    current === thisItem
      ? `
        border-bottom: 2px solid white;
        font-weight: 600;
        `
      : ""}
`;

const Navigation = ({ current }) => {
  return (
    <NavMenu>
      <NavLogo width="50px" />
      <NavHolder>
        <NavItem to="/home" current={current} thisItem={1}>
          Home
        </NavItem>
        <NavItem to="/all" current={current} thisItem={2}>
          All robots
        </NavItem>
        <NavItem to="/robot/new" current={current} thisItem={2}>
          Upload a robot!
        </NavItem>
      </NavHolder>
    </NavMenu>
  );
};

export default Navigation;
