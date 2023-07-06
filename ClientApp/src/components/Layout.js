import React, { Component, useContext } from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';
import { DarkModeContext } from '../DarkModeContext';

const Layout = ({ children }) => {

    const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

    const containerStyle = {
        backgroundColor: isDarkMode ? '#121212' : '#ffffff',
        color: isDarkMode ? '#f2f2f2' : '#000000',
    };

    const rootStyle = {
        backgroundColor: isDarkMode ? '#121212' : '#ffffff',
        minHeight: '100vh',
    };

    return (
        <div style={rootStyle}>
            <NavMenu />
            <Container className={isDarkMode ? 'dark-mode-container' : ''} style={isDarkMode ? containerStyle : null}>{children}</Container>
        </div>
    );
};

export default Layout;