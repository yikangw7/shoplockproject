import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
    background: #009EC1;
    height: 50px;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem calc((100vw - 1000px) / 2);
    z-index: 10;
`;

export const NavLink = styled(Link)`
    background: #009EC1;
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 4px 20px;
    height: 100%;
    cursor: pointer;
    @font-face{
        font-family: ak;
        src: url(Fonts/AK.ttf);
    }
    font-family: ak;
    font-size: 24px;
    &:hover{
        background: #007d8d;
    }
`;

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    margin-right: -24px;
    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const NavBtn = styled.nav`
    display: flex;
    align-items: center;
    margin-right: 24px;
    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const NavBtnLink = styled(Link)`
    border-radius: 4px;
    background: #007d8d;
    padding: 10px 22px;
    color: #fff;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    margin-left: 24px;
    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }
    @font-face{
        font-family: ak;
        src: url(Fonts/AK.ttf);
    }
    font-family: ak;
    font-size: 24px;
`;