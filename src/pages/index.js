import React from 'react'
import Page from '../components/page'
import {
  Container,
  Row,
  Col
} from 'reactstrap'
import './index.scss'

const links = [
  {
    icon: 'code',
    link: '/work',
    label: 'Coding'
  },
  {
    icon: 'pen',
    link: '/work',
    label: 'Writing'
  },
  {
    icon: 'camera-retro',
    link: '/photography',
    label: 'Photography'
  }
]

export default () => (
  <Page slug='index'>
    <Container>
      <Row className='work-table'>
        { links.map((work, i) => (
          <Col key={i} md={12 / links.length}>
            <p className='work-icon'>
              <a href={work.link}>
                <i class={'fas fa-' + work.icon}></i>
              </a>
            </p>
            <p className='work-description'>
              <a href={work.link}>
                {work.label}
              </a>
            </p>
          </Col>
        )) }
      </Row>
    </Container>
  </Page>
) 
