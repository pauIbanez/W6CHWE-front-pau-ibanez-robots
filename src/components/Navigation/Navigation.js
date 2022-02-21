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
  gap: 50px;
`;

const NavProto = styled(Link)`
  color: white;
  text-decoration: none;
  width: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 13px;
  &:hover {
    border-bottom: 2px solid white;
    font-weight: 600;
  }
`;

const NavItem = styled(NavProto)`
  ${({ current, index }) =>
    current === index
      ? "border-bottom: 2px solid white; font-weight: 600;"
      : ""}
`;

const UserMenu = styled.div`
  width: 300px;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;

const UserControll = styled.button`
  height: 40px;
  width: 100px;
  border-radius: 10px;
  border: none;
  background-color: purple;
  font-family: inherit;
  color: white;
  diaply: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
    background-color: #c044be;
  }
`;

const Or = styled.p`
  margin: 0;
  color: white;
  display: flex;
  align-items: center;
`;

const Navigation = ({ current }) => {
  return (
    <NavMenu>
      <NavLogo
        height="80"
        width="68"
        src="./img/robotsLogo.png"
        alt="Robots logo"
      />
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
        <UserMenu>
          <UserControll> Login </UserControll>
          <Or>or</Or>
          <UserControll> Register </UserControll>
        </UserMenu>
      </NavHolder>
    </NavMenu>
  );
};

Navigation.propTypes = {
  current: PropTypes.number.isRequired,
};

export default Navigation;
