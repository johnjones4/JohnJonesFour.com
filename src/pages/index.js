import React from 'react'
import Page from '../components/page'
import {
  Container,
  Row,
  Col,
  Card,
  CardBody
} from 'reactstrap'
import './index.scss'
import { graphql } from 'gatsby'

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

const getWorkSubset = (type, limit, data) => {
  return data.allWorkJson.edges.find(set => set.node.label === type).node.items.slice(0, limit)
}

export default ({data}) => (
  <Page slug='index'>
    <section className='home-section what-i-do'>
      <Container>
        <h2>What I Do</h2>
        <Row className='work-table'>
          { links.map((work, i) => (
            <Col key={i} md={12 / links.length}>
              <p className='work-icon'>
                <a href={work.link}>
                  <i className={'fas fa-' + work.icon}></i>
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
      </section>
      <section className='home-section on-air'>
        <Container>
          <h2>On Air</h2>
          <div className='embed-responsive embed-responsive-16by9'>
            <iframe title='The Pi Cast: Pi-powered Rockets, Cyberpunk 2077 Pi Mod, Pi Gifting' className='embed-responsive-item' src='https://www.youtube.com/embed/JH-MxnDnmGw' frameBorder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowFullScreen></iframe>
          </div>
          <p>
            In the summer of 2020, I <a href='/2020/10/03/model-rocket-telemetry-part-1/'>designed and built</a> a custom telemetry module for a model 
            rocket and then <a href='/2020/10/04/model-rocket-telemetry-part-2/'>successfully launched it.</a> After posting about it, the awesome team 
            at <a href='https://www.tomshardware.com/' target='_blank' rel='noreferrer'>Tom's Hardware</a> had me on as a guest on their program Pi Cast.
          </p>
        </Container>
      </section>
      <section className='home-section on-stage'>
        <Container>
          <h2>On Stage</h2>
          <div className='embed-responsive embed-responsive-16by9'>
            <iframe title='GitHub Universe 2019 Video' className='embed-responsive-item' src='https://www.youtube.com/embed/-pyqoLI4yfU?start=1441' frameBorder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowFullScreen></iframe>
          </div>
          <p>
            While at the Case Foundation, I built out an open source program that included open sourcing and promoting 
            the foundation's code, authoring content such as one which ran in the Stanford Social Innovation Review
            titled <a target='_blank' rel='noopener noreferrer' href='https://ssir.org/articles/entry/open_source_software_is_philanthropy'>
            Open Source is Philanthropy</a>, speaking at conferences such as GitHub Universe, All Things Open, and Good 
            Tech Fest, and, in 2019, co-funding a research project in partnership with GitHub to examine the barriers 
            preventing nonprofits from better using and sharing open source software.
          </p>
        </Container>
      </section>
      <section className='home-section'>
        <Container>
          <h2>In Words</h2>
          <Row>
            { getWorkSubset('Writing', 3, data).map((item, i) => (
              <Col key={i}>
                <Card>
                  <CardBody>
                    <a href={item.url} target='_blank' rel='noopener noreferrer'>
                      <h3>{item.label}</h3>
                    </a>
                    { item.note && (<h5>{item.note}</h5>) }
                    { item.teaser && (<p>{item.teaser}</p>) }
                    <p><a href={item.url} target='_blank' rel='noopener noreferrer'>Read More</a></p>
                  </CardBody>
                </Card>
              </Col>
            )) }
          </Row>
        </Container>
      </section>
      <section className='home-section in-code'>
        <Container>
          <h2>In Code</h2>
          <Row>
            { getWorkSubset('Projects', 2, data).map((item, i) => (
              <Col key={i}>
                <Card>
                  { item.image && (<img src={item.image} className='img-fluid'/>) }
                  <CardBody>
                    <a href={item.url} target='_blank' rel='noopener noreferrer'>
                      <h3>{item.label}</h3>
                    </a>
                    { item.teaser && (<p>{item.teaser}</p>) }
                    <p><a href={item.url} target='_blank' rel='noopener noreferrer'>View</a></p>
                  </CardBody>
                </Card>
              </Col>
            )) }
          </Row>
        </Container>
      </section>
  </Page>
) 

export const query = graphql`
  query WorkQuery {
    allWorkJson {
      edges {
        node {
          label,
          items {
            url,
            label,
            note,
            teaser,
            image
          }
        }
      }
    }
  }
`
