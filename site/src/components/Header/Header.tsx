import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'
import { navLinks } from '../../util'

const Header = () => {
  return (
    <Navbar
      color="dark"
      expand="md"
      dark
    >
      <NavbarBrand href="/" className='fw-bold'>
        JohnJonesFour
      </NavbarBrand>
      <NavbarToggler onClick={function noRefCheck(){}} />
      <Collapse navbar className="justify-content-end">
        <Nav
          navbar
        >
          { navLinks.map(({path, label}) => {
            return (
              <NavItem key={path}>
                <NavLink href={path}>{label}</NavLink>
              </NavItem>
            )
          }) }
        </Nav>
      </Collapse>
    </Navbar>
  )
}

export default Header
