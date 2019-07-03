import React from 'react'
import '../bootstrap/bootstrap.scss'
import './page.scss'
import { Helmet } from 'react-helmet'
import { Link } from 'gatsby'

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

export default ({slug = 'subpage', children}) => (
  <div className={['page',slug].join(' ')}>
    <Helmet>
      <link href='https://fonts.googleapis.com/css?family=Poppins&display=swap' rel='stylesheet' />
      <script src='https://kit.fontawesome.com/a6878e746e.js'></script>
    </Helmet>
    <nav className='navbar navbar-expand-lg fixed-top'>
      <a className='navbar-brand' href='/'>JohnJonesFour</a>
      <div className='collapse navbar-collapse justify-content-end'>
        <ul className='navbar-nav'>
          {
            navItems.map((item, i) => (
              <li key={i} className='nav-item'>
                <Link activeClassName='active' className='nav-link' to={item.href}>{item.name}</Link>
              </li>
            ))
          }
        </ul>
        <ul className='navbar-nav'>
          {
            socialItems.map(({href, icon}, i) => (
              <li key={i} className='nav-item'>
                <a href={href} target='_blank' className='nav-link' rel='noopener noreferrer'>
                  <i className={'fab fa-' + icon}></i>
                </a>
              </li>
            ))
          }
        </ul>
      </div>
    </nav>
    <div role='main'>
      {children}
    </div>
  </div>
)
