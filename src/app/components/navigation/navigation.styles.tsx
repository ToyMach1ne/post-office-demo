import styled from "styled-components";

import { Link } from "react-router-dom";
import { Colors } from "../../common/typography/typography.styles";

export const NavigationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  z-index: 10000;
  background-color: ${Colors.grayLight3};
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 7rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LinkContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
`;

export const NavLink = styled(Link)`
  &:link,
  &:visited,
  & {
    border: none;
    display: inline-block;
    background-color: transparent;
    font-family: inherit;
    text-transform: uppercase;
    font-size: 1.6rem;

    text-decoration: none;
    color: #333;
    padding: 10px 15px;
    cursor: pointer;
    transition: all 0.2s;
  }

  &:hover,
  &:active {
    transform: translateY(-2px);
    box-shadow: 0 20px 40px rgba(#000, 0.2);
    background-color: #333;
    color: #fff;
  }
`;
