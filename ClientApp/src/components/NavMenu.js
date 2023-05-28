import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar" container light>
          <NavbarBrand tag={Link} to="/">LicentaReact</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
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
              <NavItem>
                <NavLink tag={Link} className="login" to="/login"><li>Login</li></NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-light signUp" to="/register">Register</NavLink>
              </NavItem>
            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
  }
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