import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import userContext from "../../contexts/userContext";
import { useContext } from "react";

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
`;

const NavProto = styled(Link)`
  color: white;
  text-decoration: none;
  width: 170px;
  display: flex;
  padding: 0 30px;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 13px;
  &:hover {
    border-bottom: 3px solid purple;
    font-weight: 600;
  }
`;

const NavItem = styled(NavProto)`
  ${({ current, index }) =>
    current === index
      ? "border-bottom: 3px solid purple; font-weight: 600;"
      : ""}
`;

const UserMenu = styled.div`
  width: 300px;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;

const UserControll = styled(Link)`
  height: 40px;
  width: 100px;
  border-radius: 10px;
  border: none;
  background-color: purple;
  font-family: inherit;
  color: white;
  text-decoration: none;
  display: flex;
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

const Username = styled.p`
  color: white;
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  border-radius: 50%;
  border: 2px solid purple;
`;

const Navigation = ({ current }) => {
  const { user } = useContext(userContext);

  const getUserPannel = () => {
    if (Object.keys(user).length !== 0) {
      return (
        <>
          <Username>{user.username}</Username>
          <Avatar src={user.avatar} height="60" width="60"></Avatar>
        </>
      );
    }
    return (
      <>
        <UserControll to="/users/login"> Login </UserControll>
        <Or>or</Or>
        <UserControll to="/users/register"> Register </UserControll>
      </>
    );
  };

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
        <UserMenu>{getUserPannel()}</UserMenu>
      </NavHolder>
    </NavMenu>
  );
};

Navigation.propTypes = {
  current: PropTypes.number.isRequired,
};

export default Navigation;
