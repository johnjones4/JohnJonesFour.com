import React, {Component} from 'react'
import '../bootstrap/bootstrap.scss'
import './page.scss'
import { Helmet } from 'react-helmet'
import { Link } from 'gatsby'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap'

const navItems = [
  {
    href: '/about',
    name: 'About'
  },
  {
    href: '/photography',
    name: 'Photography'
  },
  {
    href: '/work',
    name: 'My Work'
  },
  {
    href: '/contact',
    name: 'Contact'
  }
]

const socialItems = [
  {
    'href': 'https://twitter.com/johnjones4',
    'icon': 'twitter'
  },
  {
    'href': 'https://linkedin.com/in/johnjones4',
    'icon': 'linkedin'
  },
  {
    'href': 'https://github.com/johnjones4',
    'icon': 'github'
  }
]

export default class Page extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render () {
    return (
      <div className={['page',this.props.slug || 'subpage'].join(' ')}>
        <Helmet>
          <link href='https://fonts.googleapis.com/css?family=Poppins&display=swap' rel='stylesheet' />
          <script src='https://kit.fontawesome.com/a6878e746e.js'></script>
        </Helmet>
        <Navbar fixed='top' expand='md' light>
          <NavbarBrand href='/'>JohnJonesFour</NavbarBrand>
          <NavbarToggler onClick={() => this.toggle()} />
          <Collapse isOpen={this.state.isOpen} navbar className='justify-content-end'>
            <Nav>
              {
                navItems.map((item, i) => (
                  <NavItem key={i}>
                    <Link activeClassName='active' className='nav-link' to={item.href}>{item.name}</Link>
                  </NavItem>
                ))
              }
            </Nav>
            <Nav>
              {
                socialItems.map(({href, icon}, i) => (
                  <NavItem key={i}>
                    <NavLink href={href} target='_blank' rel='noopener noreferrer'>
                      <i className={'fab fa-' + icon}>
                        <span className='sr-only'>{icon}</span>
                      </i>
                    </NavLink>
                  </NavItem>
                ))
              }
            </Nav>
          </Collapse>
        </Navbar>
        <div role='main'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
