import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Nav, NavItem, Row, Col, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import OuterPage from '../../components/OuterPage/OuterPage'
import { socialLinks } from '../../util'
import './home.css'

interface Highlight {
  title: string,
  embed: string
}

export const navLinks = [
  {
    path: '/experience',
    label: 'Experience'
  },
  {
    path: '/contact',
    label: 'Contact'
  }
]

const Home = () => {
  const [videoModal, setVideoModal] = useState({} as Highlight)
  const navigate = useNavigate();

  const highlights = [
    {
      name: 'air',
      label: 'On Air',
      action: () => setVideoModal({
        title: 'The Pi Cast: Pi-powered Rockets, Cyberpunk 2077 Pi Mod, Pi Gifting',
        embed: 'https://www.youtube.com/embed/JH-MxnDnmGw'
      }),
    },
    {
      name: 'stage',
      label: 'On Stage',
      action: () => setVideoModal({
        title: 'GitHub Universe 2019',
        embed: 'https://www.youtube.com/embed/-pyqoLI4yfU?start=1441'
      }),
    },
    {
      name: 'projects',
      label: 'Projects & Writing',
      action: () => {
        navigate('/posts')
      },
    },
    {
      name: 'photography',
      label: 'Photography',
      action: () => {
        navigate('/photography')
      },
    },
  ]

  return (
    <OuterPage canonical='/'>
      <div className='home'>
        <Container fluid className='text-center bg-dark text-light'>
          <h1 className='display-5 fw-bold'>
            JohnJonesFour
          </h1>
          <div className='col-sm-9 mx-auto'>
            <p className="lead mb-4">I'm a software engineer and innovator with a creative approach.</p>
            <Row>
              { highlights.map(h => {
                return (
                  <Col key={h.name} md={12/highlights.length} className='home-tiles-tile' role='button' onClick={h.action}> 
                    <img src={`/images/${h.name}.jpg`} className='img-fluid home-tiles-img' alt={h.label} />
                    <h4>{h.label}</h4>
                  </Col>
                )
              }) }
            </Row>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Nav className='justify-content-center'>
                { navLinks.map(({path, label}) => {
                  return (
                    <NavItem key={path}>
                      <NavLink className='nav-link' to={path}>{label}</NavLink>
                    </NavItem>
                  )
                }) }
              </Nav>
            </div>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Nav className='justify-content-center social-links'>
                { socialLinks.map(({link, label}) => {
                  return (
                    <NavItem key={link}>
                      <a className='nav-link' href={link} target='_blank' rel='noreferrer noopener'>
                        <i className={`fab fa-${label}`}></i>
                      </a>
                    </NavItem>
                  )
                }) }
              </Nav>
            </div>
          </div>
        </Container>
        <Modal
          isOpen={!!videoModal.embed}
          toggle={() => setVideoModal({} as Highlight)}
          size='xl'
        >
          <ModalHeader toggle={() => setVideoModal({} as Highlight)}>
            {videoModal.title}
          </ModalHeader>
          <ModalBody>
            <div className='ratio ratio-16x9'>
              <iframe title={videoModal.title} className='embed-responsive-item' src={videoModal.embed} frameBorder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowFullScreen></iframe>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </OuterPage>
  )
}

export default Home