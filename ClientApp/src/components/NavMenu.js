import React, { Component, useEffect, useState, useRef, useContext } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link, Navigate } from 'react-router-dom';
import './NavMenu.css';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import { BsFillCartFill, BsSun, BsMoonFill } from 'react-icons/bs'
import { DarkModeContext } from '../DarkModeContext';

const checkIfAdmin = (email) => {
    const adminEmails = ['admin@test.com'];
    return adminEmails.includes(email);
}

const NavMenu = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const [shouldRefresh, setShouldRefresh] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (item) => {
        console.log(`Selected item: ${item}`);
        setIsOpen(false);
    };

    useEffect(() => {
        const prenume = localStorage.getItem("prenume");
        console.log(prenume);

        if (prenume) {
            setIsLoggedIn(true);
            setUsername(prenume);
            setShouldRefresh(true);
        }

        const email = localStorage.getItem('email');
        const isAdminUser = checkIfAdmin(email);

        if (isAdminUser) {
            setIsAdmin(true);
        }

        const handleClickOutside = (event) => {
            if (event.target.closest('.dropdown')) return;
            setIsOpen(false);
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isLoggedIn]);

    const handleLogout = (e) => {
        e.preventDefault();
        fetch('https://localhost:7277/api/logout', {
            method: 'POST',
            credentials: 'include',
        })
            .then((response) => {
                if (response.ok) {
                    localStorage.clear();
                    setIsLoggedIn(false);
                    window.location.reload();
                } else {
                    throw new Error('Failed to logout');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <header>
            <Navbar className={`${isDarkMode ? 'dark-mode-nav' : ''} navbar-expand-sm navbar`} container>
                <NavbarBrand tag={Link} to="/" className={isDarkMode ? 'dark-mode-nav' : ''}>OnlineCave</NavbarBrand>
         
          
              <ul className="navbar-nav flex-grow" >
              <NavItem>
                <NavLink tag={Link} to="/">Acasă</NavLink>
              </NavItem>
                        {
                            isLoggedIn ? (
                                <>
                                <NavItem>
                                    {isAdmin ? <NavLink tag={Link} className="admin" to="/api/admin">Admin</NavLink> : <NavLink tag={Link} className="account" to="/api/account">{username}</NavLink>}
                                    </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="logout" to="/" onClick={handleLogout}>Logout</NavLink>
                                    </NavItem>
                                </>
                            ) : (
                                <>
                                    <NavItem>
                                        <NavLink tag={Link} className="login" to="/login">Login</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-light signUp" to="/register">Register</NavLink>
                                    </NavItem>
                                </>
                            )
              }
              <NavItem>
                <NavLink tag={Link} className="text-light icon-nav" to="/cart"><BsFillCartFill id="icon-nav" /></NavLink>
                    </NavItem>
                    <button onClick={toggleDarkMode} className={`toggle ${isDarkMode ? 'dark-icon' : ''}`}>{isDarkMode ? <BsSun /> : <BsMoonFill />}</button>
            </ul>
         
        </Navbar>
      </header>
    );
  }



export default NavMenu;