import React from 'react'
import {
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap'
import { socialLinks } from '../../util'
import './footer.css'

const Footer = () => {
  return (
    <Container tag='footer' fluid className='footer bg-secondary'>
      <Nav className='justify-content-center'>
        { socialLinks.map(({link, label}) => {
          return (
            <NavItem key={link}>
              <NavLink href={link} target='_blank' rel='noopener'>
                <i className={`fab fa-${label}`}></i>
              </NavLink>
            </NavItem>
          )
        }) }
      </Nav>
      <p className='text-center'>
        Copyright &copy; {new Date().getFullYear()} John E. Jones IV
      </p>
    </Container>
  )
}

export default Footer
