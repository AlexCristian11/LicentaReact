import React, { Component, useEffect, useState } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { BsFillCartFill } from 'react-icons/bs'

const NavMenu = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const token = getCookie('jwt');
        if (token) {
            fetchUserData(token)
        }
    }, []);

    function getCookie(name) {
        const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : '';
    }

    const fetchUserData = (token) => {
        fetch('https://localhost:7277/api/user', {
            headers: {
                Authorization: `bearer ${token}`,
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch user data');
                }
            })
            .then((data) => {
                if (data) {
                    setIsLoggedIn(true);
                    setUsername(data.prenume);
                    console.log(username);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
      <header>
        <Navbar className="navbar-expand-sm navbar" container light>
          <NavbarBrand tag={Link} to="/">OnlineCave</NavbarBrand>
         
          
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                {/*<Dropdown menu={{ items, }}>*/}
                {/*   <a onClick={(e) => e.preventDefault()}>*/}
                {/*      <Space>*/}
                {/*         Categories*/}
                {/*      </Space>*/}
                {/*   </a>*/}
                {/*</Dropdown>*/}

                <NavLink tag={Link} className="text-dark" to="/">Categories</NavLink>
              </NavItem>
                        {
                            isLoggedIn ? (
                                <>
                                    <NavItem>
                                        <NavLink tag={Link} className="account" to="/account">{username}</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} className="logout" to="/">Logout</NavLink>
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
              {/*<NavItem>*/}
              {/*  <NavLink tag={Link} className="login" to="/login"><li>Login</li></NavLink>*/}
              {/*</NavItem>*/}
             
              <NavItem>
                <NavLink tag={Link} className="text-light icon-nav" to="/cart"><BsFillCartFill id="icon-nav" /></NavLink>
              </NavItem>
            </ul>
         
        </Navbar>
      </header>
    );
  }

const items = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="">
                1st menu item
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="">
                2nd menu item (disabled)
            </a>
        ),
        disabled: true,
    },
    {
        key: '3',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="">
                3rd menu item (disabled)
            </a>
        ),
        disabled: true,
    },
    {
        key: '4',
        danger: true,
        label: 'a danger item',
    },
];

export default NavMenu;