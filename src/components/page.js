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
  },
  {
    href: '/archive',
    name: 'Archive'
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
          <meta charset="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <link href='https://fonts.googleapis.com/css?family=Poppins&display=swap' rel='stylesheet' />
          <script src='https://kit.fontawesome.com/a6878e746e.js'></script>
          <title>{ this.props.title ? ('JohnJonesFour | ' + this.props.title) : 'JohnJonesFour'}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          { this.props.description && (<meta content={this.props.description} name='description' />)}
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
        <footer className='footer'>
          Copyright { new Date().getFullYear() } &copy; John E. Jones IV
        </footer>
      </div>
    )
  }
}
